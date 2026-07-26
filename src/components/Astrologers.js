import { astrologers } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Astrologers() {
  // duplicate list so the marquee can loop seamlessly
  const loop = [...astrologers, ...astrologers];

  return (
    <section id="astrologers" style={{ paddingBlock: 60 }}>
      <div className="container-x">
        <SectionHeading
          eyebrow="Live now"
          title="Talk to expert astrologers"
          subtitle="Real, verified astrologers ready to guide you over chat or call — anytime."
        />
      </div>

      {/* full-bleed marquee */}
      <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)" }}>
        <div className="marquee-track" style={{ display: "flex", gap: 18, width: "max-content", paddingInline: 18 }}>
          {loop.map((a, i) => (
            <article
              key={i}
              className="glass card-hover"
              style={{ width: 260, flex: "0 0 auto", borderRadius: 18, padding: 22 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 24,
                    background: "radial-gradient(circle at 35% 30%, #2a3577, #131a45)",
                    border: "1px solid var(--line)",
                    position: "relative",
                  }}
                >
                  🧑‍🚀
                  <span
                    title={a.online ? "Online" : "Offline"}
                    style={{
                      position: "absolute",
                      right: 2,
                      bottom: 2,
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      background: a.online ? "#2ecc71" : "#7a7a7a",
                      border: "2px solid var(--night-800)",
                    }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, margin: 0 }}>{a.name}</h3>
                  <div style={{ color: "var(--ink-dim)", fontSize: 13 }}>{a.skill}</div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, fontSize: 13, color: "var(--ink-dim)" }}>
                <span>⭐ {a.rating}</span>
                <span>{a.exp} exp</span>
              </div>
              <div style={{ color: "var(--ink-dim)", fontSize: 12, marginTop: 6 }}>{a.lang}</div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
                <span className="gold-text font-display" style={{ fontSize: 18, fontWeight: 700 }}>${a.rate}/min</span>
                <button
                  className="btn-gold"
                  style={{ padding: "8px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 13 }}
                >
                  {a.online ? "Chat now" : "Notify me"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
