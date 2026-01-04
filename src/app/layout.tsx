import { cookies } from "next/headers";
import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "@/providers/theme-provider";
import LenisProvider from "@/providers/lenis-provider";

import { ThemeEnum } from "@/enums/theme-enum";

import { GetPageMetadata } from "@/utils/meta-data";
import { GlobalScripts } from "@/utils/global-scripts";
import { THEME_COOKIE } from "@/utils/theme-cookie";

// STYLE SHEETS SOURCE
import "@/styles/globals.css";
import "@/styles/includes.css";

// FONT CONFIGURATIONS
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});
export const ibm_plex_sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// WEBSITE METADATA AND VIEWPORT
export const metadata: Metadata = GetPageMetadata();
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-visual",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme =
    cookieStore.get(THEME_COOKIE)?.value === ThemeEnum.DARK
      ? ThemeEnum.DARK
      : ThemeEnum.LIGHT;

  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <head />
      <body
        className={`${inter.variable} ${ibm_plex_sans.variable} antialiased`}
      >
        <ThemeProvider>
          <GlobalScripts />
          <LenisProvider>{children}</LenisProvider>
          <Toaster position="bottom-right" reverseOrder={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}
