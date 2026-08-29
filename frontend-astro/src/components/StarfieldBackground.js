"use client";

import { useEffect, useRef } from "react";

/**
 * StarfieldBackground
 * A hand-built <canvas> night sky:
 *  - parallax twinkling stars (each star breathes on its own phase)
 *  - slow-drifting constellation lines linking nearby bright stars
 *  - occasional shooting stars with a fading tail
 *  - cursor parallax on desktop; gentle auto-sway on touch devices
 * Mobile-hardened: sizes from the visual viewport, ignores the address-bar
 * height jitter, re-tunes density on rotate, and caps DPR for performance.
 * Respects prefers-reduced-motion (renders a still sky, no RAF loop).
 */
export default function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars = [];
    let brightStars = [];
    let shootingStars = [];
    let raf = 0;
    let t = 0;
    let lastBuildW = 0;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    function viewport() {
      // On mobile, innerWidth/innerHeight track the visual viewport reliably.
      return {
        w: window.innerWidth || document.documentElement.clientWidth,
        h: window.innerHeight || document.documentElement.clientHeight,
      };
    }

    function build() {
      const { w, h } = viewport();
      width = w;
      height = h;
      lastBuildW = w;
      // Lighter DPR on phones keeps the paint cheap while staying crisp.
      dpr = Math.min(window.devicePixelRatio || 1, isTouch ? 2 : 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Denser floor on small screens so the sky never looks empty.
      const area = width * height;
      const density = Math.max(
        isTouch ? 90 : 70,
        Math.min(260, Math.floor(area / (isTouch ? 5200 : 6500)))
      );
      stars = new Array(density).fill(0).map(() => {
        const layer = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: (0.5 + layer * 1.7) * (isTouch ? 1.15 : 1),
          depth: 0.25 + layer * 1,
          baseA: 0.45 + Math.random() * 0.55,
          twPhase: Math.random() * Math.PI * 2,
          twSpeed: 0.6 + Math.random() * 1.6,
          hue: Math.random() < 0.18 ? 42 : Math.random() < 0.3 ? 265 : 210,
        };
      });

      brightStars = stars.filter((s) => s.r > 1.5).slice(0, 22);
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

      if (isTouch) {
        // no cursor on touch — sway the sky gently so it still feels alive
        pointer.tx = 0.5 + Math.sin(t * 0.004) * 0.5;
        pointer.ty = 0.5 + Math.cos(t * 0.003) * 0.5;
      }
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      const px = (pointer.x - 0.5) * (isTouch ? 16 : 30);
      const py = (pointer.y - 0.5) * (isTouch ? 16 : 30);

      ctx.clearRect(0, 0, width, height);

      // constellation lines
      ctx.lineWidth = 1;
      for (let i = 0; i < brightStars.length; i++) {
        for (let j = i + 1; j < brightStars.length; j++) {
          const a = brightStars[i];
          const b = brightStars[j];
          const ax = a.x + px * a.depth;
          const ay = a.y + py * a.depth;
          const bx = b.x + px * b.depth;
          const by = b.y + py * b.depth;
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(244, 63, 94, ${(1 - dist / 150) * 0.16})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      // stars
      for (const s of stars) {
        const tw = reduced
          ? s.baseA
          : s.baseA * (0.55 + 0.45 * Math.sin(t * 0.02 * s.twSpeed + s.twPhase));
        const x = s.x + px * s.depth;
        const y = s.y + py * s.depth;
        const color =
          s.hue === 42
            ? `rgba(255, 194, 150, ${tw})`
            : s.hue === 265
            ? `rgba(255, 150, 175, ${tw})`
            : `rgba(255, 236, 240, ${tw})`;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.r > 1.6) {
          ctx.beginPath();
          ctx.fillStyle =
            s.hue === 42
              ? `rgba(255, 140, 110, ${tw * 0.16})`
              : `rgba(244, 63, 94, ${tw * 0.18})`;
          ctx.arc(x, y, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // shooting stars
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
          const norm = Math.hypot(sh.vx, sh.vy);
          const tailX = sh.x - (sh.vx / norm) * sh.len;
          const tailY = sh.y - (sh.vy / norm) * sh.len;
          const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 240, 200, ${0.9 * fade})`);
          grad.addColorStop(1, "rgba(255, 240, 200, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 240, ${fade})`;
          ctx.arc(sh.x, sh.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
        shootingStars = shootingStars.filter(
          (s) => s.life < s.max && s.x > -80 && s.x < width + 80
        );
        if (t % 4 === 0 && Math.random() < 0.14 && shootingStars.length < 2) {
          spawnShootingStar();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    let resizeTimer = 0;
    function onResize() {
      // Ignore height-only changes (mobile browser chrome show/hide) to avoid
      // constant rebuilds/flicker while scrolling; only rebuild on width change.
      const { w } = viewport();
      if (Math.abs(w - lastBuildW) < 2) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        if (reduced) {
          cancelAnimationFrame(raf);
          draw();
          cancelAnimationFrame(raf);
        }
      }, 150);
    }

    function onOrientation() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 250);
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
      if (!isTouch) window.addEventListener("pointermove", onPointer, { passive: true });
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrientation);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientation);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(1200px_700px_at_50%_-10%,#3a1024_0%,#1f0916_45%,#150610_100%)]"
    >
      <div className="nebula" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(21,6,16,0.55)_100%)]" />
    </div>
  );
}
