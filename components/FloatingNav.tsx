"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { registerGsap } from "@/lib/gsap";
import { uiText } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

type SectionId = "home" | "projects" | "about" | "contact";

const sectionIndexes: Record<SectionId, string> = {
  home: "01",
  projects: "02",
  about: "03",
  contact: "04"
};

const menuItems: Array<{
  id: SectionId | "services";
  labelKey: "projects" | "about" | "services" | "contact";
  index: string;
}> = [
  { id: "projects", labelKey: "projects", index: "01" },
  { id: "about", labelKey: "about", index: "02" },
  { id: "services", labelKey: "services", index: "03" },
  { id: "contact", labelKey: "contact", index: "04" }
];

function isSectionId(value: string): value is SectionId {
  return value === "home" || value === "projects" || value === "about" || value === "contact";
}

export default function FloatingNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, toggleLang } = useLanguage();
  const text = uiText[lang];
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState<SectionId>("home");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();

    const handleActive = (event: Event) => {
      const detail = (event as CustomEvent<{ id: string }>).detail;

      if (detail?.id && isSectionId(detail.id)) {
        setActive(detail.id);
      }
    };

    window.addEventListener("section:active", handleActive);

    const context = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { autoAlpha: 0, y: -18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.32
        }
      );

      ScrollTrigger.create({
        start: 8,
        end: "max",
        onUpdate: (self) => {
          const scroll = self.scroll();
          setScrolled(scroll > 24);

          if (!openRef.current) {
            setHidden(scroll > 140 && self.direction === 1);
            if (self.direction === -1) {
              setHidden(false);
            }
          }
        }
      });

      Object.keys(sectionIndexes).forEach((id) => {
        const section = document.getElementById(id);

        if (!section || !isSectionId(id)) {
          return;
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(id),
          onEnterBack: () => setActive(id)
        });
      });

      gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set("[data-menu-item]", { autoAlpha: 0, yPercent: 115 });
      gsap.set("[data-menu-meta]", { autoAlpha: 0, y: 22 });

      menuTimeline.current = gsap
        .timeline({ paused: true, defaults: { ease: "power4.out" } })
        .to(overlayRef.current, {
          autoAlpha: 1,
          pointerEvents: "auto",
          duration: 0.48
        })
        .fromTo(
          "[data-menu-backdrop]",
          { autoAlpha: 0 },
          { autoAlpha: 0.5, duration: 0.48 },
          0
        )
        .to(
          "[data-menu-item]",
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.95,
            stagger: 0.085
          },
          0.12
        )
        .to(
          "[data-menu-meta]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.06
          },
          0.36
        );
    });

    return () => {
      window.removeEventListener("section:active", handleActive);
      context.revert();
    };
  }, [pathname]);

  useEffect(() => {
    const timeline = menuTimeline.current;
    openRef.current = open;

    if (!timeline) {
      return;
    }

    if (open) {
      setHidden(false);
      document.documentElement.classList.add("menu-open");
      timeline.play();
    } else {
      document.documentElement.classList.remove("menu-open");
      timeline.reverse();
    }

    return () => {
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  useEffect(() => {
    const { gsap } = registerGsap();

    gsap.to(headerRef.current, {
      yPercent: hidden && !open ? -130 : 0,
      duration: 0.55,
      ease: "power3.out"
    });
  }, [hidden, open]);

  const scrollToSection = (id: string) => {
    setOpen(false);

    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }

    const target = document.getElementById(id);

    if (!target) {
      return;
    }

    window.__lenis?.scrollTo(target, {
      duration: 1.35,
      easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time))
    });
  };

  const statusLabel = text.nav.status[active];
  const statusIndex = sectionIndexes[active];

  return (
    <>
      <header
        ref={headerRef}
        className={`creative-nav fixed inset-x-0 top-0 z-[90] px-4 pt-4 opacity-0 transition-[transform,padding] duration-500 sm:px-8 ${
          scrolled ? "is-scrolled pt-3" : ""
        } ${hidden ? "is-hidden" : ""} ${open ? "is-open" : ""}`}
      >
        <div className="creative-nav-inner mx-auto grid max-w-[92rem] grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-full px-2 py-2 transition-all duration-500">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="creative-nav-word justify-self-start px-2 text-left text-[0.68rem] font-black uppercase leading-none sm:px-3"
          >
            {text.nav.brand}
          </button>

          <div className="creative-nav-status rounded-full px-3 py-2 text-center text-[0.66rem] font-black uppercase leading-none sm:px-5">
            {statusLabel} / {statusIndex}
          </div>

          <div className="flex items-center gap-2 justify-self-end">
            <button
              type="button"
              onClick={toggleLang}
              className="creative-lang-button rounded-full border px-4 py-3 text-[0.68rem] font-black uppercase leading-none transition-transform duration-300 hover:scale-95"
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
              className="creative-menu-button rounded-full border px-5 py-3 text-[0.68rem] font-black uppercase leading-none transition-transform duration-300 hover:scale-95"
            >
              {open ? text.nav.close : text.nav.menu}
            </button>
          </div>
        </div>
      </header>

      <div
        id="site-menu"
        ref={overlayRef}
        className="menu-overlay fixed inset-0 z-[80] overflow-hidden bg-black text-white"
        aria-hidden={!open}
      >
        <div
          data-menu-backdrop
          className="pointer-events-none absolute inset-0 bg-black opacity-0"
        />
        <div className="section-pad relative flex min-h-screen flex-col justify-end pb-7 pt-28 sm:pb-10">
          <div className="mb-auto grid gap-10 pt-20 lg:grid-cols-[0.35fr_1fr] lg:pt-24">
            <p
              data-menu-meta
              className="eyebrow max-w-[14rem] text-neutral-500"
            >
              {text.nav.overlayKicker}
            </p>

            <nav aria-label="Menu navigation" className="grid gap-0">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="menu-link group grid grid-cols-[3rem_1fr] items-end border-b border-white/[0.14] py-3 text-left sm:grid-cols-[5rem_1fr] sm:py-4"
                >
                  <span className="pb-2 text-[0.72rem] font-black uppercase text-neutral-500">
                    {item.index}
                  </span>
                  <span className="clip-text-line">
                    <span
                      data-menu-item
                      className="inline-block font-display text-[15vw] font-black uppercase leading-[0.84] tracking-normal transition-transform duration-500 group-hover:translate-x-8 sm:text-[9vw] lg:text-[7vw]"
                    >
                      {item.labelKey === "services"
                        ? lang === "en"
                          ? "SERVICES"
                          : "服务"
                        : text.nav.status[item.labelKey]}
                    </span>
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="grid gap-8 border-t border-white/[0.14] pt-5 text-[0.68rem] font-black uppercase text-neutral-400 sm:grid-cols-[1fr_auto_auto] sm:items-end">
            <a
              data-menu-meta
              href="mailto:studio@nullform.example"
              className="transition-colors duration-300 hover:text-white"
            >
              {text.nav.email}
            </a>
            <div data-menu-meta className="flex gap-4 sm:justify-end">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-300 hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-300 hover:text-white"
              >
                Instagram
              </a>
            </div>
            <span data-menu-meta className="sm:text-right">
              2026
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
