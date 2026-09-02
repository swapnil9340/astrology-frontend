import InfoPage from "@/components/InfoPage";
import Panchang from "@/components/Panchang";

export const metadata = {
  title: "Panchang — AstroVeda",
  description: "Today's real-time Panchang — tithi, nakshatra, yoga, karana, sunrise, sunset, rahu kaal.",
};

export default function PanchangPage() {
  return (
    <InfoPage
      emoji="🕉️"
      title="Panchang"
      subtitle="Aaj ka live Panchang — tithi, nakshatra, muhurat aur zyada."
      wikiTitle="Panchangam"
      cta={{ note: "Apni kundli ke saath personalised muhurat jald.", href: "/kundli", label: "Get your Free Kundli" }}
    >
      {/* live real-time panchang */}
      <Panchang />
    </InfoPage>
  );
}
