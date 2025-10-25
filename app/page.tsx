"use client";

import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import toast from "react-hot-toast";

export default function Home() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const handleSendCode = () => {
    if (!phone) return toast.error("Please enter a valid phone number.");

    setStep(2);
  };

  const handleVerifyCode = () => {
    if (!code) return toast.error("Please enter the verification code.");

    toast.success("Phone number verified successfully!");
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="flex gap-2 text-center text-3xl font-bold">
        <Fade direction="left" duration={300}>
          <span>LET&apos;S GET STARTED </span>
        </Fade>
        <Fade direction="right" duration={300}>
          <span className="text-primary">🚀</span>
        </Fade>
      </h1>

      {step === 1 && (
        <>
          <Fade direction="down" duration={300} delay={200}>
            <h2 className="pt-4 pb-1 text-center text-2xl font-semibold">
              WhatsApp Phone Verification
            </h2>
            <p className="text-text/70">
              Enter your phone number to receive a WhatsApp verification code.
            </p>
          </Fade>

          <div className="mt-8 w-full max-w-sm space-y-4 px-8">
            <Fade direction="up" duration={300} delay={400}>
              <input
                type="tel"
                placeholder="+254 700 000000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="focus:ring-secondary/70 ring-accent bg-secondary/15 text-text/70 w-full rounded-lg p-3 ring-2 ring-offset-2 transition-all duration-300 ease-in-out outline-none focus:scale-102 focus:border-none focus:shadow-md focus:ring-2"
              />
              <button
                onClick={handleSendCode}
                className="bg-primary mt-4 w-full cursor-pointer rounded-full p-3.5 text-white"
              >
                Send WhatsApp Code
              </button>
            </Fade>
          </div>
        </>
      )}

      {step === 2 && (
        <>
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
              Enter the verification code sent to your WhatsApp number.
            </p>
          </Fade>

          <Fade key="step2-input" direction="up" duration={400} delay={400}>
            <div className="mt-8 w-full max-w-sm space-y-4 px-8">
              <input
                type="number"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="focus:ring-secondary/70 ring-accent bg-secondary/15 text-text/70 w-full rounded-lg p-3 ring-2 ring-offset-2 transition-all duration-300 ease-in-out outline-none focus:scale-102 focus:border-none focus:shadow-md focus:ring-2"
              />
              <button
                onClick={handleVerifyCode}
                className="bg-primary mt-4 w-full cursor-pointer rounded-full p-3.5 text-white"
              >
                Verify Code
              </button>
            </div>
          </Fade>
        </>
      )}
    </section>
  );
}
