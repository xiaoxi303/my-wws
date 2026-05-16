"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  getProjectCopy,
  type Project,
  type ProjectMedia
} from "@/data/projects";
import { uiText } from "@/lib/i18n";
import { registerGsap } from "@/lib/gsap";
import { useLanguage } from "@/components/LanguageProvider";
import ProjectCard from "@/components/ProjectCard";

type ProjectCasePageProps = {
  project: Project;
  related: Project[];
};

function MediaBlock({
  media,
  index,
  lang
}: {
  media: ProjectMedia;
  index: number;
  lang: "en" | "zh";
}) {
  const caption = lang === "en" ? media.caption : media.captionZh;
  const aspect =
    media.layout === "tall"
      ? "aspect-[4/5]"
      : media.layout === "square"
        ? "aspect-square"
        : "aspect-[16/9]";

  return (
    <article
      data-case-media
      className={`case-media group ${index % 2 === 1 ? "lg:mt-28" : ""}`}
    >
      <div className={`relative overflow-hidden bg-neutral-950 ${aspect}`}>
        {media.type === "video" ? (
          <video
            className="h-full w-full object-cover grayscale"
            src={media.src}
            poster={media.poster}
            muted
            loop
            playsInline
            controls
            preload="metadata"
          />
        ) : (
          <Image
            src={media.src}
            alt={caption}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/[0.18] bg-black/[0.35] px-3 py-1 text-[0.62rem] font-black uppercase text-white backdrop-blur">
          {media.type === "video" ? "Video" : "Image"} /{" "}
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-400">
        {caption}
      </p>
    </article>
  );
}

export default function ProjectCasePage({
  project,
  related
}: ProjectCasePageProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [activeMedia, setActiveMedia] = useState(0);
  const { lang } = useLanguage();
  const copy = getProjectCopy(project, lang);
  const text = uiText[lang].case;

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();

    const context = gsap.context(() => {
      gsap.set("[data-case-line] span", { yPercent: 112 });
      gsap.set("[data-case-fade]", { autoAlpha: 0, y: 30 });
      gsap.set("[data-case-media]", {
        autoAlpha: 0,
        y: 80,
        clipPath: "inset(12% 10% 12% 10%)"
      });

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to("[data-case-line] span", {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.08
        })
        .to(
          "[data-case-fade]",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.07
          },
          "-=0.72"
        );

      gsap.utils.toArray<HTMLElement>("[data-case-media]").forEach((item, index) => {
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 78%",
            onEnter: () => setActiveMedia(index),
            onEnterBack: () => setActiveMedia(index)
          }
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-case-reveal]").forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%"
            }
          }
        );
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => context.revert();
  }, [project.slug]);

  return (
    <main ref={rootRef} className="relative z-10">
      <section className="section-pad flex min-h-screen items-end pb-8 pt-32 sm:pt-40">
        <div className="w-full">
          <Link
            data-case-fade
            href="/#projects"
            className="mb-8 inline-flex rounded-full border border-white/[0.18] px-4 py-2 text-[0.68rem] font-black uppercase text-neutral-300 transition-colors duration-300 hover:border-white hover:text-white"
          >
            {text.back}
          </Link>

          <div
            data-case-fade
            className="project-meta-grid mb-10 border-y border-white/[0.14] text-[0.68rem] font-black uppercase text-neutral-400"
          >
            <div className="border-r border-white/[0.14] p-3 sm:p-5">
              <p className="text-white">{text.year}</p>
              <p className="mt-2">{copy.year}</p>
            </div>
            <div className="border-r border-white/[0.14] p-3 sm:p-5">
              <p className="text-white">{text.type}</p>
              <p className="mt-2">{copy.type}</p>
            </div>
            <div className="border-r border-white/[0.14] p-3 sm:p-5">
              <p className="text-white">{text.category}</p>
              <p className="mt-2">{copy.category}</p>
            </div>
            <div className="p-3 sm:p-5">
              <p className="text-white">{text.stack}</p>
              <p className="mt-2">{copy.stack.slice(0, 2).join(" / ")}</p>
            </div>
          </div>

          <h1 className="display-massive max-w-[12ch] uppercase">
            {copy.title.split(" ").map((word, index) => (
              <span
                key={`${word}-${index}`}
                data-case-line
                className="clip-text-line mr-[0.18em] inline-block"
              >
                <span>{word}</span>
              </span>
            ))}
          </h1>
        </div>
      </section>

      <section className="section-pad">
        <div
          data-case-media
          className="relative aspect-[4/5] overflow-hidden bg-neutral-900 sm:aspect-[16/9]"
        >
          <Image
            src={project.cover}
            alt={copy.title}
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/[0.18]" />
        </div>
      </section>

      <section className="section-pad grid gap-10 border-b border-white/[0.14] py-14 lg:grid-cols-[0.72fr_1.28fr]">
        <div data-case-reveal>
          <p className="eyebrow text-neutral-500">{text.overview}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-400">
            {copy.subtitle}
          </p>
        </div>
        <div data-case-reveal>
          <p className="max-w-5xl text-2xl leading-tight text-neutral-200 sm:text-5xl">
            {copy.intro}
          </p>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-neutral-400 sm:text-xl">
            {copy.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {copy.services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-white/[0.16] px-4 py-2 text-xs font-black uppercase text-neutral-300"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad grid gap-10 py-20 lg:grid-cols-[0.78fr_1.22fr] lg:py-32">
        <aside className="h-fit border-y border-white/[0.14] py-6 lg:sticky lg:top-28">
          <p className="eyebrow text-neutral-500">{text.index}</p>
          <h2 className="mt-5 font-display text-4xl font-black uppercase leading-none sm:text-6xl">
            {copy.title}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-400">
            {copy.description}
          </p>
        </aside>

        <div className="grid gap-5">
          {copy.narrative.map((block, index) => (
            <article
              key={`${project.slug}-${block.kicker}`}
              data-case-reveal
              className="min-h-[62vh] border-t border-white/[0.14] py-8 sm:py-10"
            >
              <div className="mb-12 flex items-center justify-between gap-6">
                <p className="eyebrow text-neutral-400">{block.kicker}</p>
                {block.stat ? (
                  <p className="font-display text-5xl font-black uppercase leading-none text-white sm:text-7xl">
                    {block.stat}
                  </p>
                ) : null}
              </div>

              <h3 className="display-medium max-w-4xl uppercase text-balance">
                {block.title}
              </h3>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-xl">
                {block.body}
              </p>
              <p className="mt-10 text-[0.68rem] font-black uppercase text-neutral-600">
                {String(index + 1).padStart(2, "0")} /{" "}
                {copy.narrative.length.toString().padStart(2, "0")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad border-y border-white/[0.14] py-20 sm:py-32">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.68fr_1fr] lg:items-end">
          <div data-case-reveal>
            <p className="eyebrow text-neutral-500">{text.mediaSystem}</p>
            <h2 className="mt-5 max-w-[10ch] font-display text-[14vw] font-black uppercase leading-[0.84] tracking-normal sm:text-[8vw] lg:text-[5.8vw]">
              {text.gallery}
            </h2>
          </div>
          <div data-case-reveal className="lg:justify-self-end">
            <p className="max-w-lg text-lg leading-relaxed text-neutral-300">
              {text.play} / {text.images} / {String(activeMedia + 1).padStart(2, "0")}
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {project.media.map((media, index) => (
            <MediaBlock
              key={`${media.src}-${index}`}
              media={media}
              index={index}
              lang={lang}
            />
          ))}
        </div>
      </section>

      <section className="section-pad border-t border-white/[0.14] py-20 sm:py-28">
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-black uppercase leading-none sm:text-7xl">
            {text.next}
          </h2>
          <Link
            href="/#projects"
            className="rounded-full border border-white/20 px-5 py-3 text-xs font-black uppercase transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            {text.allProjects}
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((item, index) => (
            <ProjectCard key={item.slug} project={item} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
