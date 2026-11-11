import { SITE_NAME, SITE_URL } from "@/lib/site";

export async function GET() {
  const content = `# ${SITE_NAME}

> AstroVedji provides a free Vedic birth-chart preview, daily rashifal for 12 signs, a live panchang, and astrology guides. The public website is primarily in English with Hindi and Hinglish content on selected pages.

## Public pages
- [Free Kundli preview](${SITE_URL}/): Enter birth date, time, and place to preview calculated chart signs.
- [Daily Horoscope and Rashifal](${SITE_URL}/horoscope): Choose a sign for its daily reading.
- [Aries Rashifal](${SITE_URL}/horoscope/aries)
- [Taurus Rashifal](${SITE_URL}/horoscope/taurus)
- [Gemini Rashifal](${SITE_URL}/horoscope/gemini)
- [Cancer Rashifal](${SITE_URL}/horoscope/cancer)
- [Leo Rashifal](${SITE_URL}/horoscope/leo)
- [Virgo Rashifal](${SITE_URL}/horoscope/virgo)
- [Libra Rashifal](${SITE_URL}/horoscope/libra)
- [Scorpio Rashifal](${SITE_URL}/horoscope/scorpio)
- [Sagittarius Rashifal](${SITE_URL}/horoscope/sagittarius)
- [Capricorn Rashifal](${SITE_URL}/horoscope/capricorn)
- [Aquarius Rashifal](${SITE_URL}/horoscope/aquarius)
- [Pisces Rashifal](${SITE_URL}/horoscope/pisces)
- [Panchang](${SITE_URL}/panchang): Tithi, nakshatra, yoga, karana, and muhurat.
- [Kundli matching guide and tool](${SITE_URL}/kundli-matching)
- [Tarot guide](${SITE_URL}/tarot)
- [Numerology guide](${SITE_URL}/numerology)
- [Palmistry guide](${SITE_URL}/palmistry)
- [Gemstone guide](${SITE_URL}/gemstones)
- [Lal Kitab guide](${SITE_URL}/lal-kitab)
- [About AstroVedji](${SITE_URL}/about)
- [Contact AstroVedji](${SITE_URL}/contact)

## Feeds and discovery
- [RSS daily rashifal](${SITE_URL}/feed.xml): Daily entries for 12 zodiac signs.
- [XML sitemap](${SITE_URL}/sitemap.xml)

## Notes
- The AI Kundli report and Love reading require an account and are not public reference content.
- Astrology content is for guidance and entertainment, not professional advice.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
