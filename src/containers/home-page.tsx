"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

import { ThemeEnum } from "@/enums/theme-enum";

function HomePage() {
  const { theme } = useTheme();

  const isLight = theme === ThemeEnum.LIGHT;

  return (
    <main
      className={cn(
        "h-[300vh] grain bg-grain ",
        isLight ? "light-bg-gradient" : "dark-bg-gradient"
      )}
    ></main>
  );
}

export default HomePage;
