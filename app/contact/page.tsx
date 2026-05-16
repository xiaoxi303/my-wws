import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <section className="section-pad flex min-h-screen items-end pb-12 pt-32">
      <div className="grid w-full gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p data-reveal className="eyebrow mb-6 text-neutral-400">
            New commissions / Portfolio systems / Campaign launches
          </p>
          <h1 className="display-massive max-w-[9ch] uppercase">
            <span data-reveal-line className="clip-text-line block">
              <span>Send</span>
            </span>
            <span data-reveal-line className="clip-text-line block">
              <span>the</span>
            </span>
            <span data-reveal-line className="clip-text-line block">
              <span>Brief</span>
            </span>
          </h1>
        </div>

        <div data-reveal className="max-w-xl">
          <p className="text-2xl leading-tight text-neutral-200 sm:text-4xl">
            For identity systems, immersive portfolio sites, and digital
            launches with a harder editorial edge.
          </p>

          <div className="mt-10 grid gap-3 border-y border-white/[0.14] py-6 text-sm uppercase text-neutral-300">
            <a
              href="mailto:studio@nullform.example"
              className="flex items-center justify-between gap-5 py-3 transition-colors duration-300 hover:text-white"
            >
              <span>Email</span>
              <span>studio@nullform.example</span>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-5 py-3 transition-colors duration-300 hover:text-white"
            >
              <span>Network</span>
              <span>LinkedIn</span>
            </a>
          </div>

          <Link
            href="/projects"
            className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-xs font-bold uppercase text-black transition-transform duration-300 hover:scale-95"
          >
            Review Work
          </Link>
        </div>
      </div>
    </section>
  );
}
