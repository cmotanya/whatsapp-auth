import { PrismaClient } from "@prisma/client";
import { verificationParamsSchema } from "@/utils/auth-schema";
import {
  parseQueryParams,
  errorMessage,
  successMessage,
  formatPhoneNumber,
} from "@/utils/helper";
import jwt from "jsonwebtoken";

export const GETHandler = async (req: Request) => {
  const prisma = new PrismaClient();
  try {
    const query = parseQueryParams(req);

    const parsed = verificationParamsSchema.safeParse(query);

    if (!parsed.success) {
      return errorMessage("Invalid request parameters.", 400, parsed.error);
    }

    const { phone, code } = parsed.data;

    if (!phone) return errorMessage("Phone number is required.", 400);

    if (!code) return errorMessage("Verification code is required.", 400);

    const formattedPhone = formatPhoneNumber(phone);

    if (!formattedPhone) {
      return errorMessage("Invalid phone number format.", 400);
    }

    const user = await prisma.user.findUnique({
      where: { phone: formattedPhone },
      include: {
        verificationCodes: {
          where: { verified: false, code },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!user) return errorMessage("User not found.", 404);

    const verification = user.verificationCodes[0];

    if (!verification) {
      return errorMessage("Invalid or expired verification code.", 404, true);
    }

    if (new Date(verification.expiresAt) < new Date()) {
      return errorMessage("Verification code has expired.", 400);
    }

    await prisma.verificationCode.update({
      where: { id: verification.id },
      data: { verified: true },
    });

    const token = jwt.sign(
      { id: user.id, phone: user.phone },
      process.env.JWT_SECRET! as string,
      { expiresIn: "1d" },
    );

    return successMessage("User verified successfully.", 200, true, {
      user: { user: user.id, phone: user.phone },
      token,
    });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return errorMessage("Failed to fetch user.", 500);
  }
};
