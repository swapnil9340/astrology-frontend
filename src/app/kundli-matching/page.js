import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Kundli Matching — AstroVeda",
  description: "Ashtakoot Guna Milan for marriage compatibility and Mangal dosha check.",
  keywords: [
    "kundli matching", "horoscope matching", "guna milan", "gun milan", "kundli milan",
    "marriage matching", "mangal dosha", "कुंडली मिलान", "गुण मिलान", "मंगल दोष",
  ],
};

export default function KundliMatchingPage() {
  return (
    <InfoPage
      emoji="💑"
      title="Kundli Matching"
      subtitle="Shaadi ke liye Ashtakoot Guna Milan aur Mangal dosha check."
      wikiTitle="Kundali matching"
      cta={{ note: "Full kundli matching feature jald — abhi apni kundli banao.", href: "/kundli", label: "Get your Free Kundli" }}
    />
  );
}
