import InfoPage from "@/components/InfoPage";
import Panchang from "@/components/Panchang";

export const metadata = {
  title: "Aaj ka Panchang — Tithi, Nakshatra, Muhurat | AstroVeda",
  description: "Today's real-time Panchang — tithi, nakshatra, yoga, karana, sunrise, sunset, rahu kaal & shubh muhurat.",
  keywords: [
    "panchang", "aaj ka panchang", "today panchang", "rahu kaal", "shubh muhurat",
    "tithi", "nakshatra", "आज का पंचांग", "पंचांग", "राहु काल", "शुभ मुहूर्त",
  ],
};

export default function PanchangPage() {
  return (
    <InfoPage
      emoji="🕉️"
      title="Panchang"
      subtitle="Aaj ka live Panchang — tithi, nakshatra, muhurat aur zyada."
      wikiTitle="Panchangam"
      hideImage
      cta={{ note: "Apni kundli ke saath personalised muhurat jald.", href: "/kundli", label: "Get your Free Kundli" }}
    >
      {/* live real-time panchang */}
      <Panchang />
    </InfoPage>
  );
}
