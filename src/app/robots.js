import { SITE_URL } from "@/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      // Search and user-requested retrieval are allowed; model-training crawlers stay blocked.
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
        ],
        allow: ["/", "/kundli-matching"],
        disallow: ["/api/"],
      },
      {
        userAgent: ["Googlebot", "Google-Extended", "Bingbot"],
        allow: ["/"],
        disallow: ["/api/"],
      },
      {
        userAgent: "*",
        allow: ["/"],
        // Keep noindex pages crawlable so search engines can read their robots metadata.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
