"use client";

import { useEffect, useId, useRef } from "react";
import { useStudioMotion } from "./motion-context";

const COUNT = 2;
export function markPath(index: number, phase: number) {
  // Two tapered ribbons frame an open, diagonal channel. The broad shoulders
  // hold the silhouette at favicon scale; the inner curves breathe gently.
  const breath = Math.sin(phase) * 1.2;
  const points = [
    [28, 5], [16, 2], [4, 11], [4, 23],
    [4, 27], [6, 30], [10, 33],
    [8 + breath, 23], [16 - breath, 12], [28, 5],
  ].map(([x, y]) => index === 0 ? [x, y] : [40 - x, 40 - y]);
  const p = (i: number) => points[i].map(value => value.toFixed(2)).join(" ");
  return `M ${p(0)} C ${p(1)}, ${p(2)}, ${p(3)} C ${p(4)}, ${p(5)}, ${p(6)} C ${p(7)}, ${p(8)}, ${p(9)} Z`;
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
    <g fill={`url(#${gradientId})`}>{Array.from({ length: COUNT }, (_, i) => <path key={i} d={markPath(i, 0)} />)}</g>
  </svg>;
}
