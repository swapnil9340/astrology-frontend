"use client";

import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const inputClass =
  "w-full px-3 py-[11px] rounded-[10px] border border-white/10 bg-[rgba(7,11,30,0.5)] text-ink text-[15px] outline-none font-[inherit] [color-scheme:dark] focus:border-gold-500/60 transition-colors";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e) {
    e.preventDefault();
    // Demo only — no backend wired yet. Show a friendly confirmation.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="glass rounded-[20px] p-[34px] text-center">
        <AutoAwesomeIcon className="text-gold-400 float-y" sx={{ fontSize: 52 }} />
        <h3 className="font-display text-2xl mt-2.5 mb-1.5">Message received!</h3>
        <p className="text-ink-dim mt-0">
          Thank you, {form.name.trim() || "friend"}. Our team will reach out within 24 hours.
        </p>
        <button
          onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
          className="btn-gold px-[22px] py-[11px] rounded-full border-none cursor-pointer mt-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-[20px] p-7 grid gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="grid gap-1.5">
          <span className="text-[13px] text-ink-dim">Your name</span>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full name" className={inputClass} />
        </label>
        <label className="grid gap-1.5">
          <span className="text-[13px] text-ink-dim">Email</span>
          <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className={inputClass} />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="text-[13px] text-ink-dim">Subject</span>
        <input value={form.subject} onChange={(e) => update("subject", e.target.value)} placeholder="How can we help?" className={inputClass} />
      </label>
      <label className="grid gap-1.5">
        <span className="text-[13px] text-ink-dim">Message</span>
        <textarea required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Write your message..." className={`${inputClass} resize-y`} />
      </label>
      <button type="submit" className="btn-gold inline-flex items-center justify-center gap-2 py-[13px] rounded-xl border-none cursor-pointer text-base">
        Send Message <SendIcon sx={{ fontSize: 18 }} />
      </button>
    </form>
  );
}
