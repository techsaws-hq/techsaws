"use client";

import IntroAnimation from "@/components/partials/intro-animation";
import ThemeToggle from "@/components/partials/theme-toggle";

function HomePage() {
  return (
    <>
      <ThemeToggle />
      <IntroAnimation />
    </>
  );
}

export default HomePage;
