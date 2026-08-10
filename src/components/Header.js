"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from "@mui/icons-material/Chat";
import { navLinks } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/#astrologers"
            className="btn-gold hidden sm:inline-flex items-center gap-1.5 px-[18px] py-[9px] rounded-full no-underline text-sm"
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} /> Talk to Astrologer
          </Link>

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
              {l.label}
            </Link>
          ))}
          <Link
            href="/#astrologers"
            onClick={() => setOpen(false)}
            className="btn-gold inline-flex items-center justify-center gap-1.5 text-center px-3 py-3 rounded-full no-underline mt-2"
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} /> Talk to Astrologer
          </Link>
        </nav>
      </div>
    </header>
  );
}
