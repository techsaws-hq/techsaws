import LenisProvider from "@/providers/lenis-provider";

import { Header } from "@/components/layouts/header";

import { ThemeReady } from "@/utils/theme-ready";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeReady>
      <Header />
      <LenisProvider>{children}</LenisProvider>
    </ThemeReady>
  );
}
