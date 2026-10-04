import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";
import { labExperiments } from "@/content/lab/experiments";
import { ExperimentCard } from "@/features/lab/experiment-card";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Three focused Three.js studies: a mapped night-side globe, a rotating cinema, and an interactive signal terrain.",
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
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-orange">
                  Lab / Creative Studies
                </p>
              </div>

              <div className="lg:col-span-8">
                <h1 className="max-w-4xl text-5xl font-medium leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                  Three studies. Three distinct ideas.
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-paper/65">
                  Orbital Signals turns Earth into a moving signal object.
                  Signal Theatre puts you inside a rotating four-screen cinema.
                  Displacement Field responds to movement and click-driven pulses.
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
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
