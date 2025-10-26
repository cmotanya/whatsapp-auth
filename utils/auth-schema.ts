import { z } from "zod";

export const phoneSchema = z.object({
  phone: z
    .string()
    .trim()
    .nonempty("Phone number is required")
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be at most 15 digits" })
    .regex(/^(\+254|0)\d{9}$/, {
      message:
        "Phone number must start with +254 or 0 and contain 9 digits after that (e.g. +254700000000 or 0700000000)",
    }),
});

export const codeSchema = z.object({
  code: z
    .string()
    .trim()
    .nonempty("Verification code is required")
    .min(4, { message: "Verification code must be at least 4 digits" })
    .max(4, { message: "Verification code must be exactly 4 digits" })
    .regex(/^\+?\d*$/, {
      message: "Code must contain only numbers.",
    }),
});

export const authSchema = phoneSchema.extend(codeSchema.shape);
export type AuthSchema = z.infer<typeof authSchema>;
