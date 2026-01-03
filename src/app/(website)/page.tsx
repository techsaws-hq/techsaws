"use client";

import HomePage from "@/containers/home-page";
import IntroAnimation from "@/components/partials/intro-animation";

import { useIntroGate } from "@/utils/intro-gate";

function Home() {
  const { ready, showIntro, markSeen } = useIntroGate();

  if (!ready) return null;

  return showIntro ? <IntroAnimation onComplete={markSeen} /> : <HomePage />;
}

export default Home;
