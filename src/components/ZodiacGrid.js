"use client";

import { useState } from "react";
import { zodiacSigns, horoscopeFor } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function ZodiacGrid() {
  const [active, setActive] = useState(zodiacSigns[0]);
  const reading = horoscopeFor(active.name);

  return (
    <section id="horoscope" style={{ paddingBlock: 60 }}>
      <div className="container-x">
        <SectionHeading
          eyebrow="Today's Rashifal"
          title="Your daily horoscope"
          subtitle="Tap your zodiac sign to reveal what today holds for love, career and health."
        />

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 28, alignItems: "start" }} className="zodiac-wrap">
          {/* Sign grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
              gap: 12,
            }}
          >
            {zodiacSigns.map((z) => {
              const selected = z.name === active.name;
              return (
                <button
                  key={z.name}
                  onClick={() => setActive(z)}
                  className="glass"
                  style={{
                    borderRadius: 14,
                    padding: "16px 8px",
                    cursor: "pointer",
                    textAlign: "center",
                    border: selected ? "1px solid var(--gold-500)" : "1px solid var(--line)",
                    background: selected ? "rgba(245,166,35,0.12)" : undefined,
                    transition: "transform 0.2s, border-color 0.2s, background 0.2s",
                    color: "inherit",
                  }}
                >
                  <div style={{ fontSize: 26, color: selected ? "var(--gold-400)" : "var(--ink)" }}>{z.symbol}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>{z.name}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-dim)" }}>{z.hindi}</div>
                </button>
              );
            })}
          </div>

          {/* Reading panel */}
          <div className="glass" style={{ borderRadius: 20, padding: 26, position: "sticky", top: 88 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <span className="float-y" style={{ fontSize: 44, color: "var(--gold-400)" }}>{active.symbol}</span>
              <div>
                <h3 className="font-display" style={{ fontSize: 24, margin: 0 }}>{active.name}</h3>
                <span style={{ color: "var(--ink-dim)", fontSize: 13 }}>{active.dates} • {active.element}</span>
              </div>
            </div>
            <p style={{ color: "var(--ink)", fontSize: 15, lineHeight: 1.7, marginTop: 0 }}>“{reading.text}”</p>
            <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
              <Bar label="❤️ Love" value={reading.love} />
              <Bar label="💼 Career" value={reading.career} />
              <Bar label="🌿 Health" value={reading.health} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px){
          .zodiac-wrap{ grid-template-columns:1fr !important; }
          .zodiac-wrap > div:last-child{ position: static !important; }
        }
      `}</style>
    </section>
  );
}

function Bar({ label, value }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
        <span>{label}</span>
        <span style={{ color: "var(--gold-400)" }}>{value}%</span>
      </div>
      <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, var(--gold-500), var(--gold-400))",
            transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
    </div>
  );
}
