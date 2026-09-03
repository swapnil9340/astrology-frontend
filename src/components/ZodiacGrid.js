"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import { zodiacSigns, horoscopeFor } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { apiRashifal } from "@/lib/api";
import { useLang } from "@/context/LanguageContext";

export default function ZodiacGrid() {
  const { t } = useLang();
  const [active, setActive] = useState(zodiacSigns[0]);
  const [ai, setAi] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const cache = useRef({});

  // Free, no login — fetch today's AI rashifal for the selected sign.
  useEffect(() => {
    const slug = active.name.toLowerCase();
    if (cache.current[slug]) { setAi(cache.current[slug]); return; }
    setAi(null);
    let live = true;
    apiRashifal(slug)
      .then((res) => { if (!live) return; cache.current[slug] = res.rashifal; setAi(res.rashifal); })
      .catch(() => {});
    return () => { live = false; };
  }, [active]);

  // Lock body scroll while the mobile modal is open.
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const fb = horoscopeFor(active.name);
  const reading = {
    text: ai?.overall || fb.text,
    love: ai?.ratings?.love ?? fb.love,
    career: ai?.ratings?.career ?? fb.career,
    health: ai?.ratings?.health ?? fb.health,
  };

  function onSign(z) {
    setActive(z);
    // On mobile, open the reading in a modal instead of the side panel.
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 820px)").matches) {
      setModalOpen(true);
    }
  }

  const readingBody = (
    <>
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18 }}>
        <span style={{ color: "var(--ink-dim)", fontSize: 11 }}>{ai ? "✨ AI • aaj ka" : "loading…"}</span>
        <Link href={`/horoscope/${active.name.toLowerCase()}`} className="gold-text" style={{ fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
          Full rashifal →
        </Link>
      </div>
    </>
  );

  return (
    <section id="horoscope" style={{ paddingBlock: 60 }}>
      <div className="container-x">
        <SectionHeading
          eyebrow={t("horo.eyebrow")}
          title={t("horo.title")}
          subtitle={t("horo.subtitle")}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 28, alignItems: "start" }} className="zodiac-wrap">
          {/* Sign grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))", gap: 12 }}>
            {zodiacSigns.map((z) => {
              const selected = z.name === active.name;
              return (
                <button
                  key={z.name}
                  onClick={() => onSign(z)}
                  className="glass"
                  style={{
                    borderRadius: 14, padding: "16px 8px", cursor: "pointer", textAlign: "center",
                    border: selected ? "1px solid var(--gold-500)" : "1px solid var(--line)",
                    background: selected ? "rgba(225,29,72,0.15)" : undefined,
                    transition: "transform 0.2s, border-color 0.2s, background 0.2s", color: "inherit",
                  }}
                >
                  <div style={{ fontSize: 26, color: selected ? "var(--gold-400)" : "var(--ink)" }}>{z.symbol}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>{z.name}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-dim)" }}>{z.hindi}</div>
                </button>
              );
            })}
          </div>

          {/* Desktop reading panel (hidden on mobile → modal instead) */}
          <div className="glass reading-panel" style={{ borderRadius: 20, padding: 26, position: "sticky", top: 88 }}>
            {readingBody}
          </div>
        </div>
      </div>

      {/* Mobile modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 60, display: "grid", placeItems: "end center",
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)", padding: 0,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass"
            style={{
              width: "100%", maxWidth: 520, borderRadius: "20px 20px 0 0",
              padding: 24, position: "relative", maxHeight: "85vh", overflowY: "auto",
              animation: "fade-up 0.3s both",
            }}
          >
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              style={{
                position: "absolute", right: 14, top: 14, width: 36, height: 36, borderRadius: 10,
                display: "grid", placeItems: "center", background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--line)", color: "var(--ink)", cursor: "pointer",
              }}
            >
              <CloseIcon />
            </button>
            {readingBody}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 820px){
          .zodiac-wrap{ grid-template-columns:1fr !important; }
          .reading-panel{ display:none !important; }
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
        <div style={{ width: `${value}%`, height: "100%", borderRadius: 999, background: "linear-gradient(90deg, var(--gold-500), var(--gold-400))", transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>
    </div>
  );
}
