import Link from "next/link";
import PageHero from "@/components/PageHero";
import MatchMaking from "@/components/MatchMaking";

export const metadata = {
  title: "Kundli Matching for Marriage — Guna Milan | AstroVedji",
  description: "Free Ashtakoot Guna Milan (36 points) & Mangal dosha check for marriage compatibility. Full match-making report.",
  keywords: [
    "kundli matching", "horoscope matching", "guna milan", "gun milan", "kundli milan",
    "marriage matching", "mangal dosha", "कुंडली मिलान", "गुण मिलान", "मंगल दोष",
  ],
};

export default function KundliMatchingPage() {
  return (
    <>
      <PageHero
        emoji="💑"
        breadcrumb={<><Link href="/" className="text-gold-400 no-underline hover:underline">Home</Link> / Kundli Matching</>}
        title="Kundli Matching"
        subtitle="Ashtakoot Guna Milan (36 guna) + Mangal dosha — dono logon ki details do."
      />
      <MatchMaking />
    </>
  );
}
