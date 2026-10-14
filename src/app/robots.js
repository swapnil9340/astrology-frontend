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
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User"],
        allow: ["/", "/kundli-matching"],
        disallow: ["/login", "/register", "/kundli", "/api/"],
      },
      {
        userAgent: ["Googlebot", "Google-Extended"],
        allow: ["/", "/kundli-matching"],
        disallow: ["/login", "/register", "/kundli", "/api/"],
      },
      {
        userAgent: "*",
        allow: ["/", "/kundli-matching"],
        // private / non-content routes
        disallow: ["/login", "/register", "/kundli", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
