"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PersonOutlineIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/Email";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineRounded";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";

const inputClass =
  "w-full pl-11 pr-3 py-3 rounded-xl border border-white/10 bg-[rgba(7,11,30,0.5)] text-ink text-[15px] outline-none [color-scheme:dark] focus:border-gold-500/60 transition-colors";

export default function AuthForm({ mode = "login" }) {
  const isRegister = mode === "register";
  const router = useRouter();
  const { login, register } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [fields, setFields] = useState({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setFields({});
    setBusy(true);
    try {
      if (isRegister) {
        await register(form.name, form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
      router.push("/");
    } catch (err) {
      if (err instanceof ApiError && err.fields) setFields(err.fields);
      setError(err.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container-x flex justify-center pt-[70px] pb-16">
      <div className="glass card-hover w-full max-w-[440px] rounded-[22px] p-7 sm:p-9 relative overflow-hidden">
        <div className="spin-slow absolute -right-[70px] -top-[70px] w-[190px] h-[190px] rounded-full border border-dashed border-gold-400/30" aria-hidden />

        <div className="text-center mb-7">
          <div className="glow-pulse mx-auto grid place-items-center w-14 h-14 rounded-full text-2xl bg-[radial-gradient(circle_at_35%_30%,#ff9aa5,#e11d48_60%,#a80f2f)]">
            🔯
          </div>
          <h1 className="font-display text-[26px] font-bold mt-4 mb-1">
            {isRegister ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-ink-dim text-sm m-0">
            {isRegister
              ? "Join AstroVeda and unlock your cosmic journey."
              : "Sign in to continue your cosmic journey."}
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 mb-4 text-[14px] text-ink">
            <ErrorOutlineIcon sx={{ fontSize: 20 }} className="text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="grid gap-4">
          {isRegister && (
            <Field icon={PersonOutlineIcon} label="Full name" error={fields.name}>
              <input
                className={inputClass}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                autoComplete="name"
              />
            </Field>
          )}

          <Field icon={MailOutlineIcon} label="Email" error={fields.email}>
            <input
              type="email"
              className={inputClass}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
            />
          </Field>

          <Field icon={LockOutlinedIcon} label="Password" error={fields.password}>
            <input
              type="password"
              className={inputClass}
              placeholder={isRegister ? "At least 6 characters" : "Your password"}
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
          </Field>

          <button
            type="submit"
            disabled={busy}
            className="btn-gold inline-flex items-center justify-center gap-2 py-[13px] rounded-xl border-none cursor-pointer text-base mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {busy ? "Please wait…" : (<>{isRegister ? "Create account" : "Sign in"} <LoginIcon sx={{ fontSize: 18 }} /></>)}
          </button>
        </form>

        <p className="text-center text-ink-dim text-sm mt-6 mb-0">
          {isRegister ? (
            <>Already have an account? <Link href="/login" className="text-gold-400 no-underline hover:underline">Sign in</Link></>
          ) : (
            <>New to AstroVeda? <Link href="/register" className="text-gold-400 no-underline hover:underline">Create an account</Link></>
          )}
        </p>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, error, children }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] text-ink-dim">{label}</span>
      <div className="relative">
        <Icon sx={{ fontSize: 20 }} className="text-ink-dim absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        {children}
      </div>
      {error && <span className="text-[12px] text-rose-500">{error}</span>}
    </label>
  );
}
