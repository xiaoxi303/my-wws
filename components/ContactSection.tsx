"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";
import { uiText } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export default function ContactSection() {
  const rootRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const text = uiText[lang].contact;

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-word]",
        { autoAlpha: 0, yPercent: 112 },
        {
          autoAlpha: 1,
          yPercent: 0,
          stagger: 0.045,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 62%"
          }
        }
      );

      gsap.fromTo(
        "[data-contact-fade]",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 58%"
          }
        }
      );

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 0.12) {
            window.dispatchEvent(
              new CustomEvent("section:active", { detail: { id: "contact" } })
            );
          }
          window.dispatchEvent(
            new CustomEvent("webgl:contact", {
              detail: { progress: self.progress }
            })
          );
        },
        onLeaveBack: () => {
          window.dispatchEvent(
            new CustomEvent("webgl:contact", { detail: { progress: 0 } })
          );
        }
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  const words = text.title.split(" ");

  return (
    <section
      id="contact"
      ref={rootRef}
      className="section-pad relative flex min-h-screen flex-col justify-end overflow-hidden border-t border-white/[0.12] pb-6 pt-28"
    >
      <div className="max-w-[86rem]">
        <p data-contact-fade className="eyebrow mb-8 text-neutral-500">
          {text.kicker}
        </p>
        <h2 className="font-display text-[16vw] font-black uppercase leading-[0.82] tracking-normal sm:text-[10vw] lg:text-[7.2vw]">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="clip-text-line mr-[0.18em] inline-block"
            >
              <span data-contact-word className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p
            data-contact-fade
            className="max-w-2xl text-xl leading-relaxed text-neutral-300 sm:text-2xl"
          >
            {text.copy}
          </p>
          <a
            data-contact-fade
            data-cursor="large"
            data-cursor-label="Send"
            href="mailto:studio@nullform.example"
            className="liquid-button inline-flex h-32 w-32 items-center justify-center rounded-full border border-white bg-white text-center text-xs font-black uppercase leading-tight text-black sm:h-40 sm:w-40"
          >
            {text.button}
          </a>
        </div>
      </div>

      <footer
        data-contact-fade
        className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.14] pt-5 text-[0.68rem] font-bold uppercase text-neutral-500"
      >
        <span>NULLFORM Studio</span>
        <span>{text.footer}</span>
        <span>2026</span>
      </footer>
    </section>
  );
}
