"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

import { useTheme } from "@/hooks/use-theme";

import { cn } from "@/lib/utils";

function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const { lightTheme } = useTheme();

  const WORD = "TECHSAWS";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        onComplete();
        return;
      }

      let completed = false;

      const letters = gsap.utils.toArray<HTMLElement>(".ts-letter");
      const opacities = [0.18, 0.32, 0.24, 0.45, 0.28, 0.38, 0.22, 0.52];

      gsap.set(letters, {
        opacity: (i) => opacities[i] ?? 0.25,
        filter: "blur(8px)",
      });
      gsap.set([".tech-group", ".saws-group"], { x: 0 });

      const REDIRECT_DELAY = 0.5;

      const tl = gsap.timeline({
        delay: 0.6,
        onComplete: () => {
          if (completed) return;
          completed = true;

          gsap.delayedCall(REDIRECT_DELAY, () => {
            onComplete();
          });
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

      tl.to({}, { duration: 0.35 });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <main
      className={cn(
        "min-h-screen grain text-heading bg-grain z-[9999]",
        lightTheme ? "light-bg-gradient" : "dark-bg-gradient"
      )}
    >
      <section className="h-[calc(100svh-60px)] w-full flex items-center justify-center layout-standard">
        <div className="relative flex items-center justify-center">
          <div
            id="brand-intro"
            className={cn(
              "relative inline-flex text-[45px] md:text-[95px] lg:text-[130px] font-bold tracking-[0.04em] leading-none select-none",
              lightTheme ? "text-float-light" : "text-float-dark"
            )}
          >
            <span className="tech-group inline-flex">
              {WORD.slice(0, 4)
                .split("")
                .map((ch, i) => (
                  <span key={`tech-${i}`} className="ts-letter inline-block">
                    {ch}
                  </span>
                ))}
            </span>

            <span className="saws-group inline-flex">
              {WORD.slice(4)
                .split("")
                .map((ch, i) => (
                  <span key={`saws-${i}`} className="ts-letter inline-block">
                    {ch}
                  </span>
                ))}
            </span>
          </div>
        </div>
      </section>

      <section className="h-[60px] layout-standard flex-center text-center lg:text-sm text-xs text-muted-foreground">
        TechSaws builds secure, scalable web platforms, SaaS products, and
        AI-powered systems — engineered to perform, designed to scale.
      </section>
    </main>
  );
}

export default IntroAnimation;
