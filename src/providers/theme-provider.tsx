"use client";

import { createContext, useMemo } from "react";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";

import { ThemeEnum } from "@/enums/theme-enum";
import { ThemeContextType } from "@/types/providers.interfaces";

import { setThemeCookie } from "@/utils/theme-cookie";

export const ThemeContext = createContext<ThemeContextType | null>(null);

function ThemeInnerProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const currentTheme =
    (resolvedTheme ?? theme ?? ThemeEnum.LIGHT) === ThemeEnum.DARK
      ? ThemeEnum.DARK
      : ThemeEnum.LIGHT;

  const value = useMemo<ThemeContextType>(() => {
    const isLight = currentTheme === ThemeEnum.LIGHT;
    const isDark = currentTheme === ThemeEnum.DARK;

    return {
      lightTheme: isLight,
      darkTheme: isDark,
      setLightTheme: () => {
        setTheme(ThemeEnum.LIGHT);
        setThemeCookie(ThemeEnum.LIGHT);
      },
      setDarkTheme: () => {
        setTheme(ThemeEnum.DARK);
        setThemeCookie(ThemeEnum.DARK);
      },
      toggleTheme: () => {
        const next = isDark ? ThemeEnum.LIGHT : ThemeEnum.DARK;
        setTheme(next);
        setThemeCookie(next);
      },
    };
  }, [currentTheme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ThemeInnerProvider>{children}</ThemeInnerProvider>
    </NextThemeProvider>
  );
}
