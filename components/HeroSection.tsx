"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";
import { uiText } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const text = uiText[lang].hero;

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();

    const context = gsap.context(() => {
      gsap.set("[data-hero-line] span", { yPercent: 115 });
      gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 24 });
      gsap.set("[data-manifesto-word]", { autoAlpha: 0, yPercent: 120 });

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to("[data-hero-line] span", {
          yPercent: 0,
          duration: 1.22,
          stagger: 0.11
        })
        .to(
          "[data-hero-fade]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08
          },
          "-=0.74"
        );

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          onUpdate: (self) => {
            window.dispatchEvent(
              new CustomEvent("section:active", { detail: { id: "home" } })
            );
            window.dispatchEvent(
              new CustomEvent("webgl:hero", {
                detail: { progress: self.progress }
              })
            );
          },
          onLeaveBack: () => {
            window.dispatchEvent(
              new CustomEvent("webgl:hero", { detail: { progress: 0 } })
            );
          }
        }
      });

      timeline
        .to(
          "[data-hero-title]",
          {
            scale: 0.46,
            xPercent: -18,
            yPercent: -28,
            autoAlpha: 0.04,
            transformOrigin: "left bottom",
            ease: "none"
          },
          0
        )
        .to(
          "[data-hero-kicker]",
          {
            y: -90,
            autoAlpha: 0,
            ease: "none"
          },
          0.05
        )
        .to(
          "[data-hero-copy]",
          {
            y: -84,
            autoAlpha: 0,
            ease: "none"
          },
          0.08
        )
        .to(
          "[data-hero-actions]",
          {
            y: -42,
            autoAlpha: 0,
            ease: "none"
          },
          0.12
        )
        .to(
          "[data-star-parallax]",
          {
            yPercent: -10,
            autoAlpha: 0.5,
            ease: "none"
          },
          0
        )
        .to(
          "[data-manifesto]",
          {
            autoAlpha: 1,
            ease: "none"
          },
          0.54
        )
        .to(
          "[data-manifesto-word]",
          {
            autoAlpha: 1,
            yPercent: 0,
            stagger: 0.055,
            duration: 0.34,
            ease: "power3.out"
          },
          0.62
        );

      ScrollTrigger.refresh();
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="section-pad relative h-[250vh] overflow-clip"
    >
      <div
        ref={pinRef}
        className="hero-stage relative flex h-screen items-end overflow-hidden pb-8 pt-28 sm:pb-10"
      >
        <div
          data-star-parallax
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.10),transparent_28rem)]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black via-black/[0.8] to-transparent" />

        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-end">
          <div>
            <p
              data-hero-fade
              data-hero-kicker
              className="eyebrow mb-5 max-w-xs text-neutral-400 sm:mb-7"
            >
              {text.kicker}
            </p>
            <h1
              data-hero-title
              className="hero-title max-w-[12ch] font-display text-[18vw] font-black uppercase leading-[0.78] tracking-normal sm:text-[16vw] lg:text-[14vw]"
            >
              {text.title.map((line) => (
                <span key={line} data-hero-line className="clip-text-line block">
                  <span>{line}</span>
                </span>
              ))}
            </h1>
          </div>

          <div className="grid gap-7 pb-2 lg:justify-items-end">
            <p
              data-hero-fade
              data-hero-copy
              className="max-w-sm text-lg leading-relaxed text-neutral-300 sm:text-xl"
            >
              {text.copy}
            </p>

            <div
              data-hero-fade
              data-hero-actions
              className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase"
            >
              <button
                type="button"
                onClick={() => window.__lenis?.scrollTo("#projects")}
                className="liquid-button rounded-full bg-neutral-100 px-5 py-3 text-black"
              >
                {text.primary}
              </button>
              <button
                type="button"
                onClick={() => window.__lenis?.scrollTo("#contact")}
                className="rounded-full border border-white/20 px-5 py-3 text-white transition-colors duration-300 hover:border-white"
              >
                {text.secondary}
              </button>
            </div>
          </div>
        </div>

        <div
          data-manifesto
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 opacity-0"
        >
          <p className="max-w-[14ch] text-center font-display text-[15vw] font-black uppercase leading-[0.86] tracking-normal sm:text-[10vw] lg:text-[8.6vw]">
            {text.manifesto.split(" ").map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="clip-text-line mr-[0.18em] inline-block"
              >
                <span data-manifesto-word className="inline-block">
                  {word}
                </span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
