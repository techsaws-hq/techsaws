/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || "https://www.techsaws.com",

  generateRobotsTxt: true,
  generateIndexSitemap: true,

  outDir: "./public",

  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      "https://www.techsaws.com/sitemap.xml",
    ],
  },
};
