import Link from "next/link";
import GavelIcon from "@mui/icons-material/Gavel";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Disclaimer — AstroVeda",
  description:
    "Read the AstroVeda disclaimer regarding the use of astrology content, predictions, remedies and consultations provided on this website.",
};

const sections = [
  {
    heading: "For guidance, not certainty",
    body: "The horoscopes, kundli reports, predictions, remedies and other astrological content on AstroVeda are provided for informational and entertainment purposes only. Astrology is a belief system and is not recognised as a science. Nothing here should be treated as a guaranteed outcome.",
  },
  {
    heading: "Not professional advice",
    body: "Our content is not a substitute for professional medical, legal, financial, psychological or any other qualified advice. Always consult a certified professional before making important decisions about your health, finances, relationships or career.",
  },
  {
    heading: "Your decisions are your own",
    body: "Any action you take based on the information found on this website is strictly at your own risk. AstroVeda and its astrologers will not be liable for any losses or damages arising from the use of our tools, reports or consultations.",
  },
  {
    heading: "Accuracy of calculations",
    body: "While we strive to keep our astronomical calculations and content accurate and up to date, we make no warranties of any kind about the completeness, reliability or accuracy of the information presented.",
  },
  {
    heading: "Third-party astrologers",
    body: "Consultations are offered by independent, verified astrologers. The views and remedies they share are their own. AstroVeda acts only as a platform connecting you with them and does not endorse any specific prediction or remedy.",
  },
  {
    heading: "External links",
    body: "Our website may contain links to third-party websites. We have no control over their content or practices and are not responsible for them. Accessing such links is at your own discretion.",
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        emoji="⚖️"
        breadcrumb={<><Link href="/" className="text-gold-400 no-underline hover:underline">Home</Link> / Disclaimer</>}
        title="Disclaimer"
        subtitle="Please read this carefully before using AstroVeda's astrology tools, reports and consultations."
      />

      <div className="container-x pb-5">
        {/* Highlight note */}
        <div className="glass rounded-2xl p-5 flex gap-3 items-start mb-8 border-gold-500/30">
          <InfoOutlinedIcon className="text-gold-400 shrink-0" sx={{ fontSize: 24 }} />
          <p className="text-ink-dim text-[15px] leading-7 m-0">
            By using this website you acknowledge and agree to the terms below. Astrology should
            complement — never replace — your own judgement and professional guidance.
          </p>
        </div>

        {/* Sections */}
        <div className="grid gap-4">
          {sections.map((s, i) => (
            <section key={s.heading} className="glass rounded-[18px] px-6 py-6">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="w-8 h-8 shrink-0 rounded-lg grid place-items-center bg-gold-500/15 text-gold-400 font-display font-bold">
                  {i + 1}
                </span>
                <h2 className="font-display text-xl m-0">{s.heading}</h2>
              </div>
              <p className="text-ink-dim text-[15px] leading-7 m-0">{s.body}</p>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-ink-dim text-sm">
          <GavelIcon sx={{ fontSize: 18 }} />
          <span>Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
        </div>
      </div>
    </>
  );
}
