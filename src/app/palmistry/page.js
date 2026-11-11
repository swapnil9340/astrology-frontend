import InfoPage from "@/components/InfoPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/palmistry",
  title: "Palmistry Guide: Palm Lines and Hast Rekha | AstroVedji",
  description: "An introduction to palmistry, commonly discussed palm lines and the limits of interpreting a hand reading.",
  keywords: ["palmistry guide", "palm reading meaning", "hast rekha", "हस्तरेखा"],
});

export default function PalmistryPage() {
  return (
    <InfoPage
      emoji="🖐️"
      title="Palmistry"
      subtitle="A beginner's guide to palmistry and traditional interpretations of palm lines."
      content={[
        {
          heading: "What do palm lines mean in palmistry?",
          body: "Palmistry (hast rekha) is a traditional practice in which readers interpret hand shape and lines. Names and meanings vary across schools, and palm lines are not a reliable way to verify a person's future or diagnose a health condition.",
        },
        {
          heading: "Palm reading on AstroVedji",
          body: "This page is an educational overview. AstroVedji does not currently accept hand images or provide an automated palm reading. Be cautious about sharing biometric images or paying anyone who promises certain results.",
        },
      ]}
      cta={{ note: "Palm-image analysis is not available yet. Explore the public Vedic chart preview.", href: "/#free-kundli-calculator", label: "Open free Kundli preview" }}
    />
  );
}
