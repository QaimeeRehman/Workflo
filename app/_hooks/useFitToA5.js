// app/_hooks/useFitToA5.js
"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const MIN_SCALE = 0.55;

export function useFitToA5(deps = []) {
  const pageRef = useRef(null);
  const innerRef = useRef(null); // stays unscaled, natural size — this is what we measure
  const [scale, setScale] = useState(1);

  const recalc = useCallback(() => {
    const page = pageRef.current;
    const inner = innerRef.current;
    if (!page || !inner) return;

    const pageHeight = page.clientHeight;
    const contentHeight = inner.scrollHeight; // inner is never transformed, so this is always its true size

    const nextScale = Math.min(1, pageHeight / contentHeight);
    setScale((prev) => {
      const clamped = Math.max(nextScale, MIN_SCALE);
      // avoid re-render (and re-trigger) for imperceptible float differences
      return Math.abs(prev - clamped) < 0.005 ? prev : clamped;
    });
  }, []);

  useEffect(() => {
    recalc();

    // Only observe the page container (viewport), NOT the scaled content.
    const ro = new ResizeObserver(() => recalc());
    if (pageRef.current) ro.observe(pageRef.current);

    window.addEventListener("resize", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { pageRef, innerRef, scale };
}
