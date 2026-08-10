export default function CtaBanner() {
  return (
    <section style={{ paddingBlock: 40 }}>
      <div className="container-x">
        <div
          style={{
            borderRadius: 26,
            padding: "48px 34px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(225,29,72,0.4)",
            background:
              "radial-gradient(120% 140% at 50% 0%, rgba(225,29,72,0.38), rgba(31,9,22,0.65) 55%)",
          }}
        >
          <div className="nebula" style={{ opacity: 0.5 }} />
          <div style={{ position: "relative" }}>
            <div className="float-y" style={{ fontSize: 46 }}>🌙</div>
            <h2 className="font-display" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, margin: "10px 0 12px" }}>
              Carry the cosmos in your pocket
            </h2>
            <p style={{ color: "var(--ink-dim)", fontSize: 17, maxWidth: 540, margin: "0 auto 26px", lineHeight: 1.6 }}>
              Download the AstroVeda app for daily predictions, instant kundli and
              1-tap chat with astrologers — free forever.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-gold" style={{ padding: "13px 26px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 15 }}>
                 App Store
              </button>
              <button
                style={{
                  padding: "13px 26px",
                  borderRadius: 999,
                  border: "1px solid var(--line)",
                  cursor: "pointer",
                  fontSize: 15,
                  background: "rgba(255,255,255,0.06)",
                  color: "var(--ink)",
                }}
              >
                ▶ Google Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
