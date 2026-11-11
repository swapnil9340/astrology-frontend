import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PublicIcon from "@mui/icons-material/Public";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PageHero from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about",
  title: "About AstroVedji: Vedic Astrology Tools and Guides",
  description: "Learn how AstroVedji calculates a public Vedic chart preview and provides daily horoscope and Panchang information.",
});

const values = [
  { Icon: VerifiedIcon, title: "Clear calculations", desc: "Chart placements are shown separately from belief-based interpretations." },
  { Icon: HandshakeIcon, title: "Honest limitations", desc: "Astrology readings are not presented as guaranteed outcomes or professional advice." },
  { Icon: AutoAwesomeIcon, title: "Understandable tools", desc: "Chart and Panchang terms are explained in straightforward language." },
  { Icon: PublicIcon, title: "Accessible preview", desc: "The public chart preview is available online without creating an account." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        emoji="🔯"
        breadcrumb={<><Link href="/" className="text-gold-400 no-underline hover:underline">Home</Link> / About Us</>}
        title="Vedic astrology tools, explained clearly"
        subtitle="AstroVedji offers a public birth-chart preview, daily rashifal and live Panchang information."
      />

      <div className="container-x pb-5">
        {/* Story */}
        <div className="glass rounded-[22px] px-[30px] py-[34px] mb-10">
          <h2 className="font-display gold-text text-[26px] mt-0">What AstroVedji offers</h2>
          <p className="text-ink-dim text-base leading-8">
            AstroVedji is a web project for people exploring Vedic astrology. The public birth-chart
            preview uses a birth date and, when provided, time and place to calculate chart details
            such as the Moon sign, Sun sign, nakshatra and ascendant.
          </p>
          <p className="text-ink-dim text-base leading-8 mb-0">
            Daily horoscope pages and the Panchang display offer additional astrology-related
            information. Interpretations are for reflection and entertainment; they do not establish
            facts about the future or replace professional advice.
          </p>
        </div>

        {/* Values */}
        <h2 className="font-display text-[28px] text-center mb-7">What we stand for</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
          {values.map(({ Icon, title, desc }) => (
            <div key={title} className="glass card-hover rounded-[18px] p-[26px]">
              <Icon className="text-gold-400" sx={{ fontSize: 34, mb: 1.5 }} />
              <h3 className="text-lg m-0 mb-2 font-semibold">{title}</h3>
              <p className="text-ink-dim text-sm leading-7 m-0">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-[22px] px-7 py-9 text-center border border-gold-500/35 bg-[radial-gradient(120%_140%_at_50%_0%,rgba(225,29,72,0.32),rgba(31,9,22,0.65)_55%)]">
          <h2 className="font-display text-[26px] m-0 mb-2.5">Ready to see what the stars say?</h2>
          <p className="text-ink-dim mt-0 mb-6">Generate your free Vedic kundli in seconds.</p>
          <Link
            href="/kundli"
            className="btn-gold inline-flex items-center gap-1.5 px-7 py-3 rounded-full no-underline"
          >
            Get Free Kundli <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </Link>
        </div>
      </div>
    </>
  );
}
