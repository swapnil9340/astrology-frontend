import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Sign in — AstroVeda",
  description: "Sign in to your AstroVeda account to access your kundli, horoscopes and consultations.",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
