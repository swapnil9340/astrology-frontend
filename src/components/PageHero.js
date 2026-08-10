// Compact hero band for inner pages.
export default function PageHero({ emoji, title, subtitle, breadcrumb }) {
  return (
    <section style={{ position: "relative", paddingTop: 70, paddingBottom: 20 }}>
      <div className="container-x" style={{ textAlign: "center", maxWidth: 760 }}>
        {breadcrumb && (
          <div style={{ color: "var(--ink-dim)", fontSize: 13, marginBottom: 14 }}>{breadcrumb}</div>
        )}
        {emoji && <div className="float-y" style={{ fontSize: 52, marginBottom: 8 }}>{emoji}</div>}
        <h1
          className="font-display fade-up"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", fontWeight: 700, margin: 0, lineHeight: 1.15 }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.7, marginTop: 16 }}>{subtitle}</p>
        )}
      </div>
    </section>
  );
}
