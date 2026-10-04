import type { CaseStudyMetric } from "@/types/case-study";

type CaseStudyMetricsProps = {
  metrics: CaseStudyMetric[];
};

export function CaseStudyMetrics({
  metrics,
}: CaseStudyMetricsProps) {
  return (
    <div className="grid border-y border-ink/15 md:grid-cols-3">
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className={[
            "py-8 md:px-8 md:py-10",
            index > 0
              ? "border-t border-ink/15 md:border-l md:border-t-0"
              : "",
          ].join(" ")}
        >
          <p className="text-4xl font-medium tracking-[-0.045em] md:text-5xl">
            {metric.value}
          </p>

          <p className="mt-3 text-sm font-medium">
            {metric.label}
          </p>

          {metric.detail && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
              {metric.detail}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}