import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Astrology Gemstones — Ratna Recommendation | AstroVeda",
  description: "Know which gemstone (ratna) strengthens your planets and changes your fortune, as per Vedic astrology.",
  keywords: [
    "gemstones astrology", "ratna", "navaratna", "lucky gemstone", "birthstone",
    "रत्न", "नवरत्न", "ज्योतिष रत्न",
  ],
};

export default function GemstonesPage() {
  return (
    <InfoPage
      emoji="💎"
      title="Gemstones"
      subtitle="Jaano kaunsa ratna aapke grahon ko mazboot karta hai."
      wikiTitle="Navaratna"
      cta={{ note: "Personalised gemstone suggestion aapki kundli se jald.", href: "/kundli", label: "Get your Free Kundli" }}
    />
  );
}
