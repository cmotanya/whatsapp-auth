import { prisma } from "@/lib/prisma";
import { verificationParamsSchema } from "@/utils/auth-schema";
import {
  errorMessage,
  formatPhoneNumber,
  parseQueryParams,
  successMessage,
} from "@/utils/helper";

export const DELETEHandler = async (req: Request) => {
  try {
    const query = parseQueryParams(req);

    const parsed = verificationParamsSchema.safeParse(query);

    if (!parsed.success) {
      return errorMessage("Invalid request parameters.", 400, parsed.error);
    }

    const { phone, action = "expired" } = parsed.data;

    if (action === "expired") {
      const result = await prisma.verificationCode.deleteMany({
        where: {
          expiresAt: { lt: new Date() },
          user: { phone },
        },
      });
      return successMessage(
        "Expired verification codes deleted successfully.",
        200,
        true,
        { deletedCount: result.count },
      );
    }

    if (action === "reset" && phone) {
      const user = await prisma.user.findUnique({
        where: { phone: formatPhoneNumber(phone) },
      });

      if (!user) {
        return errorMessage("User not found.", 404);
      }

      const result = await prisma.verificationCode.findMany({
        where: { userId: user.id },
      });

      return successMessage(
        `User verification codes for ${phone} deleted successfully.`,
        200,
        true,
        { deletedCount: result.length },
      );
    }

    return errorMessage("Invalid action specified.", 400);
  } catch (error) {
    console.error("❌ Error deleting verification code:", error);
    return errorMessage("Failed to delete verification code.", 500);
  }
};
