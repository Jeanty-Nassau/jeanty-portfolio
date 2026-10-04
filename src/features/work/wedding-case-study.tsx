import { Container } from "@/components/ui/container";
import { weddingWebAppCaseStudy } from "@/content/projects/wedding-web-app";

import { CaseStudySection } from "./case-study-section";
import { Contributions } from "./contributions";
import { ProjectVisualPlaceholder } from "./project-visual-placeholder";
import { WeddingArchitecture } from "./wedding-architecture";

export function WeddingCaseStudy() {
  return (
    <>
      {/* Primary project visual */}
      <section className="bg-paper pb-20 text-ink md:pb-28">
        <Container>
          <ProjectVisualPlaceholder label="Wedding Web App / Primary Visual" />
        </Container>
      </section>

      {/* Product statement */}
      <section className="bg-cobalt py-24 text-paper md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-orange">
                The Project
              </p>
            </div>

            <div className="lg:col-span-9">
              <h2 className="max-w-4xl text-4xl font-medium leading-[0.98] tracking-[-0.045em] md:text-6xl">
                A real product disguised as a personal project.
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-paper/65">
                Designed for an actual event and actual guests, the project had
                to do more than look interesting. It needed to make information
                easy to find, work across devices, and still feel personal.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper text-ink">
  <Container>
    <WeddingArchitecture />
    <div className="grid gap-8 border-b border-ink/15 py-10 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
                Application
              </p>

              <p className="mt-3 leading-7 text-ink/65">
                Next.js, TypeScript, Clerk, tRPC, Zod, Prisma and PostgreSQL.
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
                Experience
              </p>

              <p className="mt-3 leading-7 text-ink/65">
                Tailwind CSS, Motion, GSAP, Lenis and Vercel Analytics.
              </p>
            </div>
          </div>
  </Container>
</section>
      <section className="bg-paper text-ink">
        <Container>
          {weddingWebAppCaseStudy.sections.map((section) => (
            <CaseStudySection
              key={section.title}
              section={section}
            />
          ))}
        </Container>
      </section>

      {/* Visual grid */}
      <section className="bg-ink py-24 text-paper md:py-32">
        <Container>
          <div className="mb-14 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/45">
                Interface
              </p>
            </div>

            <div className="lg:col-span-9">
              <h2 className="max-w-3xl text-4xl font-medium tracking-[-0.04em] md:text-5xl">
                Designed as an experience, not just a collection of pages.
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <ProjectVisualPlaceholder label="Desktop Experience" />
            <ProjectVisualPlaceholder label="Interactive Detail" />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <ProjectVisualPlaceholder label="Mobile / 01" />
            <ProjectVisualPlaceholder label="Mobile / 02" />
            <ProjectVisualPlaceholder label="Mobile / 03" />
          </div>
        </Container>
      </section>

      {/* Contributions */}
      <section className="bg-paper text-ink">
        <Container>
          <Contributions
            contributions={weddingWebAppCaseStudy.contributions}
          />
        </Container>
      </section>
    </>
  );
}