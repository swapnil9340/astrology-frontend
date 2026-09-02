import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Daily Horoscope — AstroVeda",
  description: "Your daily horoscope and rashifal — love, career, health and more.",
};

export default function HoroscopePage() {
  return (
    <InfoPage
      emoji="🌙"
      title="Horoscope"
      subtitle="Sitaron ke hisaab se aapka daily rashifal — love, career, health."
      wikiTitle="Horoscope"
      cta={{ note: "Apna personalised horoscope chahiye? Free kundli banao.", href: "/kundli", label: "Get your Free Kundli" }}
    />
  );
}
