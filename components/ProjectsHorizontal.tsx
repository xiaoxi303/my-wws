"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getProjectCopy, projects } from "@/data/projects";
import { registerGsap } from "@/lib/gsap";
import { uiText } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";

export default function ProjectsHorizontal() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const text = uiText[lang].projects;

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();

    const context = gsap.context(() => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.1);

      const horizontalTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            window.dispatchEvent(
              new CustomEvent("section:active", { detail: { id: "projects" } })
            );
          }
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-horizontal-card]").forEach((card) => {
        const media = card.querySelector("[data-project-media]");
        const meta = card.querySelector("[data-project-meta]");

        gsap.fromTo(
          card,
          {
            autoAlpha: 0,
            scale: 0.86,
            clipPath: "inset(16% 18% 16% 18%)"
          },
          {
            autoAlpha: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 88%",
              end: "left 48%",
              scrub: true
            }
          }
        );

        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.16 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                scrub: true
              }
            }
          );
        }

        if (meta) {
          gsap.fromTo(
            meta,
            { y: 42, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 76%",
                end: "left 55%",
                scrub: true
              }
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={rootRef}
      className="projects-horizontal relative overflow-clip border-y border-white/[0.12]"
    >
      <div
        ref={pinRef}
        className="section-pad flex h-screen flex-col justify-between overflow-hidden pb-10 pt-28 sm:pb-12 sm:pt-32"
      >
        <div className="grid gap-7 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-neutral-500">{text.kicker}</p>
            <h2 className="mt-5 font-display text-[14vw] font-black uppercase leading-[0.84] tracking-normal sm:text-[8vw] lg:text-[5.2vw]">
              {text.title}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-2xl lg:justify-self-end">
            {text.copy}
          </p>
        </div>

        <div
          ref={trackRef}
          className="flex w-max items-end gap-5 pb-2 sm:gap-8"
        >
          {projects.map((project, index) => {
            const copy = getProjectCopy(project, lang);

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                data-horizontal-card
                data-cursor="large"
                data-cursor-label={lang === "en" ? "View" : "查看"}
                className="horizontal-card group block w-[76vw] max-w-[30rem] shrink-0 sm:w-[48vw] lg:w-[28vw]"
              >
                <div className="relative aspect-[5/6] overflow-hidden bg-neutral-950">
                  <Image
                    data-project-media
                    src={project.cover}
                    alt={copy.title}
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 76vw, (max-width: 1200px) 48vw, 28vw"
                    className="object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/[0.16] transition-opacity duration-500 group-hover:opacity-30" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/[0.2] bg-black/[0.28] px-3 py-1 text-[0.64rem] font-bold uppercase text-white backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute right-4 top-4 rounded-full border border-white/[0.18] bg-black/[0.22] px-3 py-1 text-[0.64rem] font-bold uppercase text-white backdrop-blur">
                    {project.media.some((media) => media.type === "video")
                      ? "Video / Image"
                      : text.media}
                  </div>
                  <div className="view-case absolute bottom-4 right-4 translate-y-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="rounded-full bg-white px-4 py-2 text-[0.68rem] font-black uppercase text-black">
                      {text.viewCase}
                    </span>
                  </div>
                </div>

                <div
                  data-project-meta
                  className="grid grid-cols-[1fr_auto] gap-6 border-b border-white/[0.16] py-5 transition-transform duration-500 group-hover:-translate-y-2"
                >
                  <div>
                    <h3 className="font-display text-3xl font-black uppercase leading-none tracking-normal sm:text-5xl">
                      {copy.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
                      {copy.type}
                    </p>
                  </div>
                  <div className="text-right text-[0.68rem] font-bold uppercase text-neutral-400">
                    <p>{copy.year}</p>
                    <p className="mt-2">{copy.category}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
