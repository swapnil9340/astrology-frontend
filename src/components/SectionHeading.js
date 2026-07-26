export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", maxWidth: 640, margin: center ? "0 auto 40px" : "0 0 40px" }}>
      {eyebrow && (
        <span
          style={{
            display: "inline-block",
            color: "var(--gold-400)",
            fontSize: 13,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, margin: 0, lineHeight: 1.15 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: "var(--ink-dim)", fontSize: 16, marginTop: 12, lineHeight: 1.6 }}>{subtitle}</p>
      )}
    </div>
  );
}
