"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

type IntroLoaderProps = {
  onComplete?: () => void;
};

function IntroLoader({ onComplete }: IntroLoaderProps) {
  const WORD = "TECHSAWS";

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete?.();
      return;
    }

    const ctx = gsap.context(() => {
      let completed = false;

      const completeOnce = () => {
        if (completed) return;
        completed = true;
        onComplete?.();
      };

      const letters = gsap.utils.toArray<HTMLElement>(".ts-letter");
      const opacities = [0.18, 0.32, 0.24, 0.45, 0.28, 0.38, 0.22, 0.52];

      gsap.set(letters, {
        opacity: (i) => opacities[i] ?? 0.25,
        filter: "blur(8px)",
      });

      const loader = { value: 0 };

      gsap.to(loader, {
        value: 100,
        duration: 2.1,
        ease: "power2.out",
        onUpdate: () => {
          const rounded = Math.round(loader.value);

          const percentEl = document.getElementById("loader-percent");
          const barEl = document.getElementById("loader-bar");

          if (percentEl) percentEl.textContent = `${rounded}%`;
          if (barEl) gsap.set(barEl, { scaleX: rounded / 100 });
        },
      });

      const tl = gsap.timeline({
        delay: 0.6,
        onComplete: () => {
          requestAnimationFrame(completeOnce);
        },
      });

      tl.to(letters, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power2.out",
        stagger: {
          each: 0.09,
          from: "center",
        },
      });

      tl.to(
        ["#loader-percent", "#loader-bar"],
        {
          opacity: 0,
          y: 6,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "+=0.2"
      );

      tl.to({}, { duration: 0.35 });
    });

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <main className="min-h-screen grain bg-grain z-[100] light-bg-gradient">
      <section className="h-svh w-full flex items-center justify-center layout-standard">
        <div className="relative flex-center flex-col">
          <div
            id="brand-intro"
            className="relative inline-flex text-[45px] md:text-[95px] lg:text-[130px] text-[#0a0a0b] font-bold tracking-[0.04em] leading-none select-none text-float-light"
          >
            {WORD.split("").map((ch, i) => (
              <span key={`letter-${i}`} className="ts-letter inline-block">
                {ch}
              </span>
            ))}
          </div>

          <p className="font-light lg:text-[35px] md:text-[25px] text-[15px] opacity-80 text-[#333c4a]">
            We Brand. We Build. We Break Boundaries.
          </p>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-[200] select-none">
        <div className="flex flex-col items-end gap-2">
          <span
            id="loader-percent"
            className="text-sm md:text-base font-medium tracking-wide text-[#0a0a0b]"
          >
            0%
          </span>

          <div className="h-[5px] w-[150px] bg-[#d0d4da] overflow-hidden rounded-full">
            <div
              id="loader-bar"
              className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default IntroLoader;
