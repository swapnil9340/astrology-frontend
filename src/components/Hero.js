"use client";

import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { zodiacSigns } from "@/lib/data";

const inputClass =
  "w-full px-3 py-[11px] rounded-[10px] border border-white/10 bg-[rgba(7,11,30,0.5)] text-ink text-[15px] outline-none [color-scheme:dark] focus:border-gold-500/60 transition-colors";

export default function Hero() {
  const [form, setForm] = useState({ name: "", date: "", time: "", place: "" });
  const [result, setResult] = useState(null);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.date) return;
    const day = new Date(form.date).getDate() || 1;
    const sign = zodiacSigns[(day - 1) % 12];
    setResult({ sign, name: form.name.trim() || "Friend" });
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
                <button type="submit" className="btn-gold inline-flex items-center justify-center gap-1.5 py-[13px] rounded-xl border-none cursor-pointer text-base mt-1">
                  Generate My Kundli <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-2.5">
              <div className="float-y text-6xl">{result.sign.symbol}</div>
              <h3 className="font-display text-2xl mb-1">Namaste, {result.name}!</h3>
              <p className="text-ink-dim mt-0">Your moon sign is</p>
              <div className="gold-text font-display text-[34px] font-bold">
                {result.sign.name} <span className="text-xl">({result.sign.hindi})</span>
              </div>
              <div className="glass rounded-xl px-4 py-3 mt-4 text-sm text-ink-dim">
                Element: {result.sign.element} • {result.sign.dates}
              </div>
              <button onClick={() => setResult(null)} className="btn-gold inline-flex items-center gap-1.5 px-5 py-[11px] rounded-full border-none cursor-pointer mt-5">
                <ArrowBackIcon sx={{ fontSize: 18 }} /> Try another
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
