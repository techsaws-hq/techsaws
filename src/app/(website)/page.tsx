import HomePage from "@/containers/home-page";

import { HomeIntroGate } from "@/utils/home-intro-gate";

export default function Home() {
  return (
    <HomeIntroGate>
      <HomePage />
    </HomeIntroGate>
  );
}
