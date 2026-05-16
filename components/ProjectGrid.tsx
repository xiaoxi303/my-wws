"use client";

import { useEffect, useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { registerGsap } from "@/lib/gsap";
import type { Project } from "@/data/projects";

type ProjectGridProps = {
  projects: Project[];
  categories: readonly string[];
};

export default function ProjectGrid({
  projects,
  categories
}: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  useEffect(() => {
    const { ScrollTrigger } = registerGsap();
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 80);

    return () => window.clearTimeout(timer);
  }, [activeCategory]);

  return (
    <section className="section-pad pb-24 sm:pb-32">
      <div
        data-reveal
        className="mb-12 flex flex-wrap items-center justify-between gap-5 border-y border-white/[0.14] py-4"
      >
        <p className="eyebrow text-neutral-400">
          {String(filteredProjects.length).padStart(2, "0")} indexed works
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-[0.68rem] font-semibold uppercase transition-colors duration-300 ${
                  active
                    ? "border-white bg-white text-black"
                    : "border-white/[0.18] text-neutral-300 hover:border-white/[0.6] hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div data-card-stack className="grid gap-x-6 gap-y-14 md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            priority={index < 2}
          />
        ))}
      </div>
    </section>
  );
}
