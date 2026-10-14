import { SITE_NAME, SITE_URL } from "@/lib/site";
import { zodiacSigns } from "@/lib/data";
import { getRashifal } from "@/lib/rashifal";

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const now = new Date();
  const date = now.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const items = zodiacSigns.map((sign) => {
    const slug = sign.name.toLowerCase();
    const reading = getRashifal(slug);
    const link = `${SITE_URL}/horoscope/${slug}`;
    const title = `${sign.name} (${sign.hindi}) Rashifal — ${date}`;
    const description = reading?.overall || `Read today's ${sign.name} horoscope and rashifal.`;

    return `
      <item>
        <title>${escapeXml(title)}</title>
        <link>${escapeXml(link)}</link>
        <guid isPermaLink="false">${escapeXml(`${link}#${date}`)}</guid>
        <pubDate>${now.toUTCString()}</pubDate>
        <description>${escapeXml(description)}</description>
      </item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_NAME} — Daily Rashifal</title>
    <link>${SITE_URL}/horoscope</link>
    <description>Daily horoscope and rashifal in Hindi and English for all 12 zodiac signs.</description>
    <language>hi-IN</language>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
