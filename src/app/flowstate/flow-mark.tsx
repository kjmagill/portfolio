"use client";

import { useEffect, useId, useRef } from "react";
import { useStudioMotion } from "./motion-context";

const COUNT = 4;
export function markPath(index: number, phase: number) {
  // Parallel streams keep a clear silhouette without intersections or radial points.
  const offset = (index - 1.5) * 5.2;
  const drift = 1.6 * Math.sin(phase);
  const curl = 2 * Math.sin(phase + .6);
  const y = (value: number) => (value + offset).toFixed(2);
  return `M 5 ${y(24 + drift)} C 12 ${y(26 + drift)}, 13 ${y(14 + curl)}, 21 ${y(16)} S 29 ${y(24 - curl)}, 35 ${y(15 - drift)}`;
}

export function FlowMark() {
  const svgRef = useRef<SVGSVGElement>(null);
  const elapsed = useRef(0);
  const { paused } = useStudioMotion();
  const gradientId = useId();
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || paused) return;
    const preferences = [window.matchMedia("(prefers-reduced-motion: reduce)"), window.matchMedia("(forced-colors: active)"), window.matchMedia("(min-width:600px) and (max-width:899px)")];
    const paths = Array.from(svg.querySelectorAll("path"));
    let visible = true, frame = 0, previous = 0, drawn = 0;
    function tick(now: number) {
      if (previous) elapsed.current += Math.min(now - previous, 100);
      previous = now;
      if (now - drawn >= 1000 / 30) {
        paths.forEach((path, i) => path.setAttribute("d", markPath(i, elapsed.current / 36_000 * Math.PI * 2)));
        drawn = now;
      }
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (visible && document.visibilityState === "visible" && !preferences.some(query => query.matches)) frame = requestAnimationFrame(tick);
    }
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }) : null;
    observer?.observe(svg);
    document.addEventListener("visibilitychange", sync);
    preferences.forEach(query => query.addEventListener("change", sync));
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      preferences.forEach(query => query.removeEventListener("change", sync));
    };
  }, [paused]);
  return <svg ref={svgRef} width="30" height="30" viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id={gradientId} x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse"><stop stopColor="#eceee3" /><stop offset=".55" stopColor="#d3ed98" /><stop offset="1" stopColor="#91aa79" /></linearGradient></defs>
    <g stroke={`url(#${gradientId})`} strokeWidth="1.8" strokeLinecap="round">{Array.from({ length: COUNT }, (_, i) => <path key={i} d={markPath(i, 0)} />)}</g>
  </svg>;
}
