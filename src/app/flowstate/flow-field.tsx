"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { useStudioMotion } from "./motion-context";
import styles from "./flowstate.module.css";

function subscribeVisibility(notify: () => void) {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
}

const STRANDS = 7;
const LINE_COUNT = STRANDS * 3;
const CYCLE_MS = 8_000;

// Fixed ribbon courses preserve the F silhouette. Light travels along each course.
function flowPath(index: number) {
  const ribbon = Math.floor(index / STRANDS);
  const t = (index % STRANDS) / (STRANDS - 1);
  const point = (x: number, y: number) => `${x.toFixed(2)} ${y.toFixed(2)}`;
  if (ribbon === 0) {
    return `M 236 456 C ${point(244 + t * 50, 162 + t * 126)}, ${point(510, 210 + t * 92)}, 738 166`;
  }
  if (ribbon === 1) {
    return `M 204 610 C ${point(236 + t * 42, 368 + t * 112)}, ${point(430, 408 + t * 88)}, 618 364`;
  }
  return `M 116 744 C ${point(270 + t * 48, 724 + t * 8)}, ${point(230 + t * 104, 568 + t * 54)}, 392 510`;
}

function flowOffset(index: number, progress: number) {
  return (-progress * 100 - (index % STRANDS) * 5 - Math.floor(index / STRANDS) * 23).toFixed(3);
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
        const progress = (elapsedRef.current % CYCLE_MS) / CYCLE_MS;
        paths.forEach((path, index) => path.setAttribute("stroke-dashoffset", flowOffset(index, progress)));
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
      <g stroke="url(#flow-light)" strokeWidth="6" strokeLinecap="round" opacity=".38">
        {Array.from({ length: LINE_COUNT }, (_, i) => <path key={i} d={flowPath(i)} />)}
      </g>
      <g ref={linesRef} stroke="url(#flow-light)" strokeWidth="6" strokeLinecap="round" opacity=".85">
        {Array.from({ length: LINE_COUNT }, (_, i) => <path key={i} d={flowPath(i)} pathLength="100" strokeDasharray="24 76" strokeDashoffset={flowOffset(i, 0)} />)}
      </g>
    </svg>
    <div className={styles.fieldCaption}><span>FIG. 01 / A STUDY IN FLOW</span><button type="button" onClick={toggle} aria-label={paused ? "Play ambient animation" : "Pause ambient animation"}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{paused ? "Play" : "Pause"}</span></button><span className={styles.stillLabel}>STILL STUDY</span></div>
  </div>;
}
