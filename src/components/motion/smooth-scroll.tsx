"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Lenis from "lenis";

const LenisContext =
  createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef =
    useRef<Lenis | null>(null);
  const [lenis, setLenis] =
    useState<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reducedMotion) {
      return;
    }

    const instance = new Lenis({
      duration: 1.2,
      smoothWheel: true,

      easing: (t) =>
        Math.min(
          1,
          1.001 -
            Math.pow(
              2,
              -10 * t,
            ),
        ),
    });

    lenisRef.current = instance;

    const stateUpdateId =
      window.setTimeout(() => {
        setLenis(instance);
      }, 0);

    let frameId = 0;

    const raf = (
      time: number,
    ) => {
      instance.raf(time);

      frameId =
        requestAnimationFrame(raf);
    };

    frameId =
      requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(stateUpdateId);

      instance.destroy();

      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}