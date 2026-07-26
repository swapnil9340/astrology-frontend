import Link from "next/link";

const cols = [
  {
    title: "Astrology",
    links: [
      ["Free Kundli", "/kundli"],
      ["Kundli Matching", "/kundli-matching"],
      ["Daily Horoscope", "/horoscope"],
      ["Panchang", "/panchang"],
    ],
  },
  {
    title: "Occult",
    links: [
      ["Tarot Reading", "/tarot"],
      ["Numerology", "/numerology"],
      ["Lal Kitab", "/lal-kitab"],
      ["Palmistry", "/palmistry"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Talk to Astrologer", "/#astrologers"],
      ["Careers", "/careers"],
      ["Contact", "/contact"],
    ],
  },
];

export default function Footer() {
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
              Your trusted companion for Vedic astrology, kundli, horoscopes and
              genuine remedies — guided by the stars, grounded in tradition.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 18, fontSize: 20 }}>
              <span>📘</span><span>📸</span><span>▶️</span><span>🐦</span>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="gold-text" style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, letterSpacing: 0.5 }}>
                {c.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                {c.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      style={{ color: "var(--ink-dim)", textDecoration: "none", fontSize: 14 }}
                      className="foot-link"
                    >
                      {label}
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
          <span>© {new Date().getFullYear()} AstroVeda. All rights reserved.</span>
          <span>Made with ✨ &nbsp;•&nbsp; Privacy · Terms</span>
        </div>
      </div>
      <style>{`.foot-link:hover{color:var(--gold-400)!important;}`}</style>
    </footer>
  );
}
