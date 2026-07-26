"use client";

import { useEffect, useRef } from "react";

/**
 * StarfieldBackground
 * A hand-built <canvas> night sky:
 *  - 3 parallax layers of twinkling stars (each star breathes on its own phase)
 *  - slow-drifting constellation lines that link nearby "bright" stars
 *  - occasional shooting stars with a fading tail
 *  - a subtle cursor parallax so the sky reacts to the visitor
 * Respects prefers-reduced-motion (renders a still sky, no RAF loop).
 */
export default function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars = [];
    let brightStars = [];
    let shootingStars = [];
    let raf = 0;
    let t = 0;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    function build() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(260, Math.floor((width * height) / 6500));
      stars = new Array(density).fill(0).map(() => {
        const layer = Math.random(); // 0..1 -> depth
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.4 + layer * 1.7,
          depth: 0.25 + layer * 1, // parallax strength
          baseA: 0.35 + Math.random() * 0.6,
          twPhase: Math.random() * Math.PI * 2,
          twSpeed: 0.6 + Math.random() * 1.6,
          hue: Math.random() < 0.18 ? 42 : Math.random() < 0.3 ? 265 : 210,
        };
      });

      // pick a handful of bright anchor stars for constellation lines
      brightStars = stars
        .filter((s) => s.r > 1.4)
        .slice(0, 22)
        .map((s) => s);
    }

    function spawnShootingStar() {
      const fromLeft = Math.random() < 0.5;
      const y = Math.random() * height * 0.5;
      shootingStars.push({
        x: fromLeft ? -40 : width + 40,
        y,
        vx: (fromLeft ? 1 : -1) * (5.5 + Math.random() * 3),
        vy: 2.2 + Math.random() * 1.6,
        life: 0,
        max: 60 + Math.random() * 30,
        len: 120 + Math.random() * 90,
      });
    }

    function draw() {
      t += 1;

      // ease pointer toward target for smooth parallax
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      const px = (pointer.x - 0.5) * 30;
      const py = (pointer.y - 0.5) * 30;

      ctx.clearRect(0, 0, width, height);

      // ---- constellation lines (drawn under the stars) ----
      ctx.lineWidth = 1;
      for (let i = 0; i < brightStars.length; i++) {
        for (let j = i + 1; j < brightStars.length; j++) {
          const a = brightStars[i];
          const b = brightStars[j];
          const ax = a.x + px * a.depth;
          const ay = a.y + py * a.depth;
          const bx = b.x + px * b.depth;
          const by = b.y + py * b.depth;
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.16;
            ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      // ---- stars ----
      for (const s of stars) {
        const tw = reduced
          ? s.baseA
          : s.baseA * (0.55 + 0.45 * Math.sin(t * 0.02 * s.twSpeed + s.twPhase));
        const x = s.x + px * s.depth;
        const y = s.y + py * s.depth;
        const color =
          s.hue === 42
            ? `rgba(255, 214, 130, ${tw})`
            : s.hue === 265
            ? `rgba(190, 165, 255, ${tw})`
            : `rgba(226, 232, 255, ${tw})`;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // soft glow for the biggest stars
        if (s.r > 1.5) {
          ctx.beginPath();
          ctx.fillStyle =
            s.hue === 42
              ? `rgba(255, 207, 92, ${tw * 0.14})`
              : `rgba(167, 139, 250, ${tw * 0.14})`;
          ctx.arc(x, y, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ---- shooting stars ----
      if (!reduced) {
        for (const sh of shootingStars) {
          sh.x += sh.vx;
          sh.y += sh.vy;
          sh.life += 1;
          const fade =
            sh.life < 10
              ? sh.life / 10
              : sh.life > sh.max - 15
              ? Math.max(0, (sh.max - sh.life) / 15)
              : 1;
          const tailX = sh.x - (sh.vx / Math.hypot(sh.vx, sh.vy)) * sh.len;
          const tailY = sh.y - (sh.vy / Math.hypot(sh.vx, sh.vy)) * sh.len;
          const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 240, 200, ${0.9 * fade})`);
          grad.addColorStop(1, "rgba(255, 240, 200, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          // head
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 240, ${fade})`;
          ctx.arc(sh.x, sh.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
        shootingStars = shootingStars.filter(
          (s) => s.life < s.max && s.x > -80 && s.x < width + 80
        );
        // occasionally launch one
        if (t % 4 === 0 && Math.random() < 0.14 && shootingStars.length < 2) {
          spawnShootingStar();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function onResize() {
      build();
      if (reduced) {
        // draw a single still frame
        cancelAnimationFrame(raf);
        draw();
        cancelAnimationFrame(raf);
      }
    }

    function onPointer(e) {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    }

    build();
    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
      window.addEventListener("pointermove", onPointer, { passive: true });
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background:
          "radial-gradient(1200px 700px at 50% -10%, #141c4d 0%, #0b1030 45%, #070b1e 100%)",
      }}
    >
      {/* drifting nebula clouds */}
      <div className="nebula" />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
      {/* faint bottom vignette so foreground text stays readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 55%, rgba(7,11,30,0.55) 100%)",
        }}
      />
    </div>
  );
}
