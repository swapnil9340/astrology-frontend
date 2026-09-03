import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Palmistry — Palm Reading | AstroVeda",
  description: "Read the lines of your palm (hast rekha) to understand your life's path.",
  keywords: [
    "palmistry", "palm reading", "hast rekha", "hand reading", "हस्तरेखा", "हाथ की रेखा",
  ],
};

export default function PalmistryPage() {
  return (
    <InfoPage
      emoji="🖐️"
      title="Palmistry"
      subtitle="Haath ki rekhaon se apni zindagi ki disha jaano."
      wikiTitle="Palmistry"
      cta={{ note: "Palm reading (image upload) feature jald.", href: "/register", label: "Create account" }}
    />
  );
}
