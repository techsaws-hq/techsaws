"use client";

import { useEffect, useRef, useState } from "react";

import LanguageNotch from "./language-notch";
import ThemeNotch from "./theme-notch";
import HeaderNotch from "./header-notch";
import HeaderNotchMobile from "./header-notch-mobile";

export function Header() {
  const [collapsed, setCollapsed] = useState(false);
  const [hamOpen, setHamOpen] = useState(false);

  const lastScrollY = useRef(0);

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

  return (
    <header className="fixed md:top-6 top-4 left-0 right-0 z-50 pointer-events-none max-lg:layout-standard">
      <div className="flex-center lg:gap-8 gap-4 max-md:hidden">
        <LanguageNotch collapsed={collapsed} />
        <HeaderNotch collapsed={collapsed} />
        <ThemeNotch collapsed={collapsed} />
      </div>

      <HeaderNotchMobile
        hamOpen={hamOpen}
        setHamOpen={setHamOpen}
        hidden={collapsed}
      />
    </header>
  );
}
