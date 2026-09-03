"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import { apiPanchang } from "@/lib/api";
import { useLang } from "@/context/LanguageContext";

const LABELS = [
  ["Tithi", "tithi"],
  ["Nakshatra", "nakshatra"],
  ["Yoga", "yoga"],
  ["Karana", "karana"],
  ["Vaara", "vaara"],
  ["Sunrise", "sunrise"],
  ["Sunset", "sunset"],
  ["Rahu Kaal", "rahuKaal"],
  ["Abhijit Muhurat", "abhijitMuhurat"],
];

export default function Panchang() {
  const { t } = useLang();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    apiPanchang() // defaults to New Delhi, today (real-time compute)
      .then((res) => active && setData(res.panchang))
      .catch(() => active && setError(true));
    return () => { active = false; };
  }, []);

  const subtitle = data
    ? `${data.date} · ${data.location}`
    : error
    ? "Live panchang abhi uplabdh nahi — backend chalu karein."
    : "Loading today's panchang…";

  return (
    <section id="panchang" className="py-[60px]">
      <div className="container-x">
        <div className="glass rounded-3xl px-[30px] py-[38px] relative overflow-hidden">
          {/* rotating mandala accent */}
          <div aria-hidden className="spin-reverse absolute -left-20 -bottom-20 w-[220px] h-[220px] rounded-full border border-dashed border-rose-500/30" />

          <SectionHeading center={false} eyebrow={t("panchang.eyebrow")} title={t("panchang.title")} subtitle={subtitle} />

          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3.5">
            {LABELS.map(([label, key]) => (
              <div key={key} className="rounded-2xl px-[18px] py-4 bg-[rgba(7,11,30,0.5)] border border-white/10">
                <div className="text-ink-dim text-[12px] uppercase tracking-wide">{label}</div>
                {data ? (
                  <div className="text-base font-semibold mt-1.5">{data[key]}</div>
                ) : (
                  <div className={`h-4 mt-2 rounded ${error ? "" : "animate-pulse"} bg-white/10`}>
                    {error && <span className="text-ink-dim text-sm">—</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
