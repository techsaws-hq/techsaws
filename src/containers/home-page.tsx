"use client";

import { cn } from "@/lib/utils";

import { useTheme } from "@/hooks/use-theme";

function HomePage() {
  const { lightTheme } = useTheme();

  return (
    <main
      className={cn(
        "h-[300vh] grain bg-grain ",
        lightTheme ? "light-bg-gradient" : "dark-bg-gradient"
      )}
    ></main>
  );
}

export default HomePage;
