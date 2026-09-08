import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Numerology Calculator — Life Path Number | AstroVedji",
  description: "Discover your life-path and destiny number from your name and birth date. Free numerology reading.",
  keywords: [
    "numerology", "numerology calculator", "life path number", "destiny number",
    "name numerology", "अंक ज्योतिष", "मूलांक", "भाग्यांक",
  ],
};

export default function NumerologyPage() {
  return (
    <InfoPage
      emoji="🔢"
      title="Numerology"
      subtitle="Naam aur janm-tithi se aapka life-path aur destiny number."
      wikiTitle="Numerology"
      cta={{ note: "Numerology calculator jald aa raha hai.", href: "/register", label: "Create account" }}
    />
  );
}
