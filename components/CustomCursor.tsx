"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    if (!dot || !ring || !label) {
      return;
    }

    const { gsap } = registerGsap();

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const moveDotX = gsap.quickTo(dot, "x", {
      duration: 0.12,
      ease: "power3.out"
    });
    const moveDotY = gsap.quickTo(dot, "y", {
      duration: 0.12,
      ease: "power3.out"
    });
    const moveRingX = gsap.quickTo(ring, "x", {
      duration: 0.42,
      ease: "power3.out"
    });
    const moveRingY = gsap.quickTo(ring, "y", {
      duration: 0.42,
      ease: "power3.out"
    });

    const handleMove = (event: PointerEvent) => {
      moveDotX(event.clientX);
      moveDotY(event.clientY);
      moveRingX(event.clientX);
      moveRingY(event.clientY);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>(
        "a, button, [data-cursor='large']"
      );

      if (interactive) {
        label.textContent = interactive.dataset.cursorLabel ?? "";
        ring.classList.add("is-active");
      }
    };

    const handleOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, [data-cursor='large']")) {
        label.textContent = "";
        ring.classList.remove("is-active");
      }
    };

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot blend-difference hidden md:block" />
      <div
        ref={ringRef}
        className="cursor-ring blend-difference hidden md:block"
      >
        <span ref={labelRef} />
      </div>
    </>
  );
}
