import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { categories, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects"
};

export default function ProjectsPage() {
  return (
    <>
      <section className="section-pad flex min-h-[72vh] items-end pb-12 pt-32 sm:pt-40">
        <div className="grid w-full gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p data-reveal className="eyebrow mb-6 text-neutral-400">
              Indexed portfolio
            </p>
            <h1 className="display-massive max-w-[10ch] uppercase">
              <span data-reveal-line className="clip-text-line block">
                <span>Selected</span>
              </span>
              <span data-reveal-line className="clip-text-line block">
                <span>Projects</span>
              </span>
            </h1>
          </div>
          <p
            data-reveal
            className="max-w-xl text-xl leading-relaxed text-neutral-300"
          >
            A grid of identities, interactive launches, motion-led archives,
            and commerce systems. Filter by discipline or enter the full case
            study.
          </p>
        </div>
      </section>
      <ProjectGrid projects={projects} categories={categories} />
    </>
  );
}
