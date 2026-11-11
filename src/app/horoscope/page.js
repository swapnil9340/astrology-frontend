import Link from "next/link";
import PageHero from "@/components/PageHero";
import { zodiacSigns } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/horoscope",
  title: "Daily Horoscope Today & Aaj Ka Rashifal | AstroVedji",
  description: "Read aaj ka rashifal and today's horoscope for all 12 zodiac signs, with daily guidance for love, career, health and finance.",
  keywords: ["daily horoscope today", "aaj ka rashifal", "today horoscope", "आज का राशिफल", "daily rashifal in hindi"],
});

export default function HoroscopePage() {
  return (
    <>
      <PageHero
        emoji="🌙"
        breadcrumb={<><Link href="/" className="text-gold-400 no-underline hover:underline">Home</Link> / Horoscope</>}
        title="Aaj ka Rashifal"
        subtitle="Apni rashi chuno aur aaj ka AI-powered daily horoscope padho."
      />

      <div className="container-x pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {zodiacSigns.map((z) => (
            <Link
              key={z.name}
              href={`/horoscope/${z.name.toLowerCase()}`}
              className="glass card-hover rounded-2xl p-5 text-center no-underline"
            >
              <div className="text-4xl text-gold-400">{z.symbol}</div>
              <div className="font-display text-lg font-bold mt-2 text-ink">{z.name}</div>
              <div className="text-ink-dim text-[13px]">{z.hindi}</div>
              <div className="text-ink-dim text-[12px] mt-1">{z.dates}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
