import toast from "react-hot-toast";
import { ApiResponse, HandleVerifyProps } from "./types";

export const handleVerifyCode = async ({
  form,
  inputRef,
  setStep,
}: HandleVerifyProps) => {
  console.log("handleVerifyCode called");

  const isValid = await form.trigger("code", { shouldFocus: true });

  if (!isValid) {
    inputRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    inputRef.current?.focus();
    return;
  }

  const params = new URLSearchParams({
    phone: form.getValues("phone"),
    code: form.getValues("code"),
  });

  try {
    const response = await fetch(`/api/verify?${params.toString()}`);

    const data: ApiResponse = await response.json();
    console.log("data:", data);

    console.log("📥 Verification response:", data);

    if (!data.success) {
      toast.error(data?.message || "Verification failed. Please try again.");
      console.log("❌ Verification failed:", data);
      form.setValue("code", "");
      inputRef.current?.focus();
      return;
    }

    if (data.success) {
      setStep(1);
      toast.success("Verification successful!");
    }
  } catch (error) {
    console.error("❌ Error during verification:", error);
    toast.error("An unexpected error occurred. Please try again.");
  }
};
