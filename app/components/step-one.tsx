import { cn } from "@/utils/cn";
import { handleInputFocus, handleSendCode } from "@/utils/helper";
import { StepOneProps } from "@/utils/types";
import { Asterisk } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { Controller } from "react-hook-form";

export const StepOne = ({
  form,
  setIsFocused,
  formState,
  setStep,
}: StepOneProps) => {
  return (
    <>
      <h1 className="flex gap-2 text-center text-3xl font-bold">
        <Fade direction="left" duration={200}>
          <span>LET&apos;S GET STARTED </span>
        </Fade>
        <Fade direction="right" duration={300}>
          <span>🚀</span>
        </Fade>
      </h1>
      <Fade direction="down" duration={200} delay={200}>
        <p className="pt-4">
          Enter your phone number to receive a WhatsApp verification code.
        </p>
      </Fade>

      <div className="mt-8 w-full max-w-sm space-y-2 px-8">
        <Fade direction="up" duration={200} delay={400}>
          <Controller
            control={form.control}
            name="phone"
            render={({ field, fieldState }) => (
              <fieldset className="w-full">
                <label
                  htmlFor={field.name}
                  className="text-text/50 text-xs font-medium"
                >
                  Enter Your Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+254 700 000000"
                  {...field}
                  id={field.name}
                  onFocus={(event) =>
                    handleInputFocus({ setIsFocused, e: event })
                  }
                  onBlur={() => setIsFocused(false)}
                  className={cn(
                    "focus:ring-secondary/50 ring-accent bg-secondary/15 text-text/60 mt-2 w-full rounded-lg p-3 font-medium shadow-lg ring-1 ring-offset-2 transition-all duration-300 ease-in-out outline-none focus:border-none focus:shadow-md focus:ring-1",

                    fieldState.invalid
                      ? "focus:ring-error/70"
                      : field.value.length >= 10 && !fieldState.invalid
                        ? "focus:ring-success/70 bg-success/15"
                        : "focus:ring-secondary/50",
                  )}
                />
                {fieldState.invalid && (
                  <Fade key="error" direction="up" duration={200} delay={100}>
                    <span
                      className="text-error text-xs font-medium"
                      role="alert"
                    >
                      <Asterisk className="mb-0.5 inline-block h-3 w-3 animate-pulse" />
                      {fieldState.error?.message}
                    </span>
                  </Fade>
                )}
              </fieldset>
            )}
          />
          <button
            type="submit"
            onClick={() => handleSendCode({ form, setStep })}
            className={cn(
              "bg-primary active:bg-accent mt-4 w-full cursor-pointer rounded-full p-3.5 text-white shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-0.5 active:-translate-y-0.5",

              formState.errors.phone ? "cursor-not-allowed" : "hover:bg-accent",
            )}
          >
            Send WhatsApp Code
          </button>
        </Fade>
      </div>
    </>
  );
};
