"use client";

import { useEffect } from "react";
import { registerGsap } from "@/lib/gsap";
import { createLenis } from "@/lib/lenis";
import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    const lenis = createLenis();
    window.__lenis = lenis;

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    document.documentElement.classList.add("lenis", "lenis-smooth");

    return () => {
      if (window.__lenis === lenis) {
        window.__lenis = undefined;
      }
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return null;
}
