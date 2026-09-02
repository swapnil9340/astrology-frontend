"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import StarIcon from "@mui/icons-material/Star";
import BoltIcon from "@mui/icons-material/Bolt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DiamondIcon from "@mui/icons-material/Diamond";
import PageHero from "@/components/PageHero";
import { apiPlans } from "@/lib/api";
import { startPayment } from "@/lib/payment";
import { useAuth } from "@/context/AuthContext";

const PLAN_ICON = { free: StarIcon, silver: BoltIcon, gold: WorkspacePremiumIcon, platinum: DiamondIcon };

export default function PricingPage() {
  const { user, token, refreshUser } = useAuth();
  const router = useRouter();
  const [plans, setPlans] = useState(null);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");

  async function subscribe(planId) {
    if (!user) { router.push("/login"); return; }
    setBusy(planId);
    setMsg("");
    try {
      await startPayment({ kind: "plan", itemId: planId, token, user });
      await refreshUser();
      setMsg("🎉 Subscription active ho gaya!");
    } catch (e) {
      setMsg(e.message || "Payment fail hua.");
    } finally {
      setBusy("");
    }
  }

  const isCurrent = (id) => user?.subscription?.plan === id && user?.subscription?.status === "active";

  useEffect(() => {
    let active = true;
    apiPlans()
      .then((res) => active && setPlans(res.plans))
      .catch(() => active && setError(true));
    return () => { active = false; };
  }, []);

  return (
    <>
      <PageHero
        emoji="✨"
        breadcrumb={<><Link href="/" className="text-gold-400 no-underline hover:underline">Home</Link> / Pricing</>}
        title="Choose your cosmic plan"
        subtitle="Free se shuru karo, jab chaho upgrade karo. Har plan mein zyada kundli aur features."
      />

      <div className="container-x pb-10">
        {error && <p className="text-center text-ink-dim">Plans load nahi ho paye — backend chalu karein.</p>}
        {msg && (
          <p className="text-center text-ink glass rounded-full inline-block px-5 py-2 mx-auto mb-6 w-full max-w-[420px]">{msg}</p>
        )}

        {!plans && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-[20px] p-6 h-[360px] animate-pulse bg-white/[0.03]" />
            ))}
          </div>
        )}

        {plans && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {plans.map((p) => {
              const Icon = PLAN_ICON[p.id] || StarIcon;
              const isFree = p.price === 0;
              return (
                <div
                  key={p.id}
                  className={`relative glass card-hover rounded-[20px] p-6 flex flex-col ${
                    p.popular ? "border-gold-500/60 shadow-[0_18px_50px_-20px_rgba(225,29,72,0.6)]" : ""
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 btn-gold text-[12px] px-3 py-1 rounded-full inline-flex items-center gap-1">
                      <AutoAwesomeIcon sx={{ fontSize: 14 }} /> Most Popular
                    </span>
                  )}

                  <Icon className="text-gold-400" sx={{ fontSize: 30 }} />
                  <h3 className="font-display text-2xl font-bold mt-2 mb-0">{p.name}</h3>
                  <p className="text-ink-dim text-[13px] mt-0.5 mb-3">{p.tagline}</p>

                  <div className="mb-4">
                    {isFree ? (
                      <span className="font-display text-[32px] font-bold gold-text">Free</span>
                    ) : (
                      <>
                        <span className="font-display text-[32px] font-bold gold-text">₹{p.price}</span>
                        <span className="text-ink-dim text-sm"> / {p.period}</span>
                      </>
                    )}
                  </div>

                  <ul className="list-none p-0 m-0 grid gap-2.5 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-ink-dim">
                        <CheckCircleIcon className="text-gold-400 shrink-0" sx={{ fontSize: 18 }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    {isFree ? (
                      <Link
                        href={user ? "/kundli" : "/register"}
                        className="btn-gold w-full inline-flex items-center justify-center px-4 py-3 rounded-full no-underline"
                      >
                        {user ? "Use Free" : "Get started"}
                      </Link>
                    ) : (
                      <button
                        onClick={() => subscribe(p.id)}
                        disabled={busy === p.id || isCurrent(p.id)}
                        className="btn-gold w-full inline-flex items-center justify-center px-4 py-3 rounded-full border-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isCurrent(p.id) ? "Current plan" : busy === p.id ? "Processing…" : "Subscribe"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-center text-ink-dim text-[13px] mt-8">
          Ek-baar ka pack bhi available: <span className="text-ink">₹100 = 10 kundli</span> (kundli page pe limit khatam hone par).
        </p>
      </div>
    </>
  );
}
