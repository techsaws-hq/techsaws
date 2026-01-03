"use client";

import { useState } from "react";

import { introStore } from "@/utils/intro.store";

export function usePageIntroGate() {
  const [showIntro, setShowIntro] = useState(() => {
    return introStore.shouldShow();
  });

  const markSeen = () => {
    introStore.markSeen();
    setShowIntro(false);
  };

  return { showIntro, markSeen };
}
