"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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

  return (
    <header
      className={scrolled ? "glass" : ""}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        className="container-x"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
        >
          <span
            className="glow-pulse"
            style={{
              display: "grid",
              placeItems: "center",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%, #ffe6a1, #f5a623 60%, #e07a1f)",
              fontSize: 20,
            }}
          >
            🔯
          </span>
          <span className="font-display" style={{ fontSize: 24, fontWeight: 700 }}>
            <span style={{ color: "var(--ink)" }}>Astro</span>
            <span className="gold-text">Veda</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hide-mobile" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                color: "var(--ink-dim)",
                textDecoration: "none",
                padding: "8px 12px",
                fontSize: 15,
                borderRadius: 8,
                transition: "color 0.2s, background 0.2s",
              }}
              className="nav-link"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link
            href="/#astrologers"
            className="btn-gold hide-mobile"
            style={{ padding: "9px 18px", borderRadius: 999, textDecoration: "none", fontSize: 14 }}
          >
            Talk to Astrologer
          </Link>
          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="show-mobile"
            style={{
              background: "transparent",
              border: "1px solid var(--line)",
              borderRadius: 10,
              width: 42,
              height: 42,
              color: "var(--ink)",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass show-mobile" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="container-x" style={{ paddingBlock: 12, display: "grid", gap: 4 }}>
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  color: "var(--ink)",
                  textDecoration: "none",
                  padding: "12px 8px",
                  borderRadius: 8,
                  borderBottom: "1px solid var(--line)",
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#astrologers"
              onClick={() => setOpen(false)}
              className="btn-gold"
              style={{
                textAlign: "center",
                padding: "12px",
                borderRadius: 999,
                textDecoration: "none",
                marginTop: 8,
              }}
            >
              Talk to Astrologer
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .nav-link:hover { color: var(--gold-400) !important; background: rgba(255,255,255,0.04); }
        .show-mobile { display: none; }
        @media (max-width: 860px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: inline-flex; }
        }
      `}</style>
    </header>
  );
}
