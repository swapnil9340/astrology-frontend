// Single source of truth for the site's public URL (used by sitemap/robots/metadata).
// Set NEXT_PUBLIC_SITE_URL in the host env to your real domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.astrovedji.in"
).replace(/\/+$/, "");

export const SITE_NAME = "AstroVedji";
export const WHATSAPP_CHAT_URL =
  "https://wa.me/919340595938?text=Hi%2C%20I%27d%20like%20to%20chat%20with%20an%20astrologer.";
export const SITE_DESC =
  "Create a free Vedic janam kundli online from your birth date, time and place. Preview your rashi, nakshatra and lagna, and explore daily rashifal and panchang.";

export const SITE_KEYWORDS = [
  "free kundli online",
  "free kundli in hindi",
  "janam kundli by date of birth and time",
  "aaj ka rashifal",
  "aaj ka panchang",
  "वैदिक जन्म कुंडली",
  "आज का राशिफल",
  "आज का पंचांग",
];
