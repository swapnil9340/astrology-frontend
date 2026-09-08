import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import RashifalView from "@/components/RashifalView";
import { zodiacSigns } from "@/lib/data";

function findSign(slug) {
  return zodiacSigns.find((z) => z.name.toLowerCase() === String(slug).toLowerCase());
}

export function generateStaticParams() {
  return zodiacSigns.map((z) => ({ sign: z.name.toLowerCase() }));
}

export async function generateMetadata({ params }) {
  const { sign } = await params;
  const z = findSign(sign);
  if (!z) return { title: "Rashifal — AstroVedji" };
  const n = z.name;
  return {
    title: `${n} Daily Horoscope Today — AstroVedji`,
    description: `Aaj ka ${n} (${z.hindi}) rashifal — love, career, health, lucky number & color.`,
    keywords: [
      `${n} horoscope today`, `${n} daily horoscope`, `${n} horoscope`, `${n} rashifal`,
      `${z.hindi} rashifal`, `aaj ka ${n} rashifal`, `${n} love horoscope`, `${n} career horoscope`,
      "daily horoscope", "rashifal",
    ],
    alternates: { canonical: `/horoscope/${n.toLowerCase()}` },
  };
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
        title={`${z.name} — Aaj ka Rashifal`}
        subtitle={`${z.hindi} • ${z.dates} • ${z.element}`}
      />

      <div className="container-x pb-8">
        <RashifalView slug={z.name.toLowerCase()} />

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
      </div>
    </>
  );
}
