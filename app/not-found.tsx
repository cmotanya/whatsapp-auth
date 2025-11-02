"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import { Button } from "./components/ui/button";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <section className="relative flex h-screen overflow-hidden">
      <div className="text-accent/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[11rem] font-bold md:text-[15rem]">
        404
      </div>

      <div className="flex w-full flex-col items-center justify-center text-center">
        <Fade direction="down" duration={200}>
          <Image
            src="/assets/not-found.svg"
            alt="not-found illustration image showing a person looking for a page that doesn't exist"
            width={500}
            height={500}
            className="mb-4 h-full max-h-[40vh] w-auto object-contain"
          />
        </Fade>

        <div className="flex w-full flex-col items-center gap-4 lg:max-w-4xl">
          <Fade
            direction="up"
            duration={200}
            delay={300}
            triggerOnce
            cascade
            damping={0.1}
          >
            <h1 className="text-primary text-5xl font-bold lg:text-6xl">
              Page Unavailable!
            </h1>
            <p className="font-sora font-medium text-balance lg:text-xl">
              {" "}
              The page you&apos;re looking for doesn&apos;t seem to exist.
            </p>
          </Fade>

          <Fade direction="right" duration={200} delay={500} triggerOnce>
            <div className="mt-8 flex flex-col justify-center gap-4 md:flex-row md:items-center md:gap-8">
              <Button
                onClick={() => router.push("/")}
                icon={<ArrowLeft />}
                className="bg-accent/20 ring-accent active:bg-accent/40 hover:bg-accent/40 text-text/80 gap-2 font-medium uppercase ring-1"
              >
                Go Back
              </Button>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
