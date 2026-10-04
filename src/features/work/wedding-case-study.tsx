import { LiveWeddingPreview } from "@/components/project/live-wedding-preview";
import { Container } from "@/components/ui/container";
import { weddingWebAppCaseStudy } from "@/content/projects/wedding-web-app";

import { CaseStudySection } from "./case-study-section";
import { Contributions } from "./contributions";
import { WeddingArchitecture } from "./wedding-architecture";

export function WeddingCaseStudy() {
  return (
    <>
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
                A personal project that had to behave like a real product.
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-paper/65">
                I built it for my own wedding, so the experience had to be
                personal and visually distinctive while still handling real
                authentication, RSVP updates, persistence, and guest-facing
                workflows reliably.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <LiveWeddingPreview />

      <section className="bg-paper text-ink">
        <Container>
          <WeddingArchitecture />

          <div className="grid gap-8 border-b border-ink/15 py-10 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
                Application
              </p>

              <p className="mt-3 leading-7 text-ink/65">
                Next.js, TypeScript, Clerk, tRPC, Zod, Prisma, and PostgreSQL.
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
                Experience
              </p>

              <p className="mt-3 leading-7 text-ink/65">
                Tailwind CSS, Motion, GSAP, Lenis, responsive interaction, and a
                public recruiter demo backed by fictional data.
              </p>
            </div>
          </div>

          {weddingWebAppCaseStudy.sections.map((section) => (
            <CaseStudySection
              key={section.title}
              section={section}
            />
          ))}

          <Contributions
            contributions={weddingWebAppCaseStudy.contributions}
          />
        </Container>
      </section>
    </>
  );
}
