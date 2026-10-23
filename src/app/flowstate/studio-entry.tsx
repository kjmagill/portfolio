"use client";

import { ArrowDown } from "lucide-react";

export function StudioEntry() {
  return <a href="#practice" onClick={(event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const section = document.getElementById("practice");
    if (!section) return;
    event.preventDefault();
    if (window.location.hash !== "#practice") window.history.pushState(null, "", "#practice");
    section.focus({ preventScroll: true });
    section.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  }}>Enter the studio <ArrowDown size={15} aria-hidden="true" /></a>;
}
