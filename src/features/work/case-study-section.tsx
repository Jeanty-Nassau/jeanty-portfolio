import type { CaseStudySection as CaseStudySectionType } from "@/types/case-study";

type CaseStudySectionProps = {
  section: CaseStudySectionType;
};

export function CaseStudySection({
  section,
}: CaseStudySectionProps) {
  return (
    <section className="grid gap-8 border-b border-ink/15 py-16 lg:grid-cols-12 lg:py-20">
      <div className="lg:col-span-3">
        {section.eyebrow && (
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/40">
            {section.eyebrow}
          </p>
        )}
      </div>

      <div className="lg:col-span-9">
        <h2 className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.035em] md:text-5xl">
          {section.title}
        </h2>

        <div className="mt-8 max-w-2xl space-y-6 text-lg leading-8 text-ink/65">
          {section.body.map((paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}