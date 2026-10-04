import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";
import { labExperiments } from "@/content/lab/experiments";
import { ExperimentCard } from "@/features/lab/experiment-card";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "A collection of finished Three.js and WebGL studies exploring shaders, procedural geometry, motion, and interaction.",
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
                  Lab / Creative Studies
                </p>
              </div>

              <div className="lg:col-span-8">
                <h1 className="max-w-4xl text-5xl font-medium leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                  Experiments that taught me how things move.
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-paper/65">
                  Five focused Three.js studies first built while learning
                  creative coding and revisited later with stronger engineering
                  instincts. They are deliberately small: each one explores a
                  specific visual or interaction idea rather than pretending to
                  be a product.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-28">
          <Container>
            <div className="border-b border-paper/20">
              {labExperiments.map((experiment, index) => (
                <ExperimentCard
                  key={experiment.slug}
                  experiment={experiment}
                  index={index}
                />
              ))}
            </div>

            <p className="mt-8 max-w-2xl font-mono text-[10px] uppercase leading-6 tracking-[0.14em] text-paper/40">
              Orbital Signals / Signal Theatre / Displacement Field / Noise Field / Scroll Studies
            </p>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
