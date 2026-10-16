"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const MotionContext = createContext({ paused: false, toggle: () => {} });
export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return <MotionContext.Provider value={{ paused, toggle: () => setPaused(value => !value) }}>{children}</MotionContext.Provider>;
}
export function useStudioMotion() { return useContext(MotionContext); }
