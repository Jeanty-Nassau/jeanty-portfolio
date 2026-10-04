import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";

import { projects } from "@/content/projects/projects";
import { webhookProcessingCaseStudy } from "@/content/projects/webhook-processing-platform";

import { CaseStudyMetrics } from "@/features/work/case-study-metrics";
import { CaseStudySection } from "@/features/work/case-study-section";
import { Contributions } from "@/features/work/contributions";
import { WebhookArchitecture } from "@/features/work/webhook-architecture";

import { weddingWebAppCaseStudy } from "@/content/projects/wedding-web-app";

import { WeddingCaseStudy } from "@/features/work/wedding-case-study";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug,
  );

  if (!project) {
    notFound();
  }

  const isWebhookCaseStudy =
    slug === webhookProcessingCaseStudy.projectSlug;

  const isWeddingCaseStudy =
    slug === weddingWebAppCaseStudy.projectSlug;

  const caseStudy = isWebhookCaseStudy
  ? webhookProcessingCaseStudy
  : isWeddingCaseStudy
    ? weddingWebAppCaseStudy
    : null;

  return (
    <>
      <Header theme="light" />

      <main className="bg-paper text-ink">
        <section className="pb-16 pt-40 md:pb-20 md:pt-48">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <div className="space-y-3">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink/40">
                    {project.category.replaceAll("-", " ")}
                  </p>

                  {project.company && (
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink/40">
                      {project.company}
                    </p>
                  )}
                </div>
              </div>

              <div className="lg:col-span-9">
                <h1 className="max-w-5xl text-5xl font-medium leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                  {project.title}
                </h1>

                <p className="mt-8 max-w-3xl text-xl leading-9 text-ink/60">
                  {caseStudy?.intro ?? project.description}
                </p>
              </div>
            </div>
          </Container>
        </section>

        <Container>
          {caseStudy?.metrics ? (
            <CaseStudyMetrics
              metrics={caseStudy.metrics}
            />
          ) : (
            project.metrics && (
              <CaseStudyMetrics
                metrics={project.metrics}
              />
            )
          )}

          <div className="grid gap-8 border-b border-ink/15 py-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/40">
                Technology
              </p>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-3 lg:col-span-9">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="font-mono text-xs uppercase tracking-[0.14em]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
          </Container>

          {isWebhookCaseStudy && (
          <>
            <WebhookArchitecture />
                
            <Container>
              {webhookProcessingCaseStudy.sections.map((section) => (
                <CaseStudySection
                  key={section.title}
                  section={section}
                />
              ))}
        
              <Contributions
                contributions={webhookProcessingCaseStudy.contributions}
              />
        
              {webhookProcessingCaseStudy.disclaimer && (
                <div className="border-t border-ink/15 py-10">
                  <p className="max-w-2xl font-mono text-[10px] uppercase leading-6 tracking-[0.14em] text-ink/40">
                    {webhookProcessingCaseStudy.disclaimer}
                  </p>
                </div>
              )}
            </Container>
          </>
        )}
        {isWeddingCaseStudy && (
          <WeddingCaseStudy />
        )}
      </main>

      <Footer />
    </>
  );
}