import SectionHeading from "./SectionHeading";

// Server component — computes the display date once on the server.
export default function Panchang() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const items = [
    ["Tithi", "Shukla Panchami"],
    ["Nakshatra", "Rohini"],
    ["Yoga", "Siddha"],
    ["Karana", "Bava"],
    ["Sunrise", "05:52 AM"],
    ["Sunset", "07:14 PM"],
    ["Rahu Kaal", "12:18 – 01:58"],
    ["Abhijit Muhurat", "11:58 – 12:52"],
  ];

  return (
    <section id="panchang" style={{ paddingBlock: 60 }}>
      <div className="container-x">
        <div
          className="glass"
          style={{
            borderRadius: 24,
            padding: "38px 30px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* rotating mandala accent */}
          <div
            aria-hidden
            className="spin-reverse"
            style={{
              position: "absolute",
              left: -80,
              bottom: -80,
              width: 220,
              height: 220,
              borderRadius: "50%",
              border: "1px dashed rgba(244,63,94,0.28)",
            }}
          />
          <SectionHeading
            center={false}
            eyebrow="Aaj ka Panchang"
            title="Today's Panchang"
            subtitle={dateStr}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 14,
            }}
          >
            {items.map(([k, v]) => (
              <div
                key={k}
                style={{
                  borderRadius: 14,
                  padding: "16px 18px",
                  background: "rgba(7,11,30,0.5)",
                  border: "1px solid var(--line)",
                }}
              >
                <div style={{ color: "var(--ink-dim)", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>{k}</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
