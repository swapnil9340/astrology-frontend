// Single source of truth for the site's public URL (used by sitemap/robots/metadata).
// Set NEXT_PUBLIC_SITE_URL in the host env to your real domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.astrovedji.in"
).replace(/\/+$/, "");

export const SITE_NAME = "AstroVedji";
export const SITE_DESC =
  "Free Vedic Kundli, daily horoscope, kundli matching, panchang and tarot. Talk to expert astrologers online.";
