import LenisProvider from "@/providers/lenis-provider";

import { Header } from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";

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
      <Footer />
    </ThemeReady>
  );
}
