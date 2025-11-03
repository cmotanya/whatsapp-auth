import { PrismaClient } from "@prisma/client";
import {
  errorMessage,
  formatPhoneNumber,
  generateVerificationCode,
  successMessage,
} from "@/utils/helper";

export const POSTHandler = async (req: Request) => {
  const prisma = new PrismaClient();
  try {
    const body = await req.json();

    const { phone } = body;

    const formattedPhoneNumber = formatPhoneNumber(phone);

    const code = generateVerificationCode();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    if (!formattedPhoneNumber) {
      return errorMessage("Invalid phone number.", 400);
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

    // TODO: Send WhatsApp message via Meta API

    if (process.env.NODE_ENV === "development") {
      console.log(`🔐 Verification code for ${formattedPhoneNumber}: ${code}`);
    }

    return successMessage("Verification code sent successfully.", 200, true, {
      code,
    });
  } catch (error) {
    console.error("❌ Error sending code:", error);

    return errorMessage("Failed to send verification code.", 500);
  }
};
