import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Gemstones — AstroVeda",
  description: "Know which gemstone strengthens your planets and changes your fortune.",
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
