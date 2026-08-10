import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import ChatIcon from "@mui/icons-material/Chat";
import PlaceIcon from "@mui/icons-material/Place";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us — AstroVeda",
  description: "Get in touch with the AstroVeda team for support, consultations or partnership enquiries.",
};

const channels = [
  { Icon: EmailIcon, label: "Email", value: "support@astroveda.com", note: "We reply within 24 hours" },
  { Icon: CallIcon, label: "Phone", value: "+91 98765 43210", note: "Mon–Sat, 9 AM – 8 PM IST" },
  { Icon: ChatIcon, label: "Live chat", value: "Talk to an astrologer", note: "Available 24×7 in the app" },
  { Icon: PlaceIcon, label: "Office", value: "Jaipur, Rajasthan, India", note: "Visits by appointment" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        emoji="📨"
        breadcrumb={<><Link href="/" className="text-gold-400 no-underline hover:underline">Home</Link> / Contact Us</>}
        title="We'd love to hear from you"
        subtitle="Questions about your kundli, a consultation, or a partnership? Send us a message and our team will get back to you."
      />

      <div className="container-x pb-5">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-7 items-start">
          {/* Channels */}
          <div className="grid gap-4">
            {channels.map(({ Icon, label, value, note }) => (
              <div key={label} className="glass card-hover rounded-2xl p-5 flex gap-4 items-start">
                <div className="w-[46px] h-[46px] shrink-0 rounded-xl grid place-items-center bg-[radial-gradient(circle_at_35%_30%,#2a3577,#131a45)] border border-white/10">
                  <Icon className="text-gold-400" sx={{ fontSize: 22 }} />
                </div>
                <div>
                  <div className="text-ink-dim text-[13px]">{label}</div>
                  <div className="text-base font-semibold">{value}</div>
                  <div className="text-ink-dim text-[13px] mt-0.5">{note}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </>
  );
}
