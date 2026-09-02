import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Tarot Reading — AstroVeda",
  description: "Discover the guidance the tarot cards hold for you.",
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
