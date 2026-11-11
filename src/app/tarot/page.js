import InfoPage from "@/components/InfoPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/tarot",
  title: "Tarot Card Reading Guide: How It Works | AstroVedji",
  description: "Learn what tarot cards represent, how to frame a reflective question and what a reading can—and cannot—tell you.",
  keywords: ["tarot card meanings", "tarot reading guide", "how tarot reading works", "टैरो कार्ड रीडिंग"],
});

export default function TarotPage() {
  return (
    <InfoPage
      emoji="🔮"
      title="Tarot Reading"
      subtitle="A beginner-friendly guide to tarot cards, spreads and reflective questions."
      content={[
        {
          heading: "What is a tarot reading?",
          body: "Tarot uses a deck of illustrated cards as prompts for reflection. Readers interpret the images and their positions in a spread; different traditions can give the same card different meanings. A reading is not a verified prediction or a substitute for professional advice.",
        },
        {
          heading: "How to ask a useful tarot question",
          body: "Open-ended questions about your own priorities can be more useful than asking a deck to guarantee another person's actions or a future event. Treat the result as a prompt to think, not as the only basis for a relationship, health, career or financial decision.",
        },
      ]}
      cta={{ note: "An interactive tarot card-reading tool is not available on AstroVedji yet. Explore the live daily horoscope instead.", href: "/horoscope", label: "Read today's horoscope" }}
    />
  );
}
