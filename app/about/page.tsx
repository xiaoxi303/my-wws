import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About"
};

const principles = [
  {
    label: "01",
    title: "Reduction with pressure",
    body: "The work is stripped back, but never empty. Scale, pace, type, and contrast carry the feeling."
  },
  {
    label: "02",
    title: "Motion as structure",
    body: "Animation clarifies hierarchy, direction, and tension. It is part of the information design."
  },
  {
    label: "03",
    title: "Systems that publish",
    body: "Every portfolio and campaign is built so teams can keep adding work without losing the art direction."
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="section-pad flex min-h-screen items-end pb-12 pt-32">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h1 className="display-massive max-w-[9ch] uppercase">
            <span data-reveal-line className="clip-text-line block">
              <span>About</span>
            </span>
            <span data-reveal-line className="clip-text-line block">
              <span>the</span>
            </span>
            <span data-reveal-line className="clip-text-line block">
              <span>Studio</span>
            </span>
          </h1>
          <div data-reveal className="max-w-2xl">
            <p className="text-2xl leading-tight text-neutral-200 sm:text-4xl">
              NULLFORM is a small digital direction practice creating stark
              identities, expressive interfaces, and portfolio systems for
              culture, design, technology, and commerce.
            </p>
          </div>
        </div>
      </section>

      <section className="marquee-mask py-6">
        <div
          data-title-marquee
          className="display-large flex w-max gap-8 whitespace-nowrap uppercase"
        >
          <span>Direction / Systems / Motion</span>
          <span aria-hidden="true">Direction / Systems / Motion</span>
        </div>
      </section>

      <section className="section-pad grid gap-12 py-20 sm:py-32 lg:grid-cols-[0.85fr_1.15fr]">
        <div data-reveal className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow text-neutral-400">Operating Method</p>
          <h2 className="mt-6 font-display text-5xl font-bold uppercase leading-none sm:text-7xl">
            Sharp enough to feel inevitable.
          </h2>
        </div>

        <div className="grid gap-0 border-t border-white/[0.14]">
          {principles.map((principle) => (
            <article
              key={principle.label}
              data-reveal
              className="grid gap-8 border-b border-white/[0.14] py-10 sm:grid-cols-[6rem_1fr]"
            >
              <p className="font-display text-4xl font-bold leading-none text-neutral-500">
                {principle.label}
              </p>
              <div>
                <h3 className="font-display text-3xl font-bold uppercase leading-none sm:text-5xl">
                  {principle.title}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                  {principle.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
