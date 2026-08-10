import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PublicIcon from "@mui/icons-material/Public";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "About Us — AstroVeda",
  description:
    "AstroVeda blends authentic Vedic astrology with modern technology to bring you free kundli, honest horoscopes and trusted astrologer consultations.",
};

const values = [
  { Icon: VerifiedIcon, title: "Authenticity", desc: "Every calculation follows classical Vedic principles — no shortcuts, no vague guesswork." },
  { Icon: HandshakeIcon, title: "Trust", desc: "Verified astrologers, transparent pricing and privacy-first handling of your birth details." },
  { Icon: AutoAwesomeIcon, title: "Clarity", desc: "We turn complex charts into guidance you can actually understand and act on." },
  { Icon: PublicIcon, title: "Accessibility", desc: "Free core tools in your language, on any device, for seekers everywhere." },
];

const stats = [
  ["50L+", "Kundlis generated"],
  ["1200+", "Verified astrologers"],
  ["25+", "Years of tradition"],
  ["4.9★", "Average rating"],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        emoji="🔯"
        breadcrumb={<><Link href="/" className="text-gold-400 no-underline hover:underline">Home</Link> / About Us</>}
        title="Guided by the stars, grounded in tradition"
        subtitle="AstroVeda is where centuries-old Vedic wisdom meets modern technology — helping millions find clarity, one chart at a time."
      />

      <div className="container-x pb-5">
        {/* Story */}
        <div className="glass rounded-[22px] px-[30px] py-[34px] mb-10">
          <h2 className="font-display gold-text text-[26px] mt-0">Our Story</h2>
          <p className="text-ink-dim text-base leading-8">
            AstroVeda began with a simple belief — that the timeless knowledge of Jyotish should be
            available to everyone, not locked away in dusty manuscripts or expensive consultations.
            What started as a small circle of astrologers and engineers has grown into a trusted
            platform serving millions of seekers across the world.
          </p>
          <p className="text-ink-dim text-base leading-8 mb-0">
            Today we combine precise astronomical calculations with the guidance of experienced
            practitioners, so whether you want a free kundli, a daily rashifal or a heart-to-heart
            with an astrologer, you get answers rooted in authentic tradition — delivered with the
            ease of modern technology.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mb-12">
          {stats.map(([n, l]) => (
            <div key={l} className="glass card-hover rounded-[18px] p-6 text-center">
              <div className="gold-text font-display text-[30px] font-bold">{n}</div>
              <div className="text-ink-dim text-sm mt-1">{l}</div>
            </div>
          ))}
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
