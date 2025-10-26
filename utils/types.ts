import z from "zod";
import { authSchema } from "./auth-schema";
import { UseFormReturn } from "react-hook-form";

export type AuthFormData = z.infer<typeof authSchema>;

export type AuthFormType = UseFormReturn<AuthFormData>;

export const step = 1 | 2;

export type HandleSendCodeProps = {
  form: AuthFormType;
  setStep: (step: number) => void;
};

export type HandleVerifyProps = {
  form: AuthFormType;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

// export type data = z.infer<typeof authSchema>;

export type OnSubmitProps = {
  data: AuthFormData;
  setStep: (step: number) => void;
  setIsVerifying: (isVerifying: boolean) => void;
  form: AuthFormType;
};

export type StepTwoProps = {
  form: AuthFormType;
  inputRef: React.RefObject<HTMLInputElement | null>;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isVerifying: boolean;
  formState: AuthFormType["formState"];
};

export type StepOneProps = {
  form: AuthFormType;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  formState: AuthFormType["formState"];
  setStep: (step: number) => void;
};
