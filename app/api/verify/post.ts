import { PrismaClient, Prisma } from "@prisma/client";
import twilio from "twilio";
import {
  errorMessage,
  formatPhoneNumber,
  generateVerificationCode,
  successMessage,
} from "@/utils/helper";

// Singleton Prisma client
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const POSTHandler = async (req: Request) => {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
    { lazyLoading: true },
  );

  const twilioServiceSid = process.env.TWILIO_SERVICE_SID;

  try {
    const body = await req.json();
    const { phone } = body;

    if (!phone || typeof phone !== "string") {
      return errorMessage("Phone number is required.", 400);
    }

    const formattedPhoneNumber = formatPhoneNumber(phone);

    if (!formattedPhoneNumber) {
      return errorMessage("Invalid phone number.", 400);
    }

    if (!twilioServiceSid) {
      return errorMessage("Twilio service SID is not set.", 500);
    }

    // Upsert user and handle verification code in transaction
    const user = await prisma.user.upsert({
      where: { phone: formattedPhoneNumber },
      update: {},
      create: { phone: formattedPhoneNumber },
    });

    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.$transaction(async (tx) => {
      await tx.verificationCode.deleteMany({
        where: { userId: user.id, verified: false },
      });

      await tx.verificationCode.create({
        data: {
          code: code,
          expiresAt: expiresAt,
          userId: user.id,
        },
      });
    });

    // Send SMS
    const message = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhoneNumber,
      body: `Your verification code is: ${code}`,
    });

    if (process.env.NODE_ENV === "development") {
      console.log(`🔐 Verification code sent to ${formattedPhoneNumber}`);
    }

    return successMessage(
      "Verification code sent successfully.",
      200,
      true,
      message.sid,
    );
  } catch (error) {
    console.error("❌ Error sending code:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return errorMessage("Database error occurred.", 500);
    }

    return errorMessage("Failed to send verification code.", 500);
  }
};
