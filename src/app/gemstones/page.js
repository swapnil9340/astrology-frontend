import InfoPage from "@/components/InfoPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/gemstones",
  title: "Astrology Gemstones and Ratna: A Guide | AstroVedji",
  description: "Learn what ratna and navaratna mean in astrology traditions, and what to check before buying or wearing a gemstone.",
  keywords: ["astrology gemstones", "ratna in astrology", "navaratna meaning", "ज्योतिष रत्न"],
});

export default function GemstonesPage() {
  return (
    <InfoPage
      emoji="💎"
      title="Gemstones"
      subtitle="An informative guide to gemstones used in astrology traditions."
      content={[
        {
          heading: "Gemstones in astrology traditions",
          body: "Some Vedic astrology traditions associate particular ratna with planets and interpret wearing them as a spiritual practice. These associations are beliefs, not evidence that a gemstone can change health, relationships, finances or other outcomes.",
        },
        {
          heading: "Before buying a gemstone",
          body: "Check a stone's identity, treatment, return terms and independent certification with a qualified gem professional. AstroVedji does not currently sell gemstones or provide personalised gemstone recommendations; do not make a high-cost purchase based only on a horoscope.",
        },
      ]}
      cta={{ note: "Personalised gemstone recommendations and sales are not available on AstroVedji.", href: "/#free-kundli-calculator", label: "Open free Kundli preview" }}
    />
  );
}
