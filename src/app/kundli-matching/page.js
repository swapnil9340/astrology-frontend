import Link from "next/link";
import PageHero from "@/components/PageHero";
import MatchMaking from "@/components/MatchMaking";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/kundli-matching",
  title: "Kundli Matching for Marriage: Guna Milan Guide | AstroVedji",
  description: "Understand Ashtakoot Guna Milan, its 36-point framework, Mangal dosha and the birth details used in traditional kundli matching.",
  keywords: [
    "kundli matching for marriage free",
    "kundli matching online",
    "kundli matching by date of birth",
    "kundli milan",
    "guna milan",
    "कुंडली मिलान",
    "गुण मिलान",
  ],
});

export default function KundliMatchingPage() {
  return (
    <>
      <PageHero
        emoji="💑"
        breadcrumb={<><Link href="/" className="text-gold-400 no-underline hover:underline">Home</Link> / Kundli Matching</>}
        title="Kundli Matching"
        subtitle="Ashtakoot Guna Milan (36 guna) + Mangal dosha — dono logon ki details do."
      />
      <div className="container-x pb-6">
        <div className="glass mx-auto grid max-w-[820px] gap-4 rounded-[22px] p-7">
          <section>
            <h2 className="mt-0 font-display text-xl font-bold">What is kundli matching?</h2>
            <p className="m-0 leading-7 text-ink-dim">
              Kundli milan is a traditional horoscope-comparison practice used by some families when discussing marriage. Ashtakoot Guna Milan compares eight koots for a total of up to 36 points. Methods and interpretations can vary between astrologers.
            </p>
          </section>
          <section>
            <h2 className="mt-0 font-display text-xl font-bold">What does a 36-guna score mean?</h2>
            <p className="m-0 leading-7 text-ink-dim">
              A score is one traditional matching input, not a measure of a couple&apos;s real-world compatibility or a guarantee about married life. Traditional matching may use both people&apos;s birth date, time and place; if a birth time is unknown, chart details may be less complete.
            </p>
          </section>
          <p className="m-0 border-t border-white/10 pt-4 text-sm leading-7 text-ink-dim">
            Kundli matching is a cultural practice, not professional relationship advice. Make relationship decisions through respectful conversation and your own judgement.
          </p>
        </div>
      </div>
      <MatchMaking />
    </>
  );
}
