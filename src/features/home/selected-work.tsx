import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { projects } from "@/content/projects/projects";
import { ProjectRow } from "@/features/work/project-row";

export function SelectedWork() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 2);

  return (
    <section id="selected-work" className="bg-paper py-24 text-ink md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel number="01" dark>
              Selected Work
            </SectionLabel>
          </div>

          <Reveal className="lg:col-span-8">
            <div>
              <h2 className="max-w-4xl text-4xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-7xl">
                Two projects. Two different kinds of proof.
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-ink/60">
                Distributed-systems depth on one side, a complete product on the other.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 border-t border-ink/15">
          {featuredProjects.map((project, index) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/work"
            className="font-mono text-xs uppercase tracking-[0.16em] underline decoration-ink/30 underline-offset-8 hover:decoration-ink"
          >
            View work
          </Link>
        </div>
      </Container>
    </section>
  );
}
