import Script from "next/script";

export function GlobalScripts() {
  const siteUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL ?? "https://www.techsaws.com";

  const socialLinks = [
    process.env.NEXT_PUBLIC_SOCIAL_GITHUB,
    process.env.NEXT_PUBLIC_SOCIAL_TWITTER,
    process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
    process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
    process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
    process.env.NEXT_PUBLIC_SOCIAL_TRUSTPILOT,
  ].filter(Boolean) as string[];

  return (
    <Script
      id="jsonld-organization"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "TechSaws",
          url: siteUrl,
          logo: `${siteUrl}/favicons/logo.svg`,
          description:
            "TechSaws builds future-ready web apps, cybersecurity-first software development, SaaS platforms, mobile apps, and AI software. Full-stack development, UI/UX design, DevOps & product strategy.",
          sameAs: socialLinks,
          founder: [
            { "@type": "Person", name: "Syed Hassan Ali" },
            { "@type": "Person", name: "Muhammad Omair" },
          ],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            areaServed: "Worldwide",
            availableLanguage: ["English"],
            email: "contact@techsaws.com",
          },
        }),
      }}
    />
  );
}
