import { SITE_NAME, SITE_URL } from "@/lib/site";

export async function GET() {
  const content = `# ${SITE_NAME}

> AstroVedji is a Vedic astrology website with public horoscope, panchang, kundli matching, tarot, numerology, palmistry, gemstone, and Lal Kitab pages. Content is available in Hindi and English where supported.

## Public pages
- [Home](${SITE_URL}/): Free Vedic astrology tools and services.
- [Daily Horoscope](${SITE_URL}/horoscope): Daily rashifal for all zodiac signs.
- [Panchang](${SITE_URL}/panchang): Tithi, nakshatra, yoga, karana, and muhurat.
- [Kundli Matching](${SITE_URL}/kundli-matching): Ashtakoot guna milan and marriage compatibility.
- [Tarot Reading](${SITE_URL}/tarot)
- [Numerology](${SITE_URL}/numerology)
- [Palmistry](${SITE_URL}/palmistry)
- [Gemstones](${SITE_URL}/gemstones)
- [Lal Kitab](${SITE_URL}/lal-kitab)

## Feeds and discovery
- [RSS daily rashifal](${SITE_URL}/feed.xml): Daily entries for 12 zodiac signs.
- [XML sitemap](${SITE_URL}/sitemap.xml)

## Notes
- Kundli reports require an account and are not public reference content.
- Astrology content is for guidance and entertainment, not professional advice.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
