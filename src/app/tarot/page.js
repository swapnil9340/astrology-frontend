import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Free Tarot Card Reading Online | AstroVedji",
  description: "Pick a card for today's tarot guidance on love, career and life. Free online tarot reading.",
  keywords: [
    "tarot reading", "free tarot", "tarot card reading online", "daily tarot",
    "love tarot", "टैरो रीडिंग", "टैरो कार्ड",
  ],
};

export default function TarotPage() {
  return (
    <InfoPage
      emoji="🔮"
      title="Tarot Reading"
      subtitle="Card chuno aur brahmand ka sandesh jaano."
      wikiTitle="Tarot"
      cta={{ note: "AI tarot reading jald aa raha hai.", href: "/register", label: "Create account" }}
    />
  );
}
