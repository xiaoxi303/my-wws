"use client";

import Image from "next/image";
import Link from "next/link";
import { getProjectCopy, type Project } from "@/data/projects";
import { useLanguage } from "@/components/LanguageProvider";

type ProjectCardProps = {
  project: Project;
  index?: number;
  priority?: boolean;
};

export default function ProjectCard({
  project,
  index = 0,
  priority = false
}: ProjectCardProps) {
  const { lang } = useLanguage();
  const copy = getProjectCopy(project, lang);

  return (
    <article
      data-stagger-card
      className={`distort-card group ${index % 2 === 1 ? "md:mt-24" : ""}`}
    >
      <Link href={`/projects/${project.slug}`} data-cursor="large">
        <div
          data-image-scale
          className="media-frame relative aspect-[4/5] overflow-hidden bg-neutral-900 sm:aspect-[5/6]"
        >
          <Image
            src={project.cover}
            alt={copy.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="scanline pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-white/30 to-transparent mix-blend-overlay" />
          <div className="pointer-events-none absolute inset-0 bg-black/10 mix-blend-multiply" />
          <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[0.62rem] font-semibold uppercase text-white backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-5 border-b border-white/[0.14] py-5">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase leading-none sm:text-4xl">
              {copy.title}
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
              {copy.subtitle}
            </p>
          </div>
          <div className="text-right text-[0.68rem] font-semibold uppercase text-neutral-400">
            <p>{project.year}</p>
            <p className="mt-2">{copy.category}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}
