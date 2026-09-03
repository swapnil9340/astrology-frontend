"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from "@mui/icons-material/Chat";
import PersonOutlineIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import TranslateIcon from "@mui/icons-material/Translate";
import { navLinks } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";

const NAV_KEY = {
  "/horoscope": "nav.horoscope",
  "/kundli": "nav.kundli",
  "/kundli-matching": "nav.matching",
  "/panchang": "nav.panchang",
  "/pricing": "nav.pricing",
  "/#astrologers": "nav.astrologers",
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, loading } = useAuth();
  const { t, lang, toggle } = useLang();
  const firstName = user?.name?.split(" ")[0];
  const navLabel = (l) => (NAV_KEY[l.href] ? t(NAV_KEY[l.href]) : l.label);

  const LangToggle = ({ className = "" }) => (
    <button
      onClick={toggle}
      aria-label="Switch language"
      title={lang === "en" ? "हिंदी" : "English"}
      className={`grid place-items-center h-11 px-3 rounded-[10px] border border-white/10 text-ink bg-white/5 inline-flex items-center gap-1 text-sm active:scale-95 transition-transform ${className}`}
    >
      <TranslateIcon sx={{ fontSize: 18 }} /> {lang === "en" ? "हिं" : "EN"}
    </button>
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass border-b border-white/10" : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-[64px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0" onClick={() => setOpen(false)}>
          <span className="glow-pulse grid place-items-center w-10 h-10 rounded-full text-xl bg-[radial-gradient(circle_at_35%_30%,#ff9aa5,#e11d48_60%,#a80f2f)]">
            🔯
          </span>
          <span className="font-display text-[22px] sm:text-2xl font-bold">
            <span className="text-ink">Astro</span>
            <span className="gold-text">Veda</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ink-dim hover:text-gold-400 hover:bg-white/5 no-underline px-3 py-2 text-[15px] rounded-lg transition-colors"
            >
              {navLabel(l)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Auth control (desktop / tablet) */}
          {!loading && (
            user ? (
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="glass inline-flex items-center gap-1.5 pl-2.5 pr-3 py-[7px] rounded-full text-sm text-ink">
                  <PersonOutlineIcon sx={{ fontSize: 18 }} className="text-gold-400" />
                  {firstName}
                </span>
                <button
                  onClick={logout}
                  aria-label="Log out"
                  title="Log out"
                  className="grid place-items-center w-9 h-9 rounded-full border border-white/10 text-ink-dim hover:text-rose-500 hover:border-rose-500/40 transition-colors"
                >
                  <LogoutIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-[9px] rounded-full no-underline text-sm text-ink border border-white/15 hover:border-gold-500/50 hover:text-gold-400 transition-colors"
              >
                <PersonOutlineIcon sx={{ fontSize: 16 }} /> {t("nav.signin")}
              </Link>
            )
          )}

          <Link
            href="/#astrologers"
            className="btn-gold hidden md:inline-flex items-center gap-1.5 px-[18px] py-[9px] rounded-full no-underline text-sm"
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} /> {t("nav.talk")}
          </Link>

          {/* Language toggle — desktop (beside auth) & mobile (beside hamburger) */}
          <LangToggle />

          {/* Hamburger — visible below lg */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden grid place-items-center w-11 h-11 rounded-[10px] border border-white/10 text-ink bg-white/5 active:scale-95 transition-transform"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 glass ${
          open ? "max-h-[80vh] opacity-100 border-t border-white/10" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-x py-3 grid gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-ink no-underline px-2 py-3 rounded-lg border-b border-white/10 hover:bg-white/5"
            >
              {navLabel(l)}
            </Link>
          ))}
          <Link
            href="/#astrologers"
            onClick={() => setOpen(false)}
            className="btn-gold inline-flex items-center justify-center gap-1.5 text-center px-3 py-3 rounded-full no-underline mt-2"
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} /> {t("nav.talk")}
          </Link>

          {/* Auth (mobile) */}
          {!loading && (
            user ? (
              <div className="mt-2 grid gap-2">
                <span className="inline-flex items-center gap-2 text-ink text-sm px-2">
                  <PersonOutlineIcon sx={{ fontSize: 18 }} className="text-gold-400" />
                  {t("nav.signedInAs")} {firstName}
                </span>
                <button
                  onClick={() => { logout(); setOpen(false); }}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-full border border-white/15 text-ink hover:text-rose-500 hover:border-rose-500/40 transition-colors"
                >
                  <LogoutIcon sx={{ fontSize: 18 }} /> {t("nav.logout")}
                </button>
              </div>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-full border border-white/15 text-ink no-underline hover:border-gold-500/50"
                >
                  <PersonOutlineIcon sx={{ fontSize: 18 }} /> {t("nav.signin")}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center px-3 py-3 rounded-full text-ink no-underline bg-white/5 hover:bg-white/10"
                >
                  {t("nav.register")}
                </Link>
              </div>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
