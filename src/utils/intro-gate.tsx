"use client";

import { useState } from "react";

import { introStore } from "@/utils/intro.store";

export function useIntroGate() {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return !introStore.hasSeen();
  });

  const markSeen = () => {
    introStore.markSeen();
    setShowIntro(false);
  };

  return {
    ready: true,
    showIntro,
    markSeen,
  };
}
