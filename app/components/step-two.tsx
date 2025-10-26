import { cn } from "@/utils/cn";
import { handleVerify } from "@/utils/helper";
import { StepTwoProps } from "@/utils/types";
import { Asterisk } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { Controller } from "react-hook-form";

export const StepTwo = ({
  form,
  inputRef,
  setIsFocused,
  isVerifying,
  formState,
}: StepTwoProps) => {
  return (
    <>
      <h1 className="flex gap-2 text-center text-3xl font-bold">
        <Fade direction="left" duration={200}>
          <span>YOU&apos;RE ALMOST THERE</span>
        </Fade>
        <Fade direction="right" duration={300}>
          <span className="text-primary">✨</span>
        </Fade>
      </h1>
      <Fade
        key="step2"
        direction="down"
        duration={400}
        delay={200}
        cascade
        damping={0.2}
      >
        <h2 className="pt-4 pb-1 text-center text-2xl font-semibold">
          Verify Your Phone Number
        </h2>
        <p className="text-text/70">
          Enter the 4-digit verification code sent to your WhatsApp number.
        </p>
      </Fade>

      <Fade key="step2-input" direction="up" duration={200} delay={400}>
        <div className="mt-8 w-full max-w-sm space-y-4 px-8">
          <Controller
            control={form.control}
            name="code"
            render={({ field, fieldState }) => (
              <fieldset data-invalid={fieldState.invalid} className="w-full">
                <label
                  htmlFor={field.name}
                  className="text-text/50 text-xs font-medium"
                >
                  Verification Code
                </label>
                <input
                  type="number"
                  placeholder="Enter verification code"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  maxLength={4}
                  ref={inputRef}
                  onFocus={(e) => {
                    setIsFocused(true);
                    e.target.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className={cn(
                    "focus:ring-secondary/50 ring-accent bg-secondary/15 text-text/70 mt-2 w-full rounded-lg p-3 shadow-lg ring-1 ring-offset-2 transition-all duration-300 ease-in-out outline-none focus:ring-1",

                    fieldState.invalid
                      ? "focus:ring-error/70"
                      : field.value.length === 4 && !fieldState.invalid
                        ? "focus:ring-success/70 bg-success/15"
                        : "focus:ring-secondary/50",
                  )}
                />
                {fieldState.invalid && (
                  <Fade key="error" direction="up" duration={200} delay={100}>
                    <span
                      className="text-error text-xs leading-0.5 font-medium"
                      role="alert"
                    >
                      <Asterisk className="mb-0.5 inline-block h-3 w-3 animate-pulse" />
                      {fieldState.error?.message}
                    </span>
                  </Fade>
                )}
                <button
                  type="submit"
                  disabled={isVerifying}
                  onClick={() => handleVerify({ form, inputRef })}
                  className={cn(
                    "bg-primary hover:bg-primary/80 active:bg-accent mt-4 w-full cursor-pointer rounded-full p-3.5 text-white shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-0.5 active:-translate-y-0.5",

                    formState.errors.code
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-accent",
                  )}
                >
                  {isVerifying ? "Verifying..." : "Verify Code"}
                </button>
              </fieldset>
            )}
          />
        </div>
      </Fade>
    </>
  );
};
