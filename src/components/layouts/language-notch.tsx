"use client";

import { useState } from "react";

import { LanguageEnum } from "@/enums/language-enum";

import MiniNotch from "./mini-notch";

import { cn } from "@/lib/utils";

function LanguageNotch({ collapsed }: { collapsed: boolean }) {
  const [language, setLanguage] = useState("EN");

  const MINI_EXPANDED_LANG = 240;

  return (
    <MiniNotch
      icon={language}
      expandedWidth={MINI_EXPANDED_LANG}
      visible={!collapsed}
    >
      <div className="flex items-center justify-between w-full text-sm">
        {Object.values(LanguageEnum).map((l, i, arr) => (
          <div
            key={l}
            onClick={() => setLanguage(l)}
            className="flex items-center"
          >
            <span
              className={cn(
                "px-2 py-1 rounded-md transition cursor-pointer flex-shrink-0",
                language === l
                  ? "bg-primary text-primary-foreground"
                  : "text-[#ffffff] hover:bg-[#2a2b2e]"
              )}
            >
              {l}
            </span>

            {i < arr.length - 1 && (
              <span className="mx-2 h-4 w-px bg-[#2a2b2e] flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </MiniNotch>
  );
}

export default LanguageNotch;
