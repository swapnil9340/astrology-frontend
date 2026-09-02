import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Kundli Matching — AstroVeda",
  description: "Ashtakoot Guna Milan for marriage compatibility and Mangal dosha check.",
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
