import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import ZodiacGrid from "@/components/ZodiacGrid";
import Astrologers from "@/components/Astrologers";
import Panchang from "@/components/Panchang";
import CtaBanner from "@/components/CtaBanner";
import Link from "next/link";

function KundliSearchGuide() {
  return (
    <section aria-labelledby="kundli-search-guide" className="py-12">
      <div className="container-x">
        <div className="glass mx-auto max-w-[900px] rounded-[22px] p-7 sm:p-9">
          <h2 id="kundli-search-guide" className="mt-0 font-display text-2xl font-bold">
            Free janam kundli online by date of birth
          </h2>
          <p className="leading-7 text-ink-dim">
            Enter your birth date to preview a Vedic chart. Adding your birth time and city helps
            calculate the ascendant (lagna); the page also shows the calculated Moon sign (rashi),
            Sun sign and nakshatra. If the time or place is unknown, some chart details may be
            unavailable.
          </p>
          <h3 className="font-display text-lg font-semibold">What to know before generating a kundli</h3>
          <ul className="grid gap-2 pl-5 text-sm leading-7 text-ink-dim">
            <li>The public preview calculates chart placements; a personalised AI reading requires an account.</li>
            <li>Astrology is for reflection and entertainment, not a guarantee or professional advice.</li>
            <li>Birth details are personal information. Only enter details you are comfortable sharing.</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/horoscope" className="text-gold-400 no-underline hover:underline">Daily horoscope for all 12 signs</Link>
            <Link href="/panchang" className="text-gold-400 no-underline hover:underline">Today&apos;s Panchang</Link>
            <Link href="/kundli-matching" className="text-gold-400 no-underline hover:underline">Kundli matching guide</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <KundliSearchGuide />
      <ServicesGrid />
      <ZodiacGrid />
      <Astrologers />
      <Panchang />
      <CtaBanner />
    </>
  );
}
