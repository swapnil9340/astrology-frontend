"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PersonOutlineIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import WcIcon from "@mui/icons-material/Wc";
import CakeIcon from "@mui/icons-material/Cake";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineRounded";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";

const inputClass =
  "w-full pl-11 pr-3 py-3 rounded-xl border border-white/10 bg-[rgba(7,11,30,0.5)] text-ink text-[15px] outline-none [color-scheme:dark] focus:border-gold-500/60 transition-colors";
// password field needs right padding for the eye button
const pwInputClass = inputClass.replace("pr-3", "pr-11");

export default function AuthForm({ mode = "login" }) {
  const isRegister = mode === "register";
  const router = useRouter();
  const { login, register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    dob: "",
    tob: "",
    place: "",
  });
  const [fields, setFields] = useState({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);

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
        await register({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          gender: form.gender,
          dateOfBirth: form.dob,
          timeOfBirth: form.tob,
          placeOfBirth: form.place,
        });
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
      <div className="glass card-hover w-full max-w-[460px] rounded-[22px] p-7 sm:p-9 relative overflow-hidden">
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
              ? "Apni janm details do — hum turant ek basic prediction ready kar denge."
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
              <input className={inputClass} placeholder="Your name" value={form.name}
                onChange={(e) => update("name", e.target.value)} autoComplete="name" />
            </Field>
          )}

          <Field icon={MailOutlineIcon} label="Email" error={fields.email}>
            <input type="email" className={inputClass} placeholder="you@example.com" value={form.email}
              onChange={(e) => update("email", e.target.value)} autoComplete="email" />
          </Field>

          {isRegister && (
            <Field icon={CallIcon} label="Phone number" error={fields.phone}>
              <input type="tel" className={inputClass} placeholder="+91 98765 43210" value={form.phone}
                onChange={(e) => update("phone", e.target.value)} autoComplete="tel" />
            </Field>
          )}

          <Field icon={LockOutlinedIcon} label="Password" error={fields.password}>
            <input type={showPw ? "text" : "password"} className={pwInputClass}
              placeholder={isRegister ? "At least 6 characters" : "Your password"} value={form.password}
              onChange={(e) => update("password", e.target.value)}
              autoComplete={isRegister ? "new-password" : "current-password"} />
            <button type="button" onClick={() => setShowPw((v) => !v)} tabIndex={-1}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center w-8 h-8 rounded-lg text-ink-dim hover:text-gold-400 transition-colors">
              {showPw ? <VisibilityOffIcon sx={{ fontSize: 20 }} /> : <VisibilityIcon sx={{ fontSize: 20 }} />}
            </button>
          </Field>

          {isRegister && (
            <>
              <Field icon={WcIcon} label="Gender" error={fields.gender}>
                <select className={`${inputClass} appearance-none`} value={form.gender}
                  onChange={(e) => update("gender", e.target.value)}>
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field icon={CakeIcon} label="Date of birth" error={fields.dateOfBirth}>
                  <input type="date" className={inputClass} value={form.dob}
                    onChange={(e) => update("dob", e.target.value)} />
                </Field>
                <Field icon={AccessTimeIcon} label="Time (optional)" error={fields.timeOfBirth}>
                  <input type="time" className={inputClass} value={form.tob}
                    onChange={(e) => update("tob", e.target.value)} />
                </Field>
              </div>

              <Field icon={LocationOnIcon} label="Place of birth" error={fields.placeOfBirth}>
                <input className={inputClass} placeholder="City, Country" value={form.place}
                  onChange={(e) => update("place", e.target.value)} autoComplete="off" />
              </Field>
            </>
          )}

          <button type="submit" disabled={busy}
            className="btn-gold inline-flex items-center justify-center gap-2 py-[13px] rounded-xl border-none cursor-pointer text-base mt-1 disabled:opacity-60 disabled:cursor-not-allowed">
            {busy ? "Please wait…" : (<>{isRegister ? "Create account" : "Sign in"} <LoginIcon sx={{ fontSize: 18 }} /></>)}
          </button>
        </form>

        <p className="text-center text-ink-dim text-sm mt-6 mb-0">
          {isRegister ? (
            <>Already have an account? <Link href="/login" className="text-gold-400 no-underline hover:underline">Sign in</Link></>
          ) : (
            <>New to AstroVedji? <Link href="/register" className="text-gold-400 no-underline hover:underline">Create an account</Link></>
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
