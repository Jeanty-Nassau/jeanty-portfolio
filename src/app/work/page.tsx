import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";
import { projects } from "@/content/projects/projects";
import { ProjectRow } from "@/features/work/project-row";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected backend, distributed systems, full-stack, and production engineering work by Jeanty Nassau.",
};

export default function WorkPage() {
  return (
    <>
      <Header theme="light"/>

      <main className="bg-paper text-ink">
        <section className="pb-20 pt-40 md:pb-28 md:pt-48">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink/45">
                  Work / Selected Engineering
                </p>
              </div>

              <div className="lg:col-span-8">
                <h1 className="max-w-4xl text-5xl font-medium leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                  Systems built to operate in the real world.
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-ink/60">
                  Selected professional and personal engineering work across
                  backend services, distributed systems, event processing, and
                  product development.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-28">
          <Container>
            <div className="border-t border-ink/15">
              {projects.map((project, index) => (
                <ProjectRow
                  key={project.slug}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}