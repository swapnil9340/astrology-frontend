import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Lal Kitab — AstroVeda",
  description: "Simple, powerful remedies from the legendary Lal Kitab tradition.",
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
