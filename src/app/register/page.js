import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Create account — AstroVeda",
  description: "Create your free AstroVeda account to unlock kundli, horoscopes and astrologer consultations.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
