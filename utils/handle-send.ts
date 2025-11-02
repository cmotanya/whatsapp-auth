import { ApiResponse, HandleSendCodeProps } from "@/utils/types";
import toast from "react-hot-toast";

export const handleSendCode = async ({
  form,
  setStep,
}: HandleSendCodeProps) => {
  const isValid = await form.trigger("phone", { shouldFocus: true });

  if (!isValid) return;

  const phone = form.getValues("phone");

  try {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const res: ApiResponse = await response.json();

    if (!res.success) {
      toast.error(res.message || "Failed to send verification code.");
      console.error("❌ Error sending verification code:", res);
      return;
    }

    if (res.success) {
      setStep(2);
      toast.success("Verification code sent to your WhatsApp number!");

      if (process.env.NODE_ENV === "development" && res.code) {
        toast.success(`Verification code: ${res.code}`, {
          duration: 3000,
        });
      }
    } else {
      toast.error(res.message || "Failed to send verification code.");
    }
  } catch (error) {
    toast.error("An error occurred while sending the verification code.");
    console.error("❌ Error sending verification code:", error);
    return;
  }
};
