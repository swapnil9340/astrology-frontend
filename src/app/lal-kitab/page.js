import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Lal Kitab Remedies & Astrology | AstroVeda",
  description: "Simple, powerful remedies (upay) from the legendary Lal Kitab tradition.",
  keywords: [
    "lal kitab", "lal kitab remedies", "lal kitab upay", "lal kitab astrology",
    "लाल किताब", "लाल किताब उपाय",
  ],
};

export default function LalKitabPage() {
  return (
    <InfoPage
      emoji="🧿"
      title="Lal Kitab"
      subtitle="Lal Kitab ki saral aur asardar remedies."
      wikiTitle="Lal Kitab"
      cta={{ note: "Lal Kitab remedies aapki kundli ke saath jald.", href: "/kundli", label: "Get your Free Kundli" }}
    />
  );
}
