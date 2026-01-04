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
      {children}
    </ThemeReady>
  );
}
