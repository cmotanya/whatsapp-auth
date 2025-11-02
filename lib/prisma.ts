import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "production"
        ? ["error"] // ✅ Only errors in production
        : ["query", "error", "warn"], // ✅ Verbose in development
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
