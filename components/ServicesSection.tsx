"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { registerGsap } from "@/lib/gsap";
import { uiText } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export default function ServicesSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { lang } = useLanguage();
  const text = uiText[lang].services;

  useEffect(() => {
    const { gsap } = registerGsap();

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-service-row]",
        { autoAlpha: 0, y: 54 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 68%"
          }
        }
      );
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="services"
      ref={rootRef}
      className="section-pad relative min-h-screen py-24 sm:py-36"
    >
      <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow text-neutral-500">{text.kicker}</p>
          <h2 className="mt-6 max-w-[8ch] font-display text-[14vw] font-black uppercase leading-[0.82] tracking-normal sm:text-[8vw] lg:text-[5.7vw]">
            {text.title}
          </h2>
        </div>

        <div className="grid gap-0 border-t border-white/[0.14]">
          {services.map((service, index) => {
            const isActive = active === index;

            return (
              <button
                key={service.title}
                data-service-row
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="service-row group grid w-full gap-5 border-b border-white/[0.14] py-7 text-left transition-colors duration-300 sm:grid-cols-[1fr_0.9fr] sm:py-9"
              >
                <span className="flex items-baseline gap-5">
                  <span className="text-[0.68rem] font-bold uppercase text-neutral-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-4xl font-black uppercase leading-none tracking-normal text-white transition-transform duration-500 group-hover:translate-x-3 sm:text-6xl">
                    {lang === "en" ? service.title : service.titleZh}
                  </span>
                </span>
                <span
                  className={`max-w-xl text-base leading-relaxed transition-all duration-500 sm:justify-self-end ${
                    isActive
                      ? "translate-y-0 text-neutral-200 opacity-100"
                      : "translate-y-2 text-neutral-500 opacity-45"
                  }`}
                >
                  {lang === "en" ? service.description : service.descriptionZh}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
