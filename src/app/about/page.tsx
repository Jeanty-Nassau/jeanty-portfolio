import type { Metadata } from "next";
import Image from "next/image";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";

const stack = [
  ".NET",
  "C#",
  "AWS",
  "Kafka",
  "PostgreSQL",
  "TypeScript",
  "Next.js",
  "Three.js",
];

const timeline = [
  {
    period: "2023 — 2025",
    role: "Software Engineering Learner",
    description:
      "Built backend services and internal tools while learning end-to-end delivery across APIs, databases, Docker, cloud deployment, and CI/CD.",
  },
  {
    period: "2025 — 2026",
    role: "Junior Software Developer",
    description:
      "Worked across production event processing, provider integrations, PostgreSQL data access, testing, and reliability improvements.",
  },
  {
    period: "2026 — Present",
    role: "Software Developer",
    description:
      "Taking on larger architectural migrations, provider abstractions, production failure handling, and multi-service backend work.",
  },
];

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jeanty Nassau, a software developer focused on backend and distributed systems.",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        <section className="bg-cobalt pb-24 pt-40 text-paper md:pb-32 md:pt-48">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-orange">
                  About / Jeanty Nassau
                </p>
              </div>

              <div className="lg:col-span-8">
                <h1 className="max-w-4xl text-5xl font-medium leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                  I like building things that have to <span className="text-orange">work.</span>
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-paper/75">
                  I&apos;m a software developer based in Cape Town. My strongest
                  work sits in backend systems where reliability, data flow,
                  integrations, and change all meet.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-paper py-24 text-ink md:py-32">
          <Container>
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-cobalt">
                  What I do
                </p>

                <figure className="mt-8">
                  <div className="group relative overflow-hidden border-l-4 border-orange bg-cobalt">
                    <Image
                      src="/portrait.jpeg"
                      alt="Jeanty Nassau seated outdoors on a wooden bench"
                      width={912}
                      height={1620}
                      priority
                      className="aspect-[4/5] w-full object-cover object-[50%_64%] transition-transform duration-500 group-hover:scale-[1.025]"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cobalt/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <figcaption className="mt-4 flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-orange">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                      Cape Town / 2026
                    </span>

                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-cobalt">
                      Builder / Engineer
                    </span>
                  </figcaption>
                </figure>
              </div>

              <div className="lg:col-span-7 lg:pt-8">
                <div className="max-w-3xl space-y-8 text-xl leading-9 text-ink/70">
                  <p>
                    Professionally, I work mostly with C#/.NET, Kafka, AWS,
                    PostgreSQL, integrations, and production systems that handle
                    large event volumes continuously.
                  </p>

                  <p>
                    Recent work has included a 95-file provider-integration
                    migration, replacing a legacy data-access layer with a
                    PostgreSQL/Dapper implementation and integration tests, and
                    designing failure routing so critical Kafka consumer errors
                    surface instead of disappearing into generic handling.
                  </p>

                  <p>
                    Outside work, I build products and use the browser as a
                    creative medium — Three.js, motion, interaction, and small
                    systems that let me explore a different side of engineering.
                  </p>
                </div>

                <div className="mt-12 h-px w-28 bg-cobalt" />

                <p className="mt-5 max-w-xl font-mono text-[11px] font-bold uppercase leading-6 tracking-[0.14em] text-orange">
                  Reliability / architecture / debugging / creative code
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-cobalt-dark py-24 text-paper md:py-32">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-orange">
                  Current stack
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="flex max-w-4xl flex-wrap gap-3">
                  {stack.map((technology) => (
                    <span
                      key={technology}
                      className="border border-paper/20 px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.13em] transition-all duration-300 hover:-translate-y-0.5 hover:border-orange hover:bg-orange hover:text-ink"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-paper py-24 text-ink md:py-32">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-cobalt">
                  Experience
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="border-t border-ink/15">
                  {timeline.map((item) => {
                    const isCurrent = item.period.includes("Present");

                    return (
                      <article
                        key={item.period}
                        className="group grid gap-6 border-b border-ink/15 py-8 transition-all duration-300 hover:border-cobalt hover:bg-cobalt hover:px-5 md:grid-cols-[160px_1fr]"
                      >
                        <p
                          className={[
                            "font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300",
                            isCurrent ? "text-orange" : "text-ink/45 group-hover:text-orange",
                          ].join(" ")}
                        >
                          {item.period}
                        </p>

                        <div>
                          <h2
                            className={[
                              "text-2xl font-medium tracking-[-0.03em] transition-colors duration-300 group-hover:text-paper",
                              isCurrent ? "text-cobalt" : "",
                            ].join(" ")}
                          >
                            {item.role}
                          </h2>

                          <p className="mt-3 max-w-2xl leading-7 text-ink/60 transition-colors duration-300 group-hover:text-paper/75">
                            {item.description}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
