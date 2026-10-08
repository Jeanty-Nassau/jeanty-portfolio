import type { LabExperiment } from "@/types/lab-experiment";

type ExperimentCardProps = {
  experiment: LabExperiment;
  index: number;
};

export function ExperimentCard({
  experiment,
  index,
}: ExperimentCardProps) {
  return (
    <article className="group border-t border-paper/20 py-9">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="font-mono text-xs text-paper/35 lg:col-span-1">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="lg:col-span-6">
          {experiment.repositoryUrl ? (
            <a
              href={experiment.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-3xl font-medium tracking-[-0.035em] transition-colors hover:text-orange md:text-4xl"
            >
              {experiment.title}
              <span className="font-mono text-sm text-orange" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : (
            <h2 className="text-3xl font-medium tracking-[-0.035em] md:text-4xl">
              {experiment.title}
            </h2>
          )}

          <p className="mt-4 max-w-xl leading-7 text-paper/60">
            {experiment.summary}
          </p>
        </div>

        <div className="lg:col-span-3">
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {experiment.technologies.map((technology) => (
              <span
                key={technology}
                className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/45"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3 lg:col-span-2 lg:text-right">
          {experiment.year && (
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40">
              {experiment.year}
            </p>
          )}

          {experiment.status && (
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange">
              {experiment.status}
            </p>
          )}

          {experiment.repositoryUrl && (
            <a
              href={experiment.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-paper/55 transition-colors hover:text-orange"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
