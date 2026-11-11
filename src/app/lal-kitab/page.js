import InfoPage from "@/components/InfoPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/lal-kitab",
  title: "Lal Kitab Astrology: A Guide to Its Remedies | AstroVedji",
  description: "A clear introduction to Lal Kitab astrology, its traditional remedies and questions to consider before following an upay.",
  keywords: ["lal kitab remedies", "lal kitab upay", "lal kitab astrology guide", "लाल किताब उपाय"],
});

export default function LalKitabPage() {
  return (
    <InfoPage
      emoji="🧿"
      title="Lal Kitab"
      subtitle="An introduction to Lal Kitab tradition and how to approach remedies thoughtfully."
      content={[
        {
          heading: "What is Lal Kitab?",
          body: "Lal Kitab refers to a tradition of astrological texts and interpretations that includes suggested upay. Practices and explanations can differ between practitioners; a remedy should not be presented as a guaranteed way to change an outcome.",
        },
        {
          heading: "Choose remedies carefully",
          body: "Understand what a suggested practice involves before following it, and avoid advice that asks you to stop medical care, take on debt or make a major decision under pressure. AstroVedji does not currently generate personalised Lal Kitab remedies.",
        },
      ]}
      cta={{ note: "Personalised Lal Kitab remedies are not available yet. Start with the free chart preview.", href: "/#free-kundli-calculator", label: "Open free Kundli preview" }}
    />
  );
}
