"use client";

import { useEffect, useState } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CasinoIcon from "@mui/icons-material/Casino";
import PaletteIcon from "@mui/icons-material/Palette";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoodIcon from "@mui/icons-material/Mood";
import { apiRashifal } from "@/lib/api";
import { getRashifal } from "@/lib/rashifal";

export default function RashifalView({ slug }) {
  const [state, setState] = useState({ status: "loading", data: null, source: "" });

  useEffect(() => {
    let active = true;
    apiRashifal(slug)
      .then((res) => active && setState({ status: "done", data: res.rashifal, source: res.source }))
      .catch(() => {
        // fallback to static content so the page is never empty
        const fb = getRashifal(slug);
        if (active) setState({ status: fb ? "done" : "error", data: fb, source: "static" });
      });
    return () => { active = false; };
  }, [slug]);

  if (state.status === "loading") {
    return (
      <div className="glass rounded-[22px] p-10 text-center max-w-[820px] mx-auto">
        <div className="spin-slow mx-auto w-16 h-16 rounded-full border border-dashed border-gold-400/40 grid place-items-center text-2xl">🌗</div>
        <p className="mt-4 text-ink font-display text-lg">Aaj ka rashifal likha ja raha hai…</p>
      </div>
    );
  }

  if (state.status === "error" || !state.data) {
    return <p className="text-center text-ink-dim">Rashifal abhi uplabdh nahi — thodi der baad try karein.</p>;
  }

  const r = state.data;
  return (
    <div className="grid gap-5 max-w-[820px] mx-auto">
      {/* ratings */}
      {r.ratings && (
        <div className="glass rounded-[20px] p-6 grid gap-4">
          <Bar label="❤️ Love" value={r.ratings.love} />
          <Bar label="💼 Career" value={r.ratings.career} />
          <Bar label="🌿 Health" value={r.ratings.health} />
        </div>
      )}

      {/* overall */}
      <div className="glass rounded-[22px] p-7">
        <div className="flex items-center gap-2 text-gold-400 text-sm mb-2"><AutoAwesomeIcon sx={{ fontSize: 18 }} /> Aaj ka din</div>
        <p className="text-ink leading-8 m-0">{r.overall}</p>
      </div>

      {/* life areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Area icon={FavoriteIcon} title="Love" text={r.love} />
        <Area icon={BusinessCenterIcon} title="Career" text={r.career} />
        <Area icon={MonitorHeartIcon} title="Health" text={r.health} />
        <Area icon={CurrencyRupeeIcon} title="Finance" text={r.finance} />
      </div>

      {/* lucky */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Lucky icon={CasinoIcon} label="Lucky number" value={r.lucky?.number} />
        <Lucky icon={PaletteIcon} label="Lucky colour" value={r.lucky?.color} />
        <Lucky icon={AccessTimeIcon} label="Lucky time" value={r.lucky?.time} />
        <Lucky icon={MoodIcon} label="Mood" value={r.mood} />
      </div>

      <p className="text-center text-ink-dim text-[12px]">
        {state.source === "static"
          ? "Offline rashifal dikhaya ja raha hai."
          : "AI-generated · guidance & entertainment ke liye."}
      </p>
    </div>
  );
}

function Bar({ label, value = 0 }) {
  return (
    <div>
      <div className="flex justify-between text-[13px] mb-1.5">
        <span>{label}</span>
        <span className="text-gold-400">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--gold-500),var(--gold-400))]" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Area({ icon: Icon, title, text }) {
  return (
    <div className="glass card-hover rounded-[18px] p-6">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="text-gold-400" sx={{ fontSize: 22 }} />
        <h3 className="font-display text-lg m-0">{title}</h3>
      </div>
      <p className="text-ink-dim text-sm leading-7 m-0">{text}</p>
    </div>
  );
}

function Lucky({ icon: Icon, label, value }) {
  return (
    <div className="glass rounded-2xl p-4 text-center">
      <Icon className="text-gold-400" sx={{ fontSize: 22 }} />
      <div className="text-ink-dim text-[11px] mt-1.5">{label}</div>
      <div className="font-display text-lg font-bold gold-text">{value ?? "—"}</div>
    </div>
  );
}
