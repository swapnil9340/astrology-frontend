"use client";

import { useState } from "react";
import { zodiacSigns } from "@/lib/data";

export default function Hero() {
  const [form, setForm] = useState({ name: "", date: "", time: "", place: "" });
  const [result, setResult] = useState(null);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.date) return;
    // Simple deterministic "moon sign" pick from the birth date — demo only.
    const day = new Date(form.date).getDate() || 1;
    const sign = zodiacSigns[(day - 1) % 12];
    setResult({ sign, name: form.name.trim() || "Friend" });
  }

  return (
    <section style={{ position: "relative", paddingTop: 70, paddingBottom: 40 }}>
      <div
        className="container-x"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* Left: headline */}
        <div className="fade-up hero-copy">
          <span
            className="glass"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              fontSize: 13,
              color: "var(--gold-400)",
              marginBottom: 22,
            }}
          >
            ✨ Trusted by 50 Lakh+ seekers
          </span>
          <h1
            className="font-display"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)", lineHeight: 1.1, fontWeight: 700, margin: 0 }}
          >
            Discover what the <span className="gold-text">stars</span> have written for you
          </h1>
          <p style={{ color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.7, marginTop: 20, maxWidth: 520 }}>
            Free Vedic Kundli, daily horoscope, marriage matching and honest remedies —
            all in one place. Generate your birth chart in seconds.
          </p>
          <div style={{ display: "flex", gap: 28, marginTop: 30, flexWrap: "wrap" }}>
            {[
              ["50L+", "Kundlis made"],
              ["1200+", "Astrologers"],
              ["4.9★", "App rating"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="gold-text font-display" style={{ fontSize: 26, fontWeight: 700 }}>{n}</div>
                <div style={{ color: "var(--ink-dim)", fontSize: 13 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Kundli form / result */}
        <div className="glass card-hover fade-up" style={{ borderRadius: 22, padding: 28, position: "relative", overflow: "hidden" }}>
          {/* rotating zodiac ring accent */}
          <div
            aria-hidden
            className="spin-slow"
            style={{
              position: "absolute",
              right: -60,
              top: -60,
              width: 180,
              height: 180,
              borderRadius: "50%",
              border: "1px dashed rgba(255,207,92,0.35)",
            }}
          />
          {!result ? (
            <>
              <h3 className="font-display" style={{ fontSize: 22, fontWeight: 600, marginTop: 0, marginBottom: 4 }}>
                Get your Free Kundli 🪔
              </h3>
              <p style={{ color: "var(--ink-dim)", fontSize: 14, marginTop: 0, marginBottom: 20 }}>
                Enter your birth details to begin.
              </p>
              <form onSubmit={onSubmit} style={{ display: "grid", gap: 14 }}>
                <Field label="Full name">
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" style={inputStyle} />
                </Field>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <Field label="Date of birth">
                    <input type="date" required value={form.date} onChange={(e) => update("date", e.target.value)} style={inputStyle} />
                  </Field>
                  <Field label="Time of birth">
                    <input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} style={inputStyle} />
                  </Field>
                </div>
                <Field label="Place of birth">
                  <input value={form.place} onChange={(e) => update("place", e.target.value)} placeholder="City, Country" style={inputStyle} />
                </Field>
                <button type="submit" className="btn-gold" style={{ padding: "13px", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 16, marginTop: 4 }}>
                  Generate My Kundli →
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: "center", paddingBlock: 10 }}>
              <div className="float-y" style={{ fontSize: 60 }}>{result.sign.symbol}</div>
              <h3 className="font-display" style={{ fontSize: 24, marginBottom: 4 }}>
                Namaste, {result.name}!
              </h3>
              <p style={{ color: "var(--ink-dim)", marginTop: 0 }}>Your moon sign is</p>
              <div className="gold-text font-display" style={{ fontSize: 34, fontWeight: 700 }}>
                {result.sign.name} <span style={{ fontSize: 20 }}>({result.sign.hindi})</span>
              </div>
              <div className="glass" style={{ borderRadius: 12, padding: "12px 16px", marginTop: 18, fontSize: 14, color: "var(--ink-dim)" }}>
                Element: {result.sign.element} • {result.sign.dates}
              </div>
              <button onClick={() => setResult(null)} className="btn-gold" style={{ padding: "11px 20px", borderRadius: 999, border: "none", cursor: "pointer", marginTop: 20 }}>
                ← Try another
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-copy { text-align: center; }
          section > .container-x { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "grid", gap: 6, textAlign: "left" }}>
      <span style={{ fontSize: 13, color: "var(--ink-dim)" }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle = {
  width: "100%",
  padding: "11px 12px",
  borderRadius: 10,
  border: "1px solid var(--line)",
  background: "rgba(7,11,30,0.5)",
  color: "var(--ink)",
  fontSize: 15,
  outline: "none",
  colorScheme: "dark",
};
