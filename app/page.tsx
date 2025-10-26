"use client";

import { authSchema } from "@/utils/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { StepTwo } from "./components/step-two";
import { StepOne } from "./components/step-one";
import { onSubmit } from "@/utils/helper";

export default function Home() {
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [, setIsFocused] = useState(false);

  const form = useForm<z.infer<typeof authSchema>>({
    defaultValues: { phone: "", code: "" },
    resolver: zodResolver(authSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const { formState } = form;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={form.handleSubmit((data) =>
        onSubmit({ data, setStep, setIsVerifying, form }),
      )}
      noValidate
      className="flex min-h-screen flex-col items-center justify-center"
    >
      {/* STEP 1 */}
      {step === 1 && (
        <StepOne
          form={form}
          setStep={setStep}
          setIsFocused={setIsFocused}
          formState={formState}
        />
      )}

      {/* STEP 2  */}
      {step === 2 && (
        <StepTwo
          form={form}
          inputRef={inputRef}
          setIsFocused={setIsFocused}
          isVerifying={isVerifying}
          formState={formState}
        />
      )}
    </form>
  );
}
