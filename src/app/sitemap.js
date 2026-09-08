import { SITE_URL } from "@/lib/site";
import { zodiacSigns, services } from "@/lib/data";

/**
 * Smart, data-driven sitemap.
 * - Built from data (signs, services) → new content auto-included.
 * - Accurate lastModified + changeFrequency (daily for horoscope/panchang).
 * - Excludes private/noindex routes (login/register/kundli).
 * When blog/city-panchang land, split into generateSitemaps() shards.
 */
export default function sitemap() {
  const now = new Date();
  const u = (path) => `${SITE_URL}${path}`;

  // static / evergreen pages
  const staticPages = [
    ["", 1.0, "weekly"],
    ["/horoscope", 0.9, "daily"],
    ["/panchang", 0.8, "daily"],
    ["/kundli-matching", 0.7, "monthly"],
    ["/tarot", 0.5, "monthly"],
    ["/numerology", 0.5, "monthly"],
    ["/lal-kitab", 0.5, "monthly"],
    ["/palmistry", 0.4, "monthly"],
    ["/gemstones", 0.5, "monthly"],
    ["/pricing", 0.7, "monthly"],
    ["/about", 0.5, "monthly"],
    ["/contact", 0.4, "yearly"],
    ["/disclaimer", 0.2, "yearly"],
    ["/careers", 0.3, "monthly"],
  ].map(([path, priority, changeFrequency]) => ({
    url: u(path),
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // programmatic: per-sign daily horoscope (12 × daily)
  const horoscopePages = zodiacSigns.map((z) => ({
    url: u(`/horoscope/${z.name.toLowerCase()}`),
    lastModified: now, // updated daily
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // keep service list in sync automatically (skip ones already listed above)
  const listed = new Set(staticPages.map((p) => p.url));
  const servicePages = services
    .map((s) => u(s.href))
    .filter((url) => !listed.has(url))
    .map((url) => ({ url, lastModified: now, changeFrequency: "monthly", priority: 0.5 }));

  return [...staticPages, ...horoscopePages, ...servicePages];
}
