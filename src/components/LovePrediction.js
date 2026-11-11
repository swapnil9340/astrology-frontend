"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import PageHero from "@/components/PageHero";
import { useAuth } from "@/context/AuthContext";
import { apiPredictHistory, apiPredictLove } from "@/lib/api";
import { startPayment } from "@/lib/payment";

const READING_SECTIONS = [
  ["Relationship style", "relationshipStyle"],
  ["Emotional needs", "emotionalNeeds"],
  ["Strengths", "strengths"],
  ["Growth areas", "growthAreas"],
  ["Guidance", "guidance"],
];

export default function LovePrediction() {
  const { user, token, loading, refreshUser } = useAuth();
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [paywall, setPaywall] = useState(false);
  const [upgradeRequired, setUpgradeRequired] = useState(false);
  const [buying, setBuying] = useState(false);

  const load = useCallback(async (force = false) => {
    if (!token) return;
    try {
      if (!force) {
        const history = await apiPredictHistory(token);
        const latest = history.predictions?.find((item) => item.type === "love");
        if (latest) {
          setData({ chart: latest.chart, prediction: latest.prediction });
          setStatus("done");
          return;
        }
      }
      const result = await apiPredictLove(token);
      setData({ chart: result.chart, prediction: result.prediction });
      setStatus("done");
    } catch (err) {
      if (err.code === "PAYMENT_REQUIRED") setPaywall(true);
      if (err.code === "LIMIT_REACHED") setUpgradeRequired(true);
      setError(err.message || "Something went wrong.");
      setStatus("error");
    }
  }, [token]);

  useEffect(() => {
    if (!loading && user && token && status === "idle") {
      void Promise.resolve().then(() => load());
    }
  }, [loading, user, token, status, load]);

  async function buyPack() {
    setBuying(true);
    setStatus("loading");
    setError("");
    setPaywall(false);
    setUpgradeRequired(false);
    try {
      await startPayment({ kind: "pack", itemId: "pack10", token, user });
      await refreshUser();
      await load(true);
    } catch (err) {
      setError(err.message || "Payment failed.");
      setStatus("error");
    } finally {
      setBuying(false);
    }
  }

  if (loading) {
    return <Centered><Spinner /><span className="text-ink-dim">Loading…</span></Centered>;
  }

  if (!user) {
    return (
      <div className="container-x flex justify-center pt-[70px] pb-16">
        <div className="glass max-w-[440px] rounded-[22px] p-9 text-center">
          <div className="glow-pulse mx-auto grid h-14 w-14 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ff9aa5,#e11d48_60%,#a80f2f)] text-2xl">
            <LockOutlinedIcon />
          </div>
          <h1 className="mt-4 mb-2 font-display text-[26px] font-bold">Your love reading awaits</h1>
          <p className="mb-6 text-sm text-ink-dim">
            Sign in to get relationship guidance based on your saved birth chart.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/register" className="btn-gold rounded-full px-4 py-3 text-center no-underline">Create account</Link>
            <Link href="/login" className="rounded-full border border-white/15 px-4 py-3 text-center text-ink no-underline hover:border-gold-500/50">Sign in</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        emoji="💖"
        breadcrumb={<><Link href="/" className="text-gold-400 no-underline hover:underline">Home</Link> / Love Prediction</>}
        title={`${user.name?.split(" ")[0]}'s Love Reading`}
        subtitle="Relationship guidance grounded in your Vedic birth chart."
      />

      <div className="container-x pb-10">
        {(status === "loading" || status === "idle") && (
          <div className="glass rounded-[22px] p-10 text-center">
            <div className="spin-slow mx-auto grid h-20 w-20 place-items-center rounded-full border border-dashed border-gold-400/40 text-3xl">💖</div>
            <p className="mt-5 font-display text-xl text-ink">Your reading is being prepared…</p>
            <p className="mt-1 text-sm text-ink-dim">We are interpreting the relationship factors in your chart.</p>
          </div>
        )}

        {status === "error" && paywall && (
          <div className="glass mx-auto max-w-[520px] rounded-[22px] border border-gold-500/40 p-8 text-center">
            <h2 className="mt-0 font-display text-[24px] font-bold">Your free AI readings are used</h2>
            <p className="text-sm text-ink-dim">{error}</p>
            <div className="glass my-4 rounded-xl px-4 py-3 text-sm">
              <span className="gold-text font-display text-lg font-bold">₹100 = 10 readings</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button onClick={buyPack} disabled={buying}
                className="btn-gold cursor-pointer rounded-full border-none px-6 py-3 disabled:opacity-70">
                {buying ? "Processing…" : "Buy pack — ₹100"}
              </button>
              <Link href="/pricing" className="rounded-full border border-white/15 px-5 py-3 text-ink no-underline hover:border-gold-500/50">
                See plans
              </Link>
            </div>
          </div>
        )}

        {status === "error" && !paywall && (
          <div className="glass mx-auto max-w-[520px] rounded-[22px] border border-rose-500/30 p-8 text-center">
            <p className="text-ink">{error}</p>
            {upgradeRequired && (
              <Link href="/pricing" className="text-gold-400 no-underline hover:underline">Upgrade your plan</Link>
            )}
            <button onClick={() => {
              setStatus("loading");
              setError("");
              setPaywall(false);
              setUpgradeRequired(false);
              load();
            }} className="btn-gold mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-full border-none px-5 py-2.5">
              <RefreshIcon sx={{ fontSize: 18 }} /> Try again
            </button>
          </div>
        )}

        {status === "done" && data && (
          <Reading
            data={data}
            onRegenerate={() => {
              setStatus("loading");
              setError("");
              setPaywall(false);
              setUpgradeRequired(false);
              load(true);
            }}
          />
        )}
      </div>
    </>
  );
}

function Reading({ data, onRegenerate }) {
  const { chart, prediction } = data;
  const factors = [
    ["Venus", chart.planets.venus],
    ["Mars", chart.planets.mars],
    ["Moon", chart.planets.moon],
  ];

  return (
    <div className="mx-auto grid max-w-[900px] gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {factors.map(([name, planet]) => (
          <div key={name} className="glass rounded-2xl p-5 text-center">
            <div className="text-[12px] uppercase tracking-wide text-ink-dim">{name}</div>
            <div className="font-display text-xl font-bold">{planet.sign}</div>
            <div className="text-[13px] text-ink-dim">{planet.nakshatra}</div>
          </div>
        ))}
      </div>

      <div className="glass relative overflow-hidden rounded-[22px] p-7">
        <div className="nebula" style={{ opacity: 0.35 }} />
        <div className="relative">
          <div className="mb-2 flex items-center gap-2 text-sm text-gold-400">
            <AutoAwesomeIcon sx={{ fontSize: 18 }} /> Your relationship reading
          </div>
          <h2 className="m-0 font-display text-[24px] font-bold sm:text-[28px]">{prediction.headline}</h2>
          <p className="mb-0 mt-3 leading-7 text-ink-dim">{prediction.summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {READING_SECTIONS.map(([title, key]) => (
          <div key={key} className="glass card-hover rounded-[18px] p-6">
            <div className="mb-2 flex items-center gap-2">
              <FavoriteIcon className="text-gold-400" sx={{ fontSize: 21 }} />
              <h3 className="m-0 font-display text-lg">{title}</h3>
            </div>
            <p className="m-0 text-sm leading-7 text-ink-dim">{prediction[key]}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-[12px] text-ink-dim">{prediction.disclaimer}</span>
        <button onClick={onRegenerate} className="btn-gold inline-flex cursor-pointer items-center gap-1.5 rounded-full border-none px-5 py-2.5">
          <RefreshIcon sx={{ fontSize: 18 }} /> Regenerate
        </button>
      </div>
    </div>
  );
}

function Centered({ children }) {
  return <div className="container-x flex flex-col items-center justify-center gap-3 pt-[120px] pb-16">{children}</div>;
}

function Spinner() {
  return <div className="spin-slow h-10 w-10 rounded-full border-2 border-white/15 border-t-gold-500" />;
}
