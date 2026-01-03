"use client";

import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { useTheme } from "@/hooks/use-theme";

import { LanguageEnum } from "@/enums/language-enum";

import Logo from "../../../public/favicons/logo.svg";
import { IoMdMenu, IoMdMoon, IoMdSunny } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function HeaderNotchMobile({
  hamOpen,
  setHamOpen,
  hidden,
}: {
  hamOpen: boolean;
  setHamOpen: Dispatch<SetStateAction<boolean>>;
  hidden: boolean;
}) {
  const [language, setLanguage] = useState("EN");

  const { darkTheme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!hamOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;

      if (
        menuRef.current?.contains(target) ||
        toggleRef.current?.contains(target)
      ) {
        return;
      }

      setHamOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [hamOpen, setHamOpen]);

  return (
    <>
      <motion.div
        animate={{ y: hidden && !hamOpen ? -140 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className={cn(
          "pointer-events-auto relative overflow-hidden md:hidden h-[60px] rounded-full px-4 z-[20]",
          "bg-black dark:bg-[#0A0A0A] backdrop-blur-xl dark:backdrop-blur-2xl",
          "shadow-[0_12px_30px_rgba(0,0,0,0.22)] dark:shadow-[0_10px_26px_rgba(0,0,0,0.9)]",
          "before:absolute before:inset-0 before:rounded-[inherit] before:content-[''] before:pointer-events-none",
          "before:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:before:shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]"
        )}
      >
        <div className="h-full w-full flex-center justify-between text-white">
          <Link href="/">
            <Image
              src={Logo}
              alt="TechSaws – We Build. We Brand. We Break Boundaries."
              width={55}
              height={55}
              priority
              className="animate-ts-breathe"
            />
          </Link>

          <motion.button
            ref={toggleRef}
            onClick={() => setHamOpen((v) => !v)}
            className="h-9 w-9 flex-center text-white"
            initial={false}
            animate={{ scale: hamOpen ? 0.92 : 1 }}
            transition={{ duration: 0.15 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                ref={toggleRef}
                key={hamOpen ? "close" : "menu"}
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.85 }}
                transition={{ duration: 0.12 }}
              >
                {hamOpen ? <IoClose size={22} /> : <IoMdMenu size={22} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {hamOpen && (
          <motion.div
            ref={menuRef}
            initial={{ y: -28 }}
            animate={{ y: 0 }}
            exit={{ y: -36 }}
            transition={{
              type: "tween",
              duration: hamOpen ? 0.26 : 0.14,
              ease: hamOpen ? [0.22, 1, 0.36, 1] : [0.4, 0, 1, 1],
            }}
            className="pointer-events-auto mt-4 w-full rounded-3xl bg-black dark:bg-[#0A0A0A] backdrop-blur-xl dark:backdrop-blur-2xl shadow-[0_12px_30px_rgba(0,0,0,0.22)] dark:shadow-[0_10px_26px_rgba(0,0,0,0.9)] p-6 before:absolute before:inset-0 before:rounded-[inherit] before:content-[''] before:pointer-events-none before:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] dark:before:shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] z-[10]"
          >
            <nav className="flex flex-col gap-4 text-lg font-heading text-white">
              {["Home", "Services", "Work", "About", "Pricings", "Contact"].map(
                (link) => (
                  <Link
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    onClick={() => setHamOpen(false)}
                    className="py-2 border-b border-[#2e2f2f]"
                  >
                    {link}
                  </Link>
                )
              )}
            </nav>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {Object.values(LanguageEnum).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={cn(
                      "px-2 py-1 rounded-md text-sm transition",
                      language === l
                        ? "bg-primary text-primary-foreground"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <button
                onClick={toggleTheme}
                className="h-9 w-9 rounded-full bg-white/10 flex-center text-white"
              >
                {darkTheme ? (
                  <IoMdMoon size={18} className="text-[#EAF4FC]" />
                ) : (
                  <IoMdSunny size={18} className="text-[#F7CD1F]" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HeaderNotchMobile;
