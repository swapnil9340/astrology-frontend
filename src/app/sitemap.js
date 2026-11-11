import { SITE_URL } from "@/lib/site";
import { zodiacSigns, services } from "@/lib/data";

export const revalidate = 86400;

/**
 * Smart, data-driven sitemap.
 * - Built from data (signs, services) → new content auto-included.
 * - Revalidated daily for horoscope pages.
 * - Excludes private/noindex routes (login/register/kundli/love).
 * When blog/city-panchang land, split into generateSitemaps() shards.
 */
export default function sitemap() {
  const u = (path) => `${SITE_URL}${path}`;

  // static / evergreen pages
  const staticPages = [
    "",
    "/horoscope",
    "/panchang",
    "/kundli-matching",
    "/tarot",
    "/numerology",
    "/lal-kitab",
    "/palmistry",
    "/gemstones",
    "/pricing",
    "/about",
    "/contact",
    "/disclaimer",
    "/careers",
  ].map((path) => ({ url: u(path) }));

  // programmatic: per-sign daily horoscope (12 × daily)
  const horoscopePages = zodiacSigns.map((z) => ({
    url: u(`/horoscope/${z.name.toLowerCase()}`),
  }));

  // keep service list in sync automatically (skip ones already listed above)
  const listed = new Set(staticPages.map((p) => p.url));
  const servicePages = services
    .map((s) => u(s.href))
    .filter((url) => !listed.has(url) && url !== u("/kundli") && url !== u("/love"))
    .map((url) => ({ url }));

  return [...staticPages, ...horoscopePages, ...servicePages];
}
