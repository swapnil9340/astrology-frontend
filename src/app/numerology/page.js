import InfoPage from "@/components/InfoPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/numerology",
  title: "Numerology Guide: Life Path and Birth Numbers | AstroVedji",
  description: "Learn how life path and birth numbers are commonly calculated in numerology, and how to interpret them as a reflective practice.",
  keywords: ["life path number meaning", "how to calculate life path number", "birth number numerology", "अंक ज्योतिष"],
});

export default function NumerologyPage() {
  return (
    <InfoPage
      emoji="🔢"
      title="Numerology"
      subtitle="An introduction to life path and birth numbers in numerology."
      content={[
        {
          heading: "What is a life path number?",
          body: "In one common numerology method, the digits in a birth date are added and reduced to a single digit, with some traditions treating particular master numbers differently. Other numerology systems use different rules, so results can vary by method.",
        },
        {
          heading: "Use numerology as reflection",
          body: "Numerology is a spiritual belief system rather than a scientifically validated way to establish personality or predict outcomes. AstroVedji does not currently provide a live numerology calculator; avoid using a number reading in place of qualified advice or your own judgement.",
        },
      ]}
      cta={{ note: "The AstroVedji numerology calculator is not available yet. You can try the public birth-chart preview.", href: "/#free-kundli-calculator", label: "Open free Kundli preview" }}
    />
  );
}
