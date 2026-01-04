"use client";

import { useTheme } from "@/hooks/use-theme";

import { cn } from "@/lib/utils";

function HomePage() {
  const { lightTheme } = useTheme();

  return (
    <main
      className={cn(
        "grain bg-grain",
        lightTheme ? "light-bg-gradient" : "dark-bg-gradient"
      )}
    ></main>
  );
}

export default HomePage;
