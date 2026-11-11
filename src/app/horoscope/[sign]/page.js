import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import RashifalView from "@/components/RashifalView";
import { zodiacSigns } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

function findSign(slug) {
  return zodiacSigns.find((z) => z.name.toLowerCase() === String(slug).toLowerCase());
}

export function generateStaticParams() {
  return zodiacSigns.map((z) => ({ sign: z.name.toLowerCase() }));
}

export async function generateMetadata({ params }) {
  const { sign } = await params;
  const z = findSign(sign);
  if (!z) return { title: "Rashifal — AstroVedji", robots: { index: false, follow: true } };
  const n = z.name;
  return pageMetadata({
    path: `/horoscope/${n.toLowerCase()}`,
    title: `${n} Horoscope Today & ${z.transliteration} Rashifal | AstroVedji`,
    description: `Read today's ${n} horoscope (aaj ka ${z.transliteration} rashifal) for love, career, health, finance and lucky details.`,
    keywords: [
      `${n.toLowerCase()} horoscope today`,
      `${n.toLowerCase()} daily horoscope`,
      `${z.transliteration.toLowerCase()} rashifal`,
      `aaj ka ${z.transliteration.toLowerCase()} rashifal`,
      `${z.hindi} राशिफल`,
    ],
  });
}

export default async function SignRashifalPage({ params }) {
  const { sign } = await params;
  const z = findSign(sign);
  if (!z) notFound();

  const idx = zodiacSigns.indexOf(z);
  const prev = zodiacSigns[(idx + 11) % 12];
  const next = zodiacSigns[(idx + 1) % 12];

  return (
    <>
      <PageHero
        emoji={z.symbol}
        breadcrumb={
          <>
            <Link href="/" className="text-gold-400 no-underline hover:underline">Home</Link> /{" "}
            <Link href="/horoscope" className="text-gold-400 no-underline hover:underline">Horoscope</Link> / {z.name}
          </>
        }
        title={`${z.name} Rashifal Today — Aaj ka ${z.transliteration} Rashifal`}
        subtitle={`${z.hindi} • ${z.dates} • ${z.element}`}
      />

      <div className="container-x pb-8">
        <RashifalView slug={z.name.toLowerCase()} sign={z.name} hindi={z.hindi} />

        {/* prev / next sign */}
        <div className="flex items-center justify-between max-w-[820px] mx-auto mt-8">
          <Link href={`/horoscope/${prev.name.toLowerCase()}`} className="glass rounded-full px-4 py-2 no-underline text-ink text-sm hover:border-gold-500/50">
            ← {prev.symbol} {prev.name}
          </Link>
          <Link href="/horoscope" className="text-gold-400 no-underline hover:underline text-sm">All signs</Link>
          <Link href={`/horoscope/${next.name.toLowerCase()}`} className="glass rounded-full px-4 py-2 no-underline text-ink text-sm hover:border-gold-500/50">
            {next.symbol} {next.name} →
          </Link>
        </div>
        <nav aria-label="Related astrology tools" className="mx-auto mt-6 flex max-w-[820px] flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <Link href="/panchang" className="text-gold-400 no-underline hover:underline">Today’s Panchang</Link>
          <Link href="/kundli-matching" className="text-gold-400 no-underline hover:underline">Kundli matching guide</Link>
          <Link href="/#free-kundli-calculator" className="text-gold-400 no-underline hover:underline">Free Kundli preview</Link>
        </nav>
      </div>
    </>
  );
}
