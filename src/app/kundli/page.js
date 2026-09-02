"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import CasinoIcon from "@mui/icons-material/Casino";
import PaletteIcon from "@mui/icons-material/Palette";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import RefreshIcon from "@mui/icons-material/Refresh";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import LightModeIcon from "@mui/icons-material/LightMode";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PageHero from "@/components/PageHero";
import { useAuth } from "@/context/AuthContext";
import { apiPredictBasic, apiPredictHistory } from "@/lib/api";
import { startPayment } from "@/lib/payment";

export default function KundliPage() {
  const { user, token, loading, refreshUser } = useAuth();
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [paywall, setPaywall] = useState(false);
  const [buying, setBuying] = useState(false);

  // Cost-aware: show the latest saved reading if one exists; only call the AI
  // when there is none, or when the user hits "Regenerate".
  const load = useCallback(async (force = false) => {
    if (!token) return;
    setStatus("loading");
    setError("");
    setPaywall(false);
    try {
      if (!force) {
        const hist = await apiPredictHistory(token);
        if (hist.predictions?.length) {
          const p = hist.predictions[0];
          setData({ chart: p.chart, prediction: p.prediction });
          setStatus("done");
          return;
        }
      }
      const res = await apiPredictBasic(token);
      setData({ chart: res.chart, prediction: res.prediction });
      setStatus("done");
    } catch (err) {
      if (err.status === 402) setPaywall(true);
      setError(err.message || "Something went wrong.");
      setStatus("error");
    }
  }, [token]);

  useEffect(() => {
    if (!loading && user && token && status === "idle") load(false);
  }, [loading, user, token, status, load]);

  async function buyPack() {
    setBuying(true);
    try {
      await startPayment({ kind: "pack", itemId: "pack10", token, user });
      await refreshUser();
      await load(true); // credits added → generate now
    } catch (e) {
      setError(e.message || "Payment fail hua.");
    } finally {
      setBuying(false);
    }
  }

  // --- hydrating ---
  if (loading) {
    return <Centered><Spinner /> <span className="text-ink-dim">Loading…</span></Centered>;
  }

  // --- not logged in: gate ---
  if (!user) {
    return (
      <div className="container-x flex justify-center pt-[70px] pb-16">
        <div className="glass rounded-[22px] p-9 max-w-[440px] text-center">
          <div className="glow-pulse mx-auto grid place-items-center w-14 h-14 rounded-full text-2xl bg-[radial-gradient(circle_at_35%_30%,#ff9aa5,#e11d48_60%,#a80f2f)]">
            <LockOutlinedIcon />
          </div>
          <h1 className="font-display text-[26px] font-bold mt-4 mb-2">Your Free Kundli awaits</h1>
          <p className="text-ink-dim text-sm mb-6">
            Apni janm details ke saath sign up karo aur turant apni personalised Vedic kundli + prediction pao — bilkul free.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/register" className="btn-gold px-4 py-3 rounded-full no-underline text-center">Create account</Link>
            <Link href="/login" className="px-4 py-3 rounded-full no-underline text-center border border-white/15 text-ink hover:border-gold-500/50">Sign in</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        emoji="🔯"
        breadcrumb={<><Link href="/" className="text-gold-400 no-underline hover:underline">Home</Link> / Free Kundli</>}
        title={`${user.name?.split(" ")[0]}'s Free Kundli`}
        subtitle="Aapke janm chart par based personalised Vedic reading."
      />

      <div className="container-x pb-6">
        {status === "loading" && (
          <div className="glass rounded-[22px] p-10 text-center">
            <div className="spin-slow mx-auto w-20 h-20 rounded-full border border-dashed border-gold-400/40 grid place-items-center text-3xl">🌌</div>
            <p className="mt-5 text-ink font-display text-xl">Aapki kundli likhi ja rahi hai…</p>
            <p className="text-ink-dim text-sm mt-1">Grah-nakshatra padh ke sitare aapka bhavishya bata rahe hain.</p>
          </div>
        )}

        {status === "error" && paywall && (
          <div className="glass rounded-[22px] p-8 text-center max-w-[520px] mx-auto border border-gold-500/40">
            <div className="glow-pulse mx-auto grid place-items-center w-14 h-14 rounded-full text-2xl bg-[radial-gradient(circle_at_35%_30%,#ff9aa5,#e11d48_60%,#a80f2f)]">🪔</div>
            <h2 className="font-display text-[24px] font-bold mt-4 mb-1">Aapki free kundli poori ho gayi</h2>
            <p className="text-ink-dim text-sm">{error}</p>
            <div className="glass rounded-xl px-4 py-3 my-4 text-sm">
              <span className="gold-text font-display text-lg font-bold">₹100 = 10 Kundli</span>
              <div className="text-ink-dim">+ send & print/PDF option</div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button onClick={buyPack} disabled={buying}
                className="btn-gold px-6 py-3 rounded-full border-none cursor-pointer disabled:opacity-70">
                {buying ? "Processing…" : "Buy pack — ₹100"}
              </button>
              <Link href="/pricing" className="px-5 py-3 rounded-full border border-white/15 text-ink no-underline hover:border-gold-500/50">
                See plans
              </Link>
            </div>
            <p className="text-ink-dim text-[12px] mt-3 mb-0">Secure payment via Razorpay.</p>
          </div>
        )}

        {status === "error" && !paywall && (
          <div className="glass rounded-[22px] p-8 text-center max-w-[520px] mx-auto border border-rose-500/30">
            <p className="text-ink">{error}</p>
            <button onClick={() => load(false)} className="btn-gold inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-none cursor-pointer mt-4">
              <RefreshIcon sx={{ fontSize: 18 }} /> Try again
            </button>
          </div>
        )}

        {status === "done" && data && <Reading data={data} onRegenerate={() => load(true)} />}
      </div>
    </>
  );
}

function Reading({ data, onRegenerate }) {
  const { chart, prediction: p } = data;
  return (
    <div className="grid gap-5 max-w-[900px] mx-auto">
      {/* chart summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryTile icon={StarBorderIcon} label="Lagna (Ascendant)" value={chart.lagna ? chart.lagna.sign : "—"} sub={chart.lagna ? `${chart.lagna.degInSign}°` : "birth time needed"} />
        <SummaryTile icon={NightlightRoundIcon} label="Moon (Rashi)" value={chart.moonSign.sign} sub={chart.moonSign.nakshatra} />
        <SummaryTile icon={LightModeIcon} label="Sun" value={chart.sunSign.sign} sub="" />
      </div>

      {/* headline + summary */}
      <div className="glass rounded-[22px] p-7 relative overflow-hidden">
        <div className="nebula" style={{ opacity: 0.35 }} />
        <div className="relative">
          <div className="flex items-center gap-2 text-gold-400 text-sm mb-2"><AutoAwesomeIcon sx={{ fontSize: 18 }} /> Your reading</div>
          <h2 className="font-display text-[24px] sm:text-[28px] font-bold m-0">{p.headline}</h2>
          <p className="text-ink-dim leading-7 mt-3 mb-0">{p.summary}</p>
        </div>
      </div>

      {/* life areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AreaCard icon={PersonIcon} title="Personality" text={p.personality} />
        <AreaCard icon={FavoriteIcon} title="Love" text={p.love} />
        <AreaCard icon={BusinessCenterIcon} title="Career" text={p.career} />
        <AreaCard icon={MonitorHeartIcon} title="Health" text={p.health} />
      </div>

      {/* lucky + remedy */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <LuckyTile icon={CasinoIcon} label="Lucky number" value={p.luckyNumber} />
        <LuckyTile icon={PaletteIcon} label="Lucky colour" value={p.luckyColor} />
        <LuckyTile icon={CalendarTodayIcon} label="Lucky day" value={p.luckyDay} />
      </div>

      <div className="glass rounded-[18px] p-6 flex gap-4 items-start">
        <div className="w-11 h-11 shrink-0 rounded-xl grid place-items-center bg-gold-500/15 text-gold-400"><SelfImprovementIcon /></div>
        <div>
          <h3 className="font-display text-lg m-0 mb-1">Remedy (Upay)</h3>
          <p className="text-ink-dim text-sm leading-7 m-0">{p.remedy}</p>
        </div>
      </div>

      {/* planets */}
      <details className="glass rounded-[18px] p-6">
        <summary className="cursor-pointer text-ink font-display text-lg">Full planetary positions</summary>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {Object.values(chart.planets).map((pl) => (
            <div key={pl.name} className="rounded-xl px-3 py-2.5 bg-[rgba(7,11,30,0.4)] border border-white/10">
              <div className="text-ink text-sm font-semibold">{pl.name} <span className="text-ink-dim font-normal">{pl.hi}</span></div>
              <div className="text-gold-400 text-[13px]">{pl.sign} {pl.degInSign}°</div>
              <div className="text-ink-dim text-[12px]">{pl.nakshatra} · pada {pl.pada}</div>
            </div>
          ))}
        </div>
      </details>

      {/* footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <span className="text-ink-dim text-[12px]">{p.disclaimer}</span>
        <button onClick={onRegenerate} className="btn-gold inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-none cursor-pointer">
          <RefreshIcon sx={{ fontSize: 18 }} /> Regenerate
        </button>
      </div>
    </div>
  );
}

function SummaryTile({ icon: Icon, label, value, sub }) {
  return (
    <div className="glass card-hover rounded-2xl p-5 text-center">
      <Icon className="text-gold-400" sx={{ fontSize: 28 }} />
      <div className="text-ink-dim text-[12px] uppercase tracking-wide mt-2">{label}</div>
      <div className="font-display text-xl font-bold">{value}</div>
      {sub && <div className="text-ink-dim text-[13px]">{sub}</div>}
    </div>
  );
}

function AreaCard({ icon: Icon, title, text }) {
  return (
    <div className="glass card-hover rounded-[18px] p-6">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="text-gold-400" sx={{ fontSize: 22 }} />
        <h3 className="font-display text-lg m-0">{title}</h3>
      </div>
      <p className="text-ink-dim text-sm leading-7 m-0">{text}</p>
    </div>
  );
}

function LuckyTile({ icon: Icon, label, value }) {
  return (
    <div className="glass rounded-2xl p-5 text-center">
      <Icon className="text-gold-400" sx={{ fontSize: 24 }} />
      <div className="text-ink-dim text-[12px] mt-2">{label}</div>
      <div className="font-display text-xl font-bold gold-text">{value}</div>
    </div>
  );
}

function Centered({ children }) {
  return <div className="container-x flex flex-col items-center justify-center gap-3 pt-[120px] pb-16">{children}</div>;
}
function Spinner() {
  return <div className="spin-slow w-10 h-10 rounded-full border-2 border-white/15 border-t-gold-500" />;
}
