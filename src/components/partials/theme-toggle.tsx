"use client";

import { useTheme } from "next-themes";
import { Sun } from "lucide-react";

import { ThemeEnum } from "@/enums/theme-enum";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isResolved = Boolean(theme);
  const isLight = theme === ThemeEnum.LIGHT;

  return (
    <Toggle
      variant="outline"
      size="lg"
      pressed={isResolved ? isLight : false}
      disabled={!isResolved}
      aria-label="Toggle theme"
      onPressedChange={
        isResolved
          ? () => setTheme(isLight ? ThemeEnum.DARK : ThemeEnum.LIGHT)
          : undefined
      }
      className={cn(
        "border-border border-2 text-lg",
        !isResolved && "bg-muted/40 text-transparent cursor-default"
      )}
    >
      {isResolved ? <Sun /> : <span className="w-4 h-4 block" />}
    </Toggle>
  );
}

export default ThemeToggle;
