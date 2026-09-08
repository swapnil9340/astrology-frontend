import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Sign in — AstroVedji",
  description: "Sign in to your AstroVedji account to access your kundli, horoscopes and consultations.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
