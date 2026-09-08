import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Careers — AstroVedji",
  description: "Join the AstroVedji team — astrologers, engineers and creators.",
};

const roles = [
  { title: "Vedic Astrologer (Consultant)", type: "Remote · Part/Full-time", desc: "Verified astrologers for chat/call consultations." },
  { title: "Full-Stack Engineer", type: "Remote · Full-time", desc: "Next.js + Node.js — build the prediction platform." },
  { title: "Content Writer (Astrology)", type: "Remote · Contract", desc: "Write horoscopes, guides and blog content." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        emoji="🚀"
        breadcrumb={<><Link href="/" className="text-gold-400 no-underline hover:underline">Home</Link> / Careers</>}
        title="Work with the stars"
        subtitle="AstroVedji ko build karne mein saath do — astrologers, engineers aur creators."
      />
      <div className="container-x pb-8">
        <div className="grid gap-4 max-w-[760px] mx-auto">
          {roles.map((r) => (
            <div key={r.title} className="glass card-hover rounded-[18px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-display text-lg m-0">{r.title}</h3>
                <div className="text-gold-400 text-[13px] mt-0.5">{r.type}</div>
                <p className="text-ink-dim text-sm mt-1.5 mb-0">{r.desc}</p>
              </div>
              <Link href="/contact" className="btn-gold px-5 py-2.5 rounded-full no-underline text-center shrink-0">Apply</Link>
            </div>
          ))}
          <p className="text-ink-dim text-sm text-center mt-2">
            Koi aur role? <Link href="/contact" className="text-gold-400 no-underline hover:underline">Contact us</Link> — hum sunna chahenge.
          </p>
        </div>
      </div>
    </>
  );
}
