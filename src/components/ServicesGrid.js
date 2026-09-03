"use client";

import Link from "next/link";
import { services } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { useLang } from "@/context/LanguageContext";

const accentGlow = {
  gold: "rgba(225,29,72,0.22)",
  rose: "rgba(244,63,94,0.22)",
  violet: "rgba(147,51,234,0.20)",
};

export default function ServicesGrid() {
  const { t } = useLang();
  return (
    <section id="services" style={{ paddingBlock: 60 }}>
      <div className="container-x">
        <SectionHeading
          eyebrow={t("svc.eyebrow")}
          title={t("svc.title")}
          subtitle={t("svc.subtitle")}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="glass card-hover"
              style={{
                borderRadius: 18,
                padding: 24,
                textDecoration: "none",
                color: "inherit",
                position: "relative",
                overflow: "hidden",
                display: "block",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -30,
                  right: -30,
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  background: accentGlow[s.accent],
                  filter: "blur(20px)",
                }}
              />
              <div style={{ fontSize: 34, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px" }}>{t(`svc.${s.href}.t`)}</h3>
              <p style={{ color: "var(--ink-dim)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{t(`svc.${s.href}.d`)}</p>
              <span style={{ display: "inline-block", marginTop: 16, color: "var(--gold-400)", fontSize: 14, fontWeight: 500 }}>
                {t("svc.explore")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
