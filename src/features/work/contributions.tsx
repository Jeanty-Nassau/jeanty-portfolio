import type { CaseStudyContribution } from "@/types/case-study";

type ContributionsProps = {
  contributions: CaseStudyContribution[];
};

export function Contributions({
  contributions,
}: ContributionsProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/40">
            Selected Contributions
          </p>
        </div>

        <div className="lg:col-span-9">
          <h2 className="max-w-3xl text-3xl font-medium tracking-[-0.035em] md:text-5xl">
            Where I contributed.
          </h2>

          <div className="mt-12">
            {contributions.map((contribution, index) => (
              <article
                key={contribution.title}
                className="grid gap-5 border-t border-ink/15 py-8 md:grid-cols-[80px_1fr]"
              >
                <span className="font-mono text-xs text-ink/35">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-xl font-medium tracking-[-0.02em]">
                    {contribution.title}
                  </h3>

                  <p className="mt-3 max-w-2xl leading-7 text-ink/60">
                    {contribution.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}