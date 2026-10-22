"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { useStudioMotion } from "./motion-context";
import styles from "./flowstate.module.css";

function subscribeVisibility(notify: () => void) {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
}

const CYCLE_MS = 7_000;
// The original vector silhouette stays still; broad light currents travel inside it.
const MARK = "M 287.601 3.526 C 285.457 5.420, 280.203 8.319, 275.925 9.969 C 262.087 15.305, 254.206 15.992, 206.711 15.996 C 160.803 16, 149.652 16.730, 136.124 20.614 C 105.211 29.489, 81.668 52.957, 72.031 84.500 C 69.135 93.981, 67.013 108.653, 67.006 119.250 C 67 128.010, 68.236 130.858, 69.393 124.750 C 70.389 119.487, 78.325 102.785, 83.599 94.850 C 90.143 85.003, 100.462 74.309, 109.275 68.240 C 118.187 62.102, 122.806 59.734, 131.071 57.068 C 146.357 52.137, 149.448 51.845, 194.500 51.062 C 237.360 50.318, 237.529 50.306, 246.500 47.604 C 265.087 42.006, 279.499 30.046, 287.477 13.598 C 292.249 3.758, 293.600 -0.024, 292.317 0.042 C 291.868 0.065, 289.745 1.633, 287.601 3.526 M 227 92.513 C 225.625 93.991, 221.917 96.510, 218.760 98.109 C 208.040 103.542, 203.422 104.152, 166.500 105.007 C 130.438 105.842, 123.698 106.605, 108.923 111.526 C 87.688 118.598, 68.903 137.048, 59.569 160 C 56.303 168.030, 53.349 179.559, 52.523 187.500 C 52.179 190.800, 51.656 195.188, 51.361 197.250 C 50.565 202.812, 52.316 201.793, 54.477 195.437 C 57.477 186.611, 66.693 173.386, 75.784 164.860 C 87.800 153.593, 102.853 146.303, 123 141.995 C 126.025 141.348, 138.175 140.442, 150 139.982 C 179.129 138.849, 190.046 136.452, 202.816 128.387 C 210.646 123.442, 216.493 117.672, 221.447 110 C 229.024 98.269, 232.848 86.225, 227 92.513 M 123.781 153.457 C 114.596 155.468, 103.471 159.898, 96.746 164.221 C 80.018 174.975, 71.429 185.717, 58.941 211.500 C 45.414 239.429, 37.474 250.213, 24.046 258.892 C 17.781 262.941, 7.398 267, 3.306 267 C 2.038 267, 1 267.401, 1 267.892 C 1 269.377, 19.928 270.206, 27.758 269.064 C 44.078 266.683, 50.975 264.184, 62.661 256.416 C 74.341 248.653, 83.474 237.934, 90.812 223.380 C 92.509 220.014, 96.417 209.948, 99.496 201.010 C 102.576 192.073, 106.608 181.757, 108.458 178.084 C 112.806 169.449, 119.016 161.646, 124.706 157.666 C 132.546 152.184, 132.693 152.055, 131 152.134 C 130.175 152.173, 126.927 152.768, 123.781 153.457";
const CURRENTS = [
  "M 64 139 C 73 68 104 32 164 34 S 272 41 301 -12",
  "M 47 211 C 61 153 94 125 145 123 S 218 125 237 78",
  "M -12 277 C 51 280 70 239 83 205 S 104 163 138 147",
];
function flowOffset(index: number, progress: number) {
  return (-progress * 100 - (index % 3) * 21 + (index < 3 ? 34 : 0)).toFixed(3);
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
        <linearGradient id="ribbon-body" x1="50" y1="0" x2="210" y2="270" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eceee3" /><stop offset=".3" stopColor="#bed18e" /><stop offset=".58" stopColor="#91aa79" /><stop offset="1" stopColor="#455d46" />
        </linearGradient>
        <linearGradient id="ribbon-edge" x1="90" y1="0" x2="170" y2="270" gradientUnits="userSpaceOnUse">
          <stop stopColor="#eceee3" stopOpacity=".65" /><stop offset=".5" stopColor="#d3ed98" stopOpacity=".25" /><stop offset="1" stopColor="#91aa79" stopOpacity="0" />
        </linearGradient>
        <clipPath id="ribbon-silhouette"><path d={MARK} /></clipPath>
        <filter id="ribbon-soft" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="7" /></filter>
        <radialGradient id="flow-glow"><stop stopColor="#b9d28c" stopOpacity=".06" /><stop offset="1" stopColor="#b9d28c" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="450" cy="450" rx="340" ry="370" fill="url(#flow-glow)" />
      <g transform="translate(140 165) scale(2.1)">
        <path d={MARK} fill="url(#ribbon-body)" />
        <g clipPath="url(#ribbon-silhouette)">
          <g ref={linesRef} fill="none" strokeLinecap="round" filter="url(#ribbon-soft)">
            {CURRENTS.map((d, i) => <path key={`shade-${i}`} d={d} pathLength="100" stroke="#263e30" strokeWidth="38" strokeDasharray="24 76" strokeDashoffset={flowOffset(i, 0)} opacity=".7" />)}
            {CURRENTS.map((d, i) => <path key={`light-${i}`} d={d} pathLength="100" stroke="#e2f4b4" strokeWidth="21" strokeDasharray="30 70" strokeDashoffset={flowOffset(i + 3, 0)} opacity=".95" />)}
          </g>
          <path d={MARK} stroke="url(#ribbon-edge)" strokeWidth="1.1" />
        </g>
      </g>
    </svg>
    <div className={styles.fieldCaption}><span>Always moving forward.</span><button type="button" onClick={toggle} aria-label={paused ? "Play ambient animation" : "Pause ambient animation"}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{paused ? "Play" : "Pause"}</span></button><span className={styles.stillLabel}>STILL STUDY</span></div>
  </div>;
}
