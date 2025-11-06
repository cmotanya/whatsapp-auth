import { PrismaClient } from "@prisma/client";
import twilio from "twilio";
import {
  errorMessage,
  formatPhoneNumber,
  generateVerificationCode,
  successMessage,
} from "@/utils/helper";

export const POSTHandler = async (req: Request) => {
  const prisma = new PrismaClient();

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
    {
      lazyLoading: true,
    },
  );

  const twilioServiceSid = process.env.TWILIO_SERVICE_SID;

  try {
    const body = await req.json();

    const { phone } = body;

    const formattedPhoneNumber = formatPhoneNumber(phone);

    const code = generateVerificationCode();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    if (!formattedPhoneNumber) {
      return errorMessage("Invalid phone number.", 400);
    }

    if (!twilioServiceSid) {
      return errorMessage("Twilio service SID is not set.", 500);
    }

    const user = await prisma.user.upsert({
      where: { phone: formattedPhoneNumber },
      update: {},
      create: {
        phone: formattedPhoneNumber,
      },
    });

    await prisma.verificationCode.deleteMany({
      where: { userId: user.id, verified: false },
    });

    await prisma.verificationCode.create({
      data: {
        code: code,
        expiresAt: expiresAt,
        userId: user.id,
      },
    });

    // Twilio Verification API
    const message = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhoneNumber,
      body: `Your verification code is: ${code}`,
    });

    if (process.env.NODE_ENV === "development") {
      console.log(`🔐 Verification code for ${formattedPhoneNumber}: ${code}`);
    }

    return successMessage(
      "Verification code sent successfully.",
      200,
      true,
      message.sid,
    );
  } catch (error) {
    console.error("❌ Error sending code:", error);

    return errorMessage("Failed to send verification code.", 500);
  }
};
