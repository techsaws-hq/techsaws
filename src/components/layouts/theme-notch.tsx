"use client";

import { useTheme } from "@/hooks/use-theme";

import MiniNotch from "./mini-notch";

import { cn } from "@/lib/utils";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

function ThemeNotch({ collapsed }: { collapsed: boolean }) {
  const { lightTheme, darkTheme, setLightTheme, setDarkTheme } = useTheme();

  const MINI_EXPANDED_THEME = 120;

  return (
    <MiniNotch
      icon={
        lightTheme ? (
          <IoMdSunny size={20} className="text-[#F7CD1F]" />
        ) : (
          <IoMdMoon size={20} className="text-[#EAF4FC]" />
        )
      }
      expandedWidth={MINI_EXPANDED_THEME}
      visible={!collapsed}
    >
      <div className="flex items-center justify-between w-full">
        <div
          onClick={setLightTheme}
          className={cn(
            "px-2 py-1 rounded-md transition cursor-pointer",
            lightTheme
              ? "bg-primary text-primary-foreground"
              : "text-[#ffffff] hover:bg-[#2a2b2e] flex-shrink-0 flex-center"
          )}
        >
          <IoMdSunny size={20} />
        </div>

        <span className="mx-2 h-4 w-px bg-[#2a2b2e] flex-shrink-0" />

        <div
          onClick={setDarkTheme}
          className={cn(
            "px-2 py-1 rounded-md transition cursor-pointer flex-center",
            darkTheme
              ? "bg-primary text-primary-foreground"
              : "text-[#ffffff] hover:bg-[#2a2b2e] flex-shrink-0"
          )}
        >
          <IoMdMoon size={20} />
        </div>
      </div>
    </MiniNotch>
  );
}

export default ThemeNotch;
