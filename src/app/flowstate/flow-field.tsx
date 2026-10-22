"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { useStudioMotion } from "./motion-context";
import styles from "./flowstate.module.css";

function subscribeVisibility(notify: () => void) {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
}

const STRANDS = 22;
const LINE_COUNT = STRANDS * 3;
const CYCLE_MS = 12_000;

// Three tapered currents echo the mark. Shared periodic motion keeps them connected
// without rotating the silhouette or creating a visible reset at the loop boundary.
function flowPath(index: number, phase: number) {
  const ribbon = Math.floor(index / STRANDS);
  const t = (index % STRANDS) / (STRANDS - 1);
  const spread = Math.sin(t * Math.PI);
  const breath = Math.sin(phase + ribbon * .8);
  const drift = Math.sin(phase * 2 + ribbon * .65);
  // A traveling wave passes through each ribbon, with the lower currents following.
  // Shared displacement keeps the fine strands together as the ribbon flexes.
  const point = (x: number, y: number) => {
    const wave = phase - x / 170 + y / 280 + ribbon * .7;
    const dx = 18 * Math.sin(wave) + 8 * Math.sin(phase * 2 + y / 210);
    const dy = 32 * Math.sin(wave + .8) + 12 * Math.cos(phase * 2 - x / 230);
    return `${(x + dx).toFixed(2)} ${(y + dy).toFixed(2)}`;
  };
  if (ribbon === 0) {
    return `M ${point(236 + t * 8, 456 + breath * 12)} C ${point(244 + t * 50, 162 + t * 126 + drift * 32)}, ${point(510 - spread * 50, 210 + t * 92 + breath * 38)}, ${point(738, 166 + breath * 12)} C ${point(696 - t * 20, 250 + t * 24)}, ${point(574, 252 + t * 70 + drift * 10)}, ${point(488 - t * 18, 250 + t * 72 + breath * 14)}`;
  }
  if (ribbon === 1) {
    return `M ${point(204 + t * 8, 610 + breath * 10)} C ${point(236 + t * 42, 368 + t * 112 + drift * 32)}, ${point(430 - spread * 20, 408 + t * 88 + breath * 30)}, ${point(618, 364 + breath * 10)} C ${point(584 - t * 12, 440 + t * 22)}, ${point(478, 452 + t * 44)}, ${point(420 - t * 24, 455 + t * 38 + drift * 10)}`;
  }
  return `M ${point(116, 744 + breath * 8)} C ${point(270 + t * 48, 724 + t * 8)}, ${point(230 + t * 104 + drift * 12, 568 + t * 54)}, ${point(392, 510 + breath * 14)}`;
}

export function FlowField() {
  const { paused, toggle } = useStudioMotion();
  const fieldRef = useRef<HTMLDivElement>(null);
  const elapsedRef = useRef(0);
  const linesRef = useRef<SVGGElement>(null);
  const [inView, setInView] = useState(true);
  const pageVisible = useSyncExternalStore(subscribeVisibility, () => document.visibilityState === "visible", () => true);
  useEffect(() => {
    if (!fieldRef.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(fieldRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (paused || !inView || !pageVisible || !linesRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forcedColors = window.matchMedia("(forced-colors: active)");
    const paths = Array.from(linesRef.current.querySelectorAll("path"));
    let frame = 0;
    let previous = 0;
    let lastDraw = 0;
    function tick(now: number) {
      if (previous) elapsedRef.current += Math.min(now - previous, 100);
      previous = now;
      // Cap SVG writes at 30fps, independently of monitor refresh rate.
      if (now - lastDraw >= 1000 / 30) {
        const phase = (elapsedRef.current % CYCLE_MS) / CYCLE_MS * Math.PI * 2;
        paths.forEach((path, index) => path.setAttribute("d", flowPath(index, phase)));
        lastDraw = now;
      }
      frame = requestAnimationFrame(tick);
    }
    function syncMotion() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!reducedMotion.matches && !forcedColors.matches) frame = requestAnimationFrame(tick);
    }
    const preferences = [reducedMotion, forcedColors];
    preferences.forEach(query => query.addEventListener("change", syncMotion));
    syncMotion();
    return () => {
      cancelAnimationFrame(frame);
      preferences.forEach(query => query.removeEventListener("change", syncMotion));
    };
  }, [paused, inView, pageVisible]);
  return <div ref={fieldRef} className={styles.field} data-paused={paused || !inView || !pageVisible}>
    <svg className={styles.fieldArt} viewBox="0 0 900 900" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="flow-light" x1="320" y1="160" x2="470" y2="760" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eceee3" /><stop offset=".43" stopColor="#d3ed98" /><stop offset="1" stopColor="#91aa79" />
        </linearGradient>
        <radialGradient id="flow-glow"><stop stopColor="#b9d28c" stopOpacity=".07" /><stop offset="1" stopColor="#b9d28c" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="450" cy="450" rx="340" ry="370" fill="url(#flow-glow)" />
      <g ref={linesRef} stroke="url(#flow-light)" strokeWidth="1.25" strokeLinecap="round">
        {Array.from({ length: LINE_COUNT }, (_, i) => <path key={i} d={flowPath(i, 0)} opacity={(.28 + .52 * Math.sin((i % STRANDS) / (STRANDS - 1) * Math.PI)).toFixed(3)} />)}
      </g>
    </svg>
    <div className={styles.fieldCaption}><span>FIG. 01 / A STUDY IN FLOW</span><button type="button" onClick={toggle} aria-label={paused ? "Play ambient animation" : "Pause ambient animation"}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{paused ? "Play" : "Pause"}</span></button><span className={styles.stillLabel}>STILL STUDY</span></div>
  </div>;
}
