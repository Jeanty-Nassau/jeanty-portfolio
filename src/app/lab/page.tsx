import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";
import { labExperiments } from "@/content/lab/experiments";
import { ExperimentCard } from "@/features/lab/experiment-card";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Creative coding experiments in Three.js, WebGL, motion, and interaction.",
};

export default function LabPage() {
  return (
    <>
      <Header />

      <main className="bg-cobalt text-paper">
        <section className="pb-20 pt-40 md:pb-28 md:pt-48">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-orange">
                  Lab / Experiments
                </p>
              </div>

              <div className="lg:col-span-8">
                <h1 className="max-w-4xl text-5xl font-medium leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                  Experiments that don&apos;t need a roadmap.
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-paper/65">
                  Small explorations in Three.js, WebGL, motion, interaction,
                  and creative coding — built to learn, test ideas, and keep
                  making things outside production work.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-28">
          <Container>
            {labExperiments.map((experiment, index) => (
              <ExperimentCard
                key={experiment.slug}
                experiment={experiment}
                index={index}
              />
            ))}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
