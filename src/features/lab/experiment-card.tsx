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
    <article className="group border-t border-paper/20 py-8">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="font-mono text-xs text-paper/35 lg:col-span-1">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="lg:col-span-6">
          <h2 className="text-3xl font-medium tracking-[-0.035em] md:text-4xl">
            {experiment.title}
          </h2>

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

        <div className="flex items-start justify-between lg:col-span-2">
          {experiment.status && (
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange">
              {experiment.status}
            </span>
          )}

          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            ↗
          </span>
        </div>
      </div>
    </article>
  );
}