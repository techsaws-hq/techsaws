"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import IntroLoader from "@/components/partials/intro-loader";

export function HomeIntroGate({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || !resolvedTheme || !introDone) {
    return <IntroLoader onComplete={() => setIntroDone(true)} />;
  }

  return <>{children}</>;
}
