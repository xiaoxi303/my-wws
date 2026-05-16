import type { Project } from "@/data/projects";

type ProjectNarrativeProps = {
  project: Project;
};

export default function ProjectNarrative({ project }: ProjectNarrativeProps) {
  return (
    <section className="section-pad grid gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-32">
      <aside className="h-fit border-y border-white/[0.14] py-6 lg:sticky lg:top-28">
        <p className="eyebrow text-neutral-400">Project Index</p>
        <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-none sm:text-6xl">
          {project.title}
        </h2>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-400">
          {project.description}
        </p>
      </aside>

      <div className="grid gap-5">
        {project.narrative.map((block, index) => (
          <article
            key={`${project.slug}-${block.kicker}`}
            data-reveal
            data-drift={index % 2 === 1 ? "" : undefined}
            className="min-h-[62vh] border-t border-white/[0.14] py-8 sm:py-10"
          >
            <div className="mb-12 flex items-center justify-between gap-6">
              <p className="eyebrow text-neutral-400">{block.kicker}</p>
              {block.stat ? (
                <p className="font-display text-5xl font-bold uppercase leading-none text-white sm:text-7xl">
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
          </article>
        ))}
      </div>
    </section>
  );
}
