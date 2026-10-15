"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./flowstate.module.css";

export function FlowField() {
  const [paused, setPaused] = useState(false);
  return <div className={styles.field} data-paused={paused}>
    <svg className={styles.fieldArt} viewBox="0 0 900 900" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="flow-light" x1="160" y1="130" x2="750" y2="780" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dce5ad" /><stop offset=".35" stopColor="#a2b88a" /><stop offset=".7" stopColor="#5e796c" /><stop offset="1" stopColor="#222f2a" />
        </linearGradient>
        <radialGradient id="flow-glow"><stop stopColor="#b9d28c" stopOpacity=".12" /><stop offset="1" stopColor="#b9d28c" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="450" cy="450" r="410" fill="url(#flow-glow)" />
      <g className={styles.flowLines} stroke="url(#flow-light)" strokeWidth=".9">
        {Array.from({ length: 70 }, (_, i) => {
          const t = i / 69;
          const angle = t * Math.PI * 2;
          const x = 450 + Math.cos(angle) * 310;
          const y = 450 + Math.sin(angle) * 310;
          const x2 = 450 + Math.cos(angle + 2.65) * 310;
          const y2 = 450 + Math.sin(angle + 2.65) * 310;
          return <path key={i} d={`M ${x.toFixed(2)} ${y.toFixed(2)} C ${180 + t * 550} ${70 + t * 150}, ${760 - t * 540} ${800 - t * 150}, ${x2.toFixed(2)} ${y2.toFixed(2)}`} />;
        })}
      </g>
      <circle cx="450" cy="450" r="354" stroke="#b4c1a0" strokeOpacity=".12" strokeDasharray="2 9" />
      <path d="M450 84v20M450 796v20M84 450h20M796 450h20" stroke="#b4c1a0" strokeOpacity=".5" />
    </svg>
    <div className={styles.fieldCaption}><span>FIG. 01 / A STUDY IN FLOW</span><button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play ambient animation" : "Pause ambient animation"} aria-pressed={paused}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}<span>{paused ? "Play" : "Pause"}</span></button><span className={styles.stillLabel}>STILL STUDY</span></div>
  </div>;
}
