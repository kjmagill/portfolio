"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { useStudioMotion } from "./motion-context";
import styles from "./flowstate.module.css";

function subscribeVisibility(notify: () => void) {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
}

const LINE_COUNT = 64;
const CYCLE_MS = 90_000;

// Integer harmonics return to the same position and velocity at the loop boundary.
function flowPath(index: number, phase: number) {
  const angle = index / LINE_COUNT * Math.PI * 2;
  const sway = .22 * Math.sin(phase);
  const radius = 300 + 18 * Math.sin(angle * 3 + phase * 2);
  const endAngle = angle + 2.65 + .45 * Math.sin(phase * 2);
  const point = (x: number, y: number) => `${x.toFixed(2)} ${y.toFixed(2)}`;
  return `M ${point(450 + Math.cos(angle + sway) * radius, 450 + Math.sin(angle + sway) * radius)} C ${point(450 + 250 * Math.cos(angle + 1.3 + phase), 450 + 270 * Math.sin(angle + 1.3 + phase * 2))}, ${point(450 + 250 * Math.cos(angle + 4.2 - phase), 450 + 270 * Math.sin(angle + 4.2 - phase * 2))}, ${point(450 + Math.cos(endAngle + sway) * radius, 450 + Math.sin(endAngle + sway) * radius)}`;
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
        <linearGradient id="flow-light" x1="160" y1="130" x2="750" y2="780" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dce5ad" /><stop offset=".35" stopColor="#a2b88a" /><stop offset=".7" stopColor="#5e796c" /><stop offset="1" stopColor="#566850" />
        </linearGradient>
        <radialGradient id="flow-glow"><stop stopColor="#b9d28c" stopOpacity=".12" /><stop offset="1" stopColor="#b9d28c" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="450" cy="450" r="410" fill="url(#flow-glow)" />
      <g ref={linesRef} stroke="url(#flow-light)" strokeWidth="1.15">
        {Array.from({ length: LINE_COUNT }, (_, i) => <path key={i} d={flowPath(i, 0)} />)}
      </g>
      <circle cx="450" cy="450" r="354" stroke="#b4c1a0" strokeOpacity=".12" strokeDasharray="2 9" />
      <path d="M450 84v20M450 796v20M84 450h20M796 450h20" stroke="#b4c1a0" strokeOpacity=".5" />
    </svg>
    <div className={styles.fieldCaption}><span>FIG. 01 / A STUDY IN FLOW</span><button type="button" onClick={toggle} aria-label={paused ? "Play ambient animation" : "Pause ambient animation"}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{paused ? "Play" : "Pause"}</span></button><span className={styles.stillLabel}>STILL STUDY</span></div>
  </div>;
}
