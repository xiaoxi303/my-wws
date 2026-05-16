"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";
import { uiText } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export default function ManifestoSection() {
  const rootRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const text = uiText[lang].about;

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();

    const context = gsap.context(() => {
      gsap.set("[data-about-line] span", { yPercent: 112 });
      gsap.set("[data-about-tag]", { autoAlpha: 0, y: 18 });
      gsap.set("[data-about-copy]", { autoAlpha: 0, y: 28 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 68%",
            end: "bottom 45%",
            scrub: 1,
            onUpdate: (self) => {
              window.dispatchEvent(
                new CustomEvent("section:active", { detail: { id: "about" } })
              );
              window.dispatchEvent(
                new CustomEvent("webgl:about", {
                  detail: { progress: self.progress }
                })
              );
            },
            onLeaveBack: () => {
              window.dispatchEvent(
                new CustomEvent("webgl:about", { detail: { progress: 0 } })
              );
            }
          }
        })
        .to("[data-about-line] span", {
          yPercent: 0,
          stagger: 0.12,
          duration: 0.5,
          ease: "power4.out"
        })
        .to(
          "[data-about-tag]",
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.24,
            ease: "power2.out"
          },
          "-=0.22"
        )
        .to(
          "[data-about-copy]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.34,
            ease: "power2.out"
          },
          "-=0.16"
        );

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 0.08 && self.progress < 0.94) {
            window.dispatchEvent(
              new CustomEvent("section:active", { detail: { id: "about" } })
            );
          }
          window.dispatchEvent(
            new CustomEvent("webgl:about", {
              detail: { progress: Math.max(self.progress, 0.02) }
            })
          );
        }
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className="section-pad relative min-h-screen border-y border-white/[0.12] py-24 sm:py-36"
    >
      <div className="grid min-h-[70vh] gap-14 lg:grid-cols-[1fr_0.54fr] lg:items-end">
        <div>
          <p className="eyebrow mb-8 text-neutral-500">{text.kicker}</p>
          <h2 className="max-w-[13ch] font-display text-[15vw] font-black uppercase leading-[0.82] tracking-normal sm:text-[10vw] lg:text-[8.4vw]">
            {text.lines.map((line) => (
              <span
                key={line}
                data-about-line
                className="clip-text-line block"
              >
                <span>{line}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="max-w-xl lg:pb-4">
          <p
            data-about-copy
            className="text-xl leading-relaxed text-neutral-300 sm:text-2xl"
          >
            {text.copy}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {text.tags.map((tag) => (
              <span
                key={tag}
                data-about-tag
                className="rounded-full border border-white/[0.18] px-4 py-2 text-[0.68rem] font-bold uppercase text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
