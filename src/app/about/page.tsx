import type { Metadata } from "next";
import Image from "next/image";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";

const stack = [
  "C#",
  ".NET",
  "AWS",
  "Kafka",
  "PostgreSQL",
  "Valkey / Redis",
  "Docker",
  "TypeScript",
];

const timeline = [
  {
    period: "Feb 2023 — Jan 2025",
    company: "MiX Telematics",
    role: "Learner — Test Automation Developer",
    description:
      "Built Playwright/Selenium regression tests and C#/.NET + Angular features for internal tools.",
  },
  {
    period: "Feb 2025 — Jul 2026",
    company: "Powerfleet",
    role: "Junior Software Developer",
    description:
      "Owned a greenfield engineering analytics service and worked on high-volume Kafka services, integrations, and PostgreSQL data access.",
  },
  {
    period: "Jul 2026 — Present",
    company: "Powerfleet",
    role: "Software Developer",
    description:
      "Building distributed scheduling, audit APIs, telemetry, and provider-agnostic backend services.",
  },
];

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jeanty Nassau, a software development engineer focused on C#/.NET, AWS, and distributed systems.",
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
                  Software Development Engineer in Cape Town, focused on
                  backend systems, reliability, and distributed workloads.
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
                      Backend / Systems
                    </span>
                  </figcaption>
                </figure>
              </div>

              <div className="lg:col-span-7 lg:pt-8">
                <div className="max-w-3xl space-y-7 text-xl leading-9 text-ink/70">
                  <p>
                    At Powerfleet, I build C#/.NET services across distributed
                    scheduling, Kafka, AWS, PostgreSQL, and production operations.
                  </p>

                  <p>
                    Recent work includes a fault-tolerant scheduler using Valkey
                    leases and fencing tokens, plus a greenfield engineering
                    analytics service taken from design through deployment.
                  </p>

                  <p>
                    Outside work, I build full-stack products and interactive
                    Three.js studies.
                  </p>
                </div>

                <div className="mt-12 h-px w-28 bg-cobalt" />

                <p className="mt-5 max-w-xl font-mono text-[11px] font-bold uppercase leading-6 tracking-[0.14em] text-orange">
                  Distributed systems / reliability / testing / creative code
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
                        className="group grid gap-6 border-b border-ink/15 py-8 transition-all duration-300 hover:border-cobalt hover:bg-cobalt hover:px-5 md:grid-cols-[180px_1fr]"
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
                          <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-orange">
                            {item.company}
                          </p>

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
