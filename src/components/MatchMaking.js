"use client";

import { useState } from "react";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";
import { apiMatch } from "@/lib/api";

const inputClass =
  "w-full px-3 py-[11px] rounded-[10px] border border-white/10 bg-[rgba(7,11,30,0.5)] text-ink text-[15px] outline-none [color-scheme:dark] focus:border-gold-500/60 transition-colors";

const blank = () => ({ name: "", gender: "male", dob: "", time: "", place: "" });

export default function MatchMaking() {
  const { user, token, loading } = useAuth();
  const { lang } = useLang();
  const [p1, setP1] = useState(() => ({ ...blank(), gender: "male" }));
  const [p2, setP2] = useState(() => ({ ...blank(), gender: "female" }));
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("loading");
    try {
      const toPayload = (p) => ({
        name: p.name, gender: p.gender, dateOfBirth: p.dob, timeOfBirth: p.time, placeOfBirth: p.place,
      });
      const res = await apiMatch(token, { p1: toPayload(p1), p2: toPayload(p2), lang });
      setReport(res.report);
      setStatus("done");
    } catch (err) {
      setError(err.message || "Kuch galat ho gaya.");
      setStatus("error");
    }
  }

  if (loading) {
    return <div className="container-x text-center pt-24 pb-16 text-ink-dim">Loading…</div>;
  }

  if (!user) {
    return (
      <div className="container-x flex justify-center pt-6 pb-16">
        <div className="glass rounded-[22px] p-9 max-w-[440px] text-center">
          <div className="glow-pulse mx-auto grid place-items-center w-14 h-14 rounded-full text-2xl bg-[radial-gradient(circle_at_35%_30%,#ff9aa5,#e11d48_60%,#a80f2f)]">💑</div>
          <h2 className="font-display text-[24px] font-bold mt-4 mb-2">Kundli Milan ke liye login karein</h2>
          <p className="text-ink-dim text-sm mb-6">Dono logon ki details daal ke full Ashtakoot Guna Milan report paayein.</p>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/register" className="btn-gold px-4 py-3 rounded-full no-underline text-center">Create account</Link>
            <Link href="/login" className="px-4 py-3 rounded-full no-underline text-center border border-white/15 text-ink hover:border-gold-500/50">Sign in</Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === "done" && report?.report_url) {
    return (
      <div className="container-x pb-10">
        <div className="max-w-[900px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="font-display text-2xl m-0">💑 Match Making Report</h2>
            <div className="flex gap-2">
              <a href={report.report_url} target="_blank" rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full no-underline">
                <OpenInNewIcon sx={{ fontSize: 18 }} /> Open report
              </a>
              <button onClick={() => { setStatus("idle"); setReport(null); }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/15 text-ink hover:border-gold-500/50 cursor-pointer">
                <RefreshIcon sx={{ fontSize: 18 }} /> New match
              </button>
            </div>
          </div>
          <div className="glass rounded-[18px] overflow-hidden" style={{ height: "80vh" }}>
            <iframe src={report.report_url} title="Match Making Report" className="w-full h-full" style={{ border: 0 }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x pb-10">
      <form onSubmit={onSubmit} className="max-w-[820px] mx-auto">
        {error && (
          <p className="glass rounded-xl border border-rose-500/40 px-4 py-3 text-ink text-sm mb-4">{error}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <PersonCard title="Partner 1 (Boy)" value={p1} onChange={setP1} />
          <PersonCard title="Partner 2 (Girl)" value={p2} onChange={setP2} />
        </div>
        <div className="text-center mt-6">
          <button type="submit" disabled={status === "loading"}
            className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-none cursor-pointer text-base disabled:opacity-60 disabled:cursor-not-allowed">
            {status === "loading" ? "Milan ho raha hai…" : (<><FavoriteIcon sx={{ fontSize: 18 }} /> Match Kundli</>)}
          </button>
          <p className="text-ink-dim text-[12px] mt-3">Ashtakoot (36 guna) + Manglik + dosha — full report.</p>
        </div>
      </form>
    </div>
  );
}

function PersonCard({ title, value, onChange }) {
  const set = (k, v) => onChange((p) => ({ ...p, [k]: v }));
  return (
    <div className="glass rounded-[18px] p-6 grid gap-3.5">
      <h3 className="font-display text-lg m-0 text-gold-400">{title}</h3>
      <input className={inputClass} placeholder="Full name" value={value.name} onChange={(e) => set("name", e.target.value)} />
      <select className={`${inputClass} appearance-none`} value={value.gender} onChange={(e) => set("gender", e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1 text-left">
          <span className="text-[12px] text-ink-dim">Date of birth</span>
          <input type="date" required className={inputClass} value={value.dob} onChange={(e) => set("dob", e.target.value)} />
        </label>
        <label className="grid gap-1 text-left">
          <span className="text-[12px] text-ink-dim">Time</span>
          <input type="time" className={inputClass} value={value.time} onChange={(e) => set("time", e.target.value)} />
        </label>
      </div>
      <input className={inputClass} placeholder="Place of birth (City, Country)" value={value.place} onChange={(e) => set("place", e.target.value)} />
    </div>
  );
}
