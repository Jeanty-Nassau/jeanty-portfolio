import Link from "next/link";

import type { Project } from "@/types/project";

type ProjectRowProps = {
  project: Project;
  index: number;
};

export function ProjectRow({
  project,
  index,
}: ProjectRowProps) {
  return (
    <article className="group border-b border-ink/15 transition-colors duration-300 hover:border-cobalt hover:bg-cobalt">
      <Link
        href={`/work/${project.slug}`}
        className="grid gap-8 px-0 py-10 transition-[padding] duration-300 group-hover:px-5 lg:grid-cols-12 lg:items-start"
      >
        <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-ink/40 transition-colors duration-300 group-hover:text-orange lg:col-span-1">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="lg:col-span-5">
          <h2 className="text-3xl font-medium tracking-[-0.035em] transition-all duration-300 group-hover:translate-x-1 group-hover:text-paper md:text-4xl">
            {project.title}
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-ink/60 transition-colors duration-300 group-hover:text-paper/75">
            {project.summary}
          </p>
        </div>

        <div className="lg:col-span-3">
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/45 transition-colors duration-300 group-hover:text-orange"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {project.metrics?.slice(0, 1).map((metric) => (
            <div key={metric.label}>
              <p className="text-xl font-medium transition-colors duration-300 group-hover:text-paper">
                {metric.value}
              </p>

              <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40 transition-colors duration-300 group-hover:text-paper/55">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end lg:col-span-1">
          <span
            className="text-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-orange"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>
      </Link>
    </article>
  );
}
