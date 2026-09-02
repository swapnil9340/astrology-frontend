import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Numerology — AstroVeda",
  description: "Discover your life-path and destiny number from your name and birth date.",
};

export default function NumerologyPage() {
  return (
    <InfoPage
      emoji="🔢"
      title="Numerology"
      subtitle="Naam aur janm-tithi se aapka life-path aur destiny number."
      wikiTitle="Numerology"
      cta={{ note: "Numerology calculator jald aa raha hai.", href: "/register", label: "Create account" }}
    />
  );
}
