import InfoPage from "@/components/InfoPage";
import Panchang from "@/components/Panchang";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/panchang",
  title: "Aaj Ka Panchang Today: Tithi, Nakshatra & Muhurat | AstroVedji",
  description: "Check today's panchang with tithi, nakshatra, yoga, karana, sunrise, sunset, rahu kaal and abhijit muhurat.",
  keywords: [
    "panchang", "aaj ka panchang", "today panchang", "rahu kaal", "shubh muhurat",
    "aaj ka panchang in hindi", "aaj ka panchang kya hai", "tithi today",
    "आज का पंचांग", "पंचांग", "राहु काल", "शुभ मुहूर्त",
  ],
});

export default function PanchangPage() {
  return (
    <InfoPage
      emoji="🕉️"
      title="Panchang"
      subtitle="Today's live Panchang — tithi, nakshatra, yoga, sunrise, rahu kaal and muhurat."
      content={[
        {
          heading: "What is today's Panchang?",
          body: "A Hindu panchang is a traditional calendar that describes elements such as tithi, nakshatra, yoga, karana and weekday (vaara). Sunrise, sunset and time periods such as rahu kaal depend on the selected date and location; this page currently calculates the live display for its default location.",
        },
        {
          heading: "Location and local timings",
          body: "Panchang timings can differ between cities and time zones. Check the displayed date and location before using a time for a ceremony or personal observance. The calculation is informational and is not a guarantee of an outcome.",
        },
      ]}
      cta={{ note: "Apni kundli ke saath personalised muhurat jald.", href: "/kundli", label: "Get your Free Kundli" }}
    >
      {/* live real-time panchang */}
      <Panchang />
    </InfoPage>
  );
}
