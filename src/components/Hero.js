"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { zodiacSigns } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { apiChart } from "@/lib/api";

const signSymbol = (name) => zodiacSigns.find((z) => z.name === name)?.symbol || "✨";

const inputClass =
  "w-full px-3 py-[11px] rounded-[10px] border border-white/10 bg-[rgba(7,11,30,0.5)] text-ink text-[15px] outline-none [color-scheme:dark] focus:border-gold-500/60 transition-colors";

export default function Hero() {
  const router = useRouter();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", date: "", time: "", place: "" });
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.date) return;
    setError("");
    setBusy(true);
    try {
      // real-time compute-only chart (no login, no AI cost)
      const res = await apiChart({
        dateOfBirth: form.date,
        timeOfBirth: form.time,
        placeOfBirth: form.place,
      });
      setResult({ chart: res.chart, place: res.place, name: form.name.trim() || "Friend" });
    } catch (err) {
      setError(err.message || "Kundli generate nahi ho payi. Thodi der baad try karein.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="relative pt-[70px] pb-10">
      <div className="container-x grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        {/* Left: headline */}
        <div className="fade-up text-center lg:text-left">
          <span className="glass inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] text-gold-400 mb-5">
            <AutoAwesomeIcon sx={{ fontSize: 15 }} /> Trusted by 50 Lakh+ seekers
          </span>
          <h1 className="font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.1] font-bold m-0">
            Discover what the <span className="gold-text">stars</span> have written for you
          </h1>
          <p className="text-ink-dim text-[17px] sm:text-lg leading-[1.7] mt-5 max-w-[520px] mx-auto lg:mx-0">
            Free Vedic Kundli, daily horoscope, marriage matching and honest remedies —
            all in one place. Generate your birth chart in seconds.
          </p>
          <div className="flex gap-7 mt-7 flex-wrap justify-center lg:justify-start">
            {[
              ["50L+", "Kundlis made"],
              ["1200+", "Astrologers"],
              ["4.9★", "App rating"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="gold-text font-display text-[26px] font-bold">{n}</div>
                <div className="text-ink-dim text-[13px]">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Kundli form / result */}
        <div className="glass card-hover fade-up rounded-[22px] p-5 sm:p-7 relative overflow-hidden">
          <div className="spin-slow absolute -right-[60px] -top-[60px] w-[180px] h-[180px] rounded-full border border-dashed border-gold-400/35" aria-hidden />
          {!result ? (
            <>
              <h3 className="font-display text-[22px] font-semibold mt-0 mb-1">Get your Free Kundli 🪔</h3>
              <p className="text-ink-dim text-sm mt-0 mb-5">Enter your birth details to begin.</p>
              <form onSubmit={onSubmit} className="grid gap-3.5">
                <label className="grid gap-1.5 text-left">
                  <span className="text-[13px] text-ink-dim">Full name</span>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" className={inputClass} />
                </label>
                <div className="grid grid-cols-2 gap-3.5">
                  <label className="grid gap-1.5 text-left">
                    <span className="text-[13px] text-ink-dim">Date of birth</span>
                    <input type="date" required value={form.date} onChange={(e) => update("date", e.target.value)} className={inputClass} />
                  </label>
                  <label className="grid gap-1.5 text-left">
                    <span className="text-[13px] text-ink-dim">Time of birth</span>
                    <input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} className={inputClass} />
                  </label>
                </div>
                <label className="grid gap-1.5 text-left">
                  <span className="text-[13px] text-ink-dim">Place of birth</span>
                  <input value={form.place} onChange={(e) => update("place", e.target.value)} placeholder="City, Country" className={inputClass} />
                </label>
                {error && <p className="text-rose-500 text-[13px] m-0">{error}</p>}
                <button type="submit" disabled={busy}
                  className="btn-gold inline-flex items-center justify-center gap-1.5 py-[13px] rounded-xl border-none cursor-pointer text-base mt-1 disabled:opacity-60 disabled:cursor-not-allowed">
                  {busy ? "Reading the stars…" : (<>Generate My Kundli <ArrowForwardIcon sx={{ fontSize: 18 }} /></>)}
                </button>
                <p className="text-ink-dim text-[11px] text-center m-0">Tip: place of birth se accurate kundli banti hai.</p>
              </form>
            </>
          ) : (
            <div className="text-center py-2.5">
              <div className="float-y text-6xl">{signSymbol(result.chart.moonSign.sign)}</div>
              <h3 className="font-display text-2xl mb-1">Namaste, {result.name}!</h3>
              <p className="text-ink-dim mt-0">Your Moon sign (Rashi) is</p>
              <div className="gold-text font-display text-[34px] font-bold">
                {result.chart.moonSign.sign} <span className="text-xl">({result.chart.moonSign.hi})</span>
              </div>
              <div className="glass rounded-xl px-4 py-3 mt-4 text-sm text-ink-dim">
                Nakshatra: <span className="text-ink">{result.chart.moonSign.nakshatra}</span> • Sun: <span className="text-ink">{result.chart.sunSign.sign}</span>
                {result.chart.lagna && <> • Lagna: <span className="text-ink">{result.chart.lagna.sign}</span></>}
              </div>
              {result.place && <p className="text-ink-dim text-[12px] mt-2 mb-0">📍 {result.place}</p>}
              <p className="text-ink-dim text-[12px] mt-3 mb-0">Ye real chart preview hai — poori AI kundli login ke baad.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                <button onClick={() => router.push(user ? "/kundli" : "/register")}
                  className="btn-gold inline-flex items-center gap-1.5 px-5 py-[11px] rounded-full border-none cursor-pointer">
                  <AutoAwesomeIcon sx={{ fontSize: 18 }} /> Get your full AI Kundli
                </button>
                <button onClick={() => setResult(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-[11px] rounded-full border border-white/15 text-ink hover:border-gold-500/50 cursor-pointer">
                  <ArrowBackIcon sx={{ fontSize: 18 }} /> Try another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
