import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { labExperiments } from "@/content/lab/experiments";

export function LabPreview() {
  const featuredExperiments = labExperiments
    .filter((experiment) => experiment.featured)
    .slice(0, 3);

  return (
    <section id="lab" className="relative overflow-hidden bg-cobalt py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel number="02">Lab</SectionLabel>
          </div>

          <Reveal className="lg:col-span-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-orange">
                Creative studies
              </p>

              <h2 className="mt-6 max-w-4xl text-4xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
                Small systems built to explore how things move.
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-paper/65">
                A collection of Three.js and WebGL studies first explored in
                2022 and revisited in 2026 with a more deliberate eye for
                interaction, motion, and performance.
              </p>

              <div className="mt-14 border-t border-paper/20">
                {featuredExperiments.map((experiment, index) => (
                  <div
                    key={experiment.slug}
                    className="grid gap-5 border-b border-paper/20 py-7 md:grid-cols-[60px_1fr_auto]"
                  >
                    <span className="font-mono text-xs text-paper/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <p className="text-xl font-medium tracking-[-0.025em]">
                        {experiment.title}
                      </p>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-paper/55">
                        {experiment.summary}
                      </p>
                    </div>

                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-orange">
                      {experiment.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-14">
                <Link
                  href="/lab"
                  className="font-mono text-xs uppercase tracking-[0.16em] text-orange"
                >
                  View the collection ↗
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
