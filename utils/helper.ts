import z from "zod";
import { AuthFormData } from "./types";
import { NextResponse } from "next/server";
import { HandleInputFocusProps } from "./types";

export const handleInputFocus = ({
  setIsFocused,
  e,
}: HandleInputFocusProps) => {
  return (
    setIsFocused(true),
    e.target.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  );
};

export const generateVerificationCode = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return "";

  return phone
    .trim()
    .replace(/\s+/g, "")
    .replace(/^0/, "+254")
    .replace(/^254/, "+254")
    .replace(/^(\+{2,})/, "+")
    .replace(/[^+\d]/g, "");
};

export const errorMessage = (
  message: string,
  status: number,
  details?: unknown,
) => {
  let errorMessage;

  if (details && details instanceof z.ZodError) {
    try {
      errorMessage = z.treeifyError(details as z.ZodError<AuthFormData>);
    } catch (error) {
      errorMessage = details || error;
    }
  }
  return NextResponse.json(
    { success: false, message, ...(errorMessage && { details: errorMessage }) },
    { status },
  );
};

export const successMessage = <T>(
  message: string,
  status: number,
  verified: boolean = true,
  data?: T,
) => {
  const res = { success: true, message, verified, ...(data ?? {}) };
  return NextResponse.json(res, { status });
};

export const parseQueryParams = (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());
  return query;
};
