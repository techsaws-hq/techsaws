"use client";

import { useState } from "react";

import HomePage from "@/containers/home-page";
import IntroAnimation from "@/components/partials/intro-animation";

// export default function Home() {
//   const [showIntro, setShowIntro] = useState(true);

//   return showIntro ? (
//     <IntroAnimation onComplete={() => setShowIntro(false)} />
//   ) : (
//     <HomePage />
//   );
// }
export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return showIntro ? (
    <IntroAnimation onComplete={() => setShowIntro(false)} />
  ) : (
    <HomePage />
  );
}
