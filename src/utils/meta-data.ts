import { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "https://www.techsaws.com";

export const defaultMetadata: Metadata = {
  title: "TechSaws – We Build. We Brand. We Break Boundaries.",
  description:
    "TechSaws builds future-ready web apps, cybersecurity-first software development, SaaS platforms, mobile apps, and AI software. Full-stack development, UI/UX design, DevOps & product strategy.",

  applicationName: "TechSaws – We Build. We Brand. We Break Boundaries.",
  creator: "TechSaws",
  generator: "Next.js",
  keywords: [
    "TechSaws",
    "Cyber Security",
    "Software Development Agency",
    "Full Stack Development",
    "SaaS Development",
    "Mobile App Development",
    "AI Integration",
    "Web Design",
    "DevOps Services",
    "UI UX Design",
    "Custom App Development",
  ],

  alternates: {
    canonical: BASE_URL,
  },

  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/logo-512x512.png",
        sizes: "512x512",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/logo-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/logo-96x96.png",
        sizes: "96x96",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/logo.png",
        sizes: "834x408",
      },
      { rel: "icon", type: "image/svg+xml", url: "/favicons/logo.svg" },
      { rel: "icon", type: "image/x-icon", url: "/favicons/favicon.ico" },
      {
        rel: "shortcut icon",
        type: "image/x-icon",
        url: "/favicons/favicon.ico",
      },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        url: "/favicons/apple-icon.png",
        sizes: "180x180",
      },
    ],
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "TechSaws – We Build. We Brand. We Break Boundaries",
    description:
      "TechSaws builds future-ready web apps, cybersecurity-first software development, SaaS platforms, mobile apps, and AI software. Full-stack development, UI/UX design, DevOps & product strategy.",
    siteName: "TechSaws – We Build. We Brand. We Break Boundaries",
    images: [
      {
        url: "/social/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "TechSaws - We Build. We Brand. We Break Boundaries.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TechSaws – We Build. We Brand. We Break Boundaries",
    description:
      "TechSaws builds future-ready web apps, cybersecurity-first software development, SaaS platforms, mobile apps, and AI software. Full-stack development, UI/UX design, DevOps & product strategy.",
    images: ["/social/twitter-preview.jpg"],
    creator: "@TechSaws",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export function GetPageMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    ...defaultMetadata,
    ...overrides,
    title: overrides.title ?? defaultMetadata.title,
    description: overrides.description ?? defaultMetadata.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...overrides.openGraph,
      title: overrides.title || defaultMetadata.openGraph?.title,
      description:
        overrides.description || defaultMetadata.openGraph?.description,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...overrides.twitter,
      title: overrides.title || defaultMetadata.twitter?.title,
      description:
        overrides.description || defaultMetadata.twitter?.description,
    },
  };
}
