import { toast } from "react-hot-toast";
import {
  HandleInputFocusProps,
  HandleSendCodeProps,
  HandleVerifyProps,
  OnSubmitProps,
} from "./types";

export const handleSendCode = async ({
  form,
  setStep,
}: HandleSendCodeProps) => {
  const isValid = await form.trigger("phone", { shouldFocus: true });

  if (!isValid) return;

  setStep(2);

  toast.success("Verification code sent to your WhatsApp number!");
};

export const handleVerify = async ({ form, inputRef }: HandleVerifyProps) => {
  const isValid = await form.trigger("code", { shouldFocus: true });
  if (!isValid) {
    inputRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    inputRef.current?.focus();
    return;
  }
};

export const onSubmit = async ({
  data,
  setStep,
  setIsVerifying,
}: OnSubmitProps) => {
  setIsVerifying(true);

  try {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (res.success) {
      // form.reset();
      toast.success("Phone number verified successfully!");
      setStep(1);
    } else {
      toast.error(res.message || "An error occurred. Please try again.");
    }
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    console.error(error);
  } finally {
    setIsVerifying(false);
  }
};

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
