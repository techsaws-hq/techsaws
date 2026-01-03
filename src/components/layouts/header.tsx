"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

/* ================== CONSTANTS ================== */

const HEADER_HEIGHT = 56;
const EXPANDED_WIDTH = 720;
const COLLAPSED_WIDTH = 56;
const LOGO_SIZE = 56;

const MINI_HEIGHT = 40;
const MINI_COLLAPSED = 40;
const MINI_EXPANDED_LANG = 220;
const MINI_EXPANDED_THEME = 120;
const MINI_RADIUS = 9999;

/* ================== MINI NOTCH ================== */

function MiniNotch({
  icon,
  expandedWidth,
  children,
  visible,
  surfaceClass,
  dividerClass,
}: {
  icon: string;
  expandedWidth: number;
  children: React.ReactNode;
  visible: boolean;
  surfaceClass: string;
  dividerClass: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      animate={{
        width: hovered ? expandedWidth : MINI_COLLAPSED,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        pointer-events-auto
        relative
        h-[40px]
        rounded-full
        backdrop-blur-xl
        overflow-hidden
        flex items-center
        ${surfaceClass}
      `}
    >
      {/* COLLAPSED ICON */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {icon}
      </motion.div>

      {/* EXPANDED CONTENT */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2, delay: hovered ? 0.05 : 0 }}
        className="absolute inset-0 px-4 flex items-center w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ================== HEADER ================== */

export function NotchHeader() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [language, setLanguage] = useState("EN");
  const [collapsed, setCollapsed] = useState(false);

  const lastScrollY = useRef(0);

  /* ---------- Scroll direction ---------- */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current + 10) setCollapsed(true);
      else if (y < lastScrollY.current - 10) setCollapsed(false);
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- THEME-AWARE MATERIAL ---------- */
  const surfaceClass = isDark
    ? "bg-black text-white border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.9)]"
    : "bg-white text-black shadow-[0_18px_50px_rgba(0,0,0,0.45)]";

  const dividerClass = isDark ? "bg-white/30" : "bg-black/30";
  const dotClass = isDark ? "text-white/50" : "text-black/40";

  return (
    <header className="fixed top-6 left-0 right-0 z-50 pointer-events-none">
      <div className="flex justify-center">
        <div className="flex items-center gap-8">
          {/* LANGUAGE MINI NOTCH */}
          <MiniNotch
            icon={language}
            expandedWidth={MINI_EXPANDED_LANG}
            visible={!collapsed}
            surfaceClass={surfaceClass}
            dividerClass={dividerClass}
          >
            <div className="flex items-center justify-between w-full text-sm">
              {["DU", "EN", "ESP", "AR"].map((l, i, arr) => (
                <div key={l} className="flex items-center">
                  <button
                    onClick={() => setLanguage(l)}
                    className={`
                      px-2 py-1 rounded-md transition pointer-events-auto
                      ${
                        language === l
                          ? isDark
                            ? "bg-white/15 text-white"
                            : "bg-black/10 text-black"
                          : isDark
                          ? "text-white/70 hover:text-white"
                          : "text-black/70 hover:text-black"
                      }
                    `}
                  >
                    {l}
                  </button>
                  {i < arr.length - 1 && (
                    <span className={`mx-2 h-4 w-px ${dividerClass}`} />
                  )}
                </div>
              ))}
            </div>
          </MiniNotch>

          {/* MAIN HEADER */}
          <motion.div
            animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            className={`
              pointer-events-auto
              relative
              h-[56px]
              rounded-full
              backdrop-blur-xl
              overflow-hidden
              ${surfaceClass}
            `}
          >
            {/* LOGO */}
            <motion.div
              animate={{ scale: collapsed ? 1 : 1.06 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src="/favicons/apple-icon.png"
                alt="TechSaws logo"
                width={LOGO_SIZE}
                height={LOGO_SIZE}
                priority
              />
            </motion.div>

            {!collapsed && (
              <div className="grid grid-cols-[auto_auto_auto] items-center h-full px-6">
                <nav className="flex gap-8 text-[15px] font-medium">
                  <a href="#">Work</a>
                  <a href="#">Expertise</a>
                  <a href="#">Ideas</a>
                </nav>

                <div className="flex items-center justify-center gap-4">
                  <span className={dotClass}>•</span>
                  <span className={dotClass}>•</span>
                </div>

                <nav className="flex gap-8 text-[15px] font-medium justify-end">
                  <a href="#">About</a>
                  <a href="#">Careers</a>
                  <a href="#">Contact</a>
                </nav>
              </div>
            )}
          </motion.div>

          {/* THEME MINI NOTCH */}
          <MiniNotch
            icon={theme === "dark" ? "☾" : "☼"}
            expandedWidth={MINI_EXPANDED_THEME}
            visible={!collapsed}
            surfaceClass={surfaceClass}
            dividerClass={dividerClass}
          >
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => setTheme("light")}
                className={`
                  px-3 py-1 rounded-md text-lg transition pointer-events-auto
                  ${
                    theme === "light"
                      ? isDark
                        ? "bg-white/15 text-white"
                        : "bg-black/10 text-black"
                      : isDark
                      ? "text-white/70 hover:text-white"
                      : "text-black/70 hover:text-black"
                  }
                `}
              >
                ☼
              </button>

              <span className={`h-4 w-px ${dividerClass}`} />

              <button
                onClick={() => setTheme("dark")}
                className={`
                  px-3 py-1 rounded-md text-lg transition pointer-events-auto
                  ${
                    theme === "dark"
                      ? isDark
                        ? "bg-white/15 text-white"
                        : "bg-black/10 text-black"
                      : isDark
                      ? "text-white/70 hover:text-white"
                      : "text-black/70 hover:text-black"
                  }
                `}
              >
                ☾
              </button>
            </div>
          </MiniNotch>
        </div>
      </div>
    </header>
  );
}
