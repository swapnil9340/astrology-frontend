"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

const cols = [
  {
    titleKey: "foot.col.astrology",
    links: [
      ["svc./kundli.t", "/kundli"],
      ["svc./kundli-matching.t", "/kundli-matching"],
      ["svc./horoscope.t", "/horoscope"],
      ["svc./panchang.t", "/panchang"],
    ],
  },
  {
    titleKey: "foot.col.occult",
    links: [
      ["svc./tarot.t", "/tarot"],
      ["svc./numerology.t", "/numerology"],
      ["svc./lal-kitab.t", "/lal-kitab"],
      ["foot.palmistry", "/palmistry"],
    ],
  },
  {
    titleKey: "foot.col.company",
    links: [
      ["foot.about", "/about"],
      ["foot.contact", "/contact"],
      ["foot.disclaimer", "/disclaimer"],
      ["nav.talk", "/#astrologers"],
    ],
  },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer style={{ marginTop: 80, borderTop: "1px solid var(--line)", background: "rgba(7,11,30,0.6)" }}>
      <div className="container-x" style={{ paddingBlock: 56 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 40,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 26 }}>🔯</span>
              <span className="font-display" style={{ fontSize: 24, fontWeight: 700 }}>
                Astro<span className="gold-text">Veda</span>
              </span>
            </div>
            <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>
              {t("foot.tagline")}
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 18, fontSize: 20 }}>
              <span>📘</span><span>📸</span><span>▶️</span><span>🐦</span>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.titleKey}>
              <h4 className="gold-text" style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, letterSpacing: 0.5 }}>
                {t(c.titleKey)}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                {c.links.map(([labelKey, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      style={{ color: "var(--ink-dim)", textDecoration: "none", fontSize: 14 }}
                      className="foot-link"
                    >
                      {t(labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 44,
            paddingTop: 22,
            borderTop: "1px solid var(--line)",
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
            color: "var(--ink-dim)",
            fontSize: 13,
          }}
        >
          <span>© {new Date().getFullYear()} AstroVeda. {t("foot.rights")}</span>
          <span>Made with ✨ &nbsp;•&nbsp; Privacy · Terms</span>
        </div>
      </div>
      <style>{`.foot-link:hover{color:var(--gold-400)!important;}`}</style>
    </footer>
  );
}
