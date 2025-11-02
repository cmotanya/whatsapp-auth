import toast from "react-hot-toast";
import { AuthResponse, OnSubmitProps } from "./types";

export const onSubmit = async ({
  data,
  setStep,
  setIsVerifying,
  form,
}: OnSubmitProps) => {
  setIsVerifying(true);

  console.log("📱 Sending verification request with:", {
    phone: form.getValues("phone"),
    code: form.getValues("code"),
  });

  try {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res: AuthResponse = await response.json();

    if (res.success) {
      if (res.token) {
        localStorage.setItem("authToken", res.token);

        if (res.user) {
          localStorage.setItem("userPhone", res.user.phone);
        }

        toast.success("Phone number verified successfully!");

        // Redirect or perform further actions after successful verification
        return;
      }

      form.reset();
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
