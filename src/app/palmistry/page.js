import InfoPage from "@/components/InfoPage";

export const metadata = {
  title: "Palmistry — AstroVeda",
  description: "Read the lines of your palm to understand your life's path.",
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
