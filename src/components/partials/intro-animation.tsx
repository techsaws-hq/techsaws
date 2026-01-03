"use client";

import { useLayoutEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import gsap from "gsap";

import { ThemeEnum } from "@/enums/theme-enum";

import { cn } from "@/lib/utils";

import Logo from "../../../public/favicons/logo.svg";

function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const { theme } = useTheme();

  const WORD = "TECHSAWS";
  const isLight = theme === ThemeEnum.LIGHT;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        onComplete();
        return;
      }

      let completed = false;

      const letters = gsap.utils.toArray<HTMLElement>(".ts-letter");

      const opacities = [0.18, 0.32, 0.24, 0.45, 0.28, 0.38, 0.22, 0.52];

      gsap.set(".logo-mark", {
        autoAlpha: 0,
        scale: 0.85,
        visibility: "hidden",
      });

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

      const mm = gsap.matchMedia();

      mm.add(
        {
          lg: "(min-width: 1024px)",
          md: "(min-width: 768px) and (max-width: 1023px)",
          sm: "(max-width: 767px)",
        },
        (context) => {
          const { lg, md } = context.conditions!;

          const techX = lg ? -115 : md ? -85 : -35;
          const sawsX = lg ? 140 : md ? 100 : 45;

          tl.to(
            ".tech-group",
            {
              x: techX,
              duration: 1.25,
              ease: "power2.inOut",
            },
            "<"
          ).to(
            ".saws-group",
            {
              x: sawsX,
              duration: 1.25,
              ease: "power2.inOut",
            },
            "<"
          );
        }
      );

      tl.to(
        ".logo-mark",
        {
          visibility: "visible",
          autoAlpha: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.55"
      );
    });

    return () => ctx.revert();
  }, [theme, onComplete]);

  return (
    <main
      className={cn(
        "min-h-screen grain text-heading bg-grain z-[9999]",
        isLight ? "light-bg-gradient" : "dark-bg-gradient"
      )}
    >
      <section className="h-[calc(100svh-60px)] w-full flex items-center justify-center layout-standard">
        <div className="relative flex items-center justify-center">
          <div
            id="brand-intro"
            className={cn(
              "relative inline-flex text-[40px] md:text-[80px] lg:text-[120px] font-bold tracking-[0.04em] leading-none select-none",
              isLight ? "text-float-light" : "text-float-dark"
            )}
          >
            <span className="inline-flex">
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
            </span>

            <span
              className={cn(
                "logo-mark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] md:w-[220px] md:h-[220px] lg:w-[300px] lg:h-[300px] pointer-events-none",
                isLight ? "logo-float-light" : "logo-float-dark"
              )}
            >
              <Image
                src={Logo}
                alt="TechSaws"
                fill
                priority
                className="object-contain"
              />
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
