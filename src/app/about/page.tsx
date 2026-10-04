import type { Metadata } from "next";

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
    role: "Graduate / Learnership",
    description:
      "Built backend services, automation, testing infrastructure, and gained production experience across .NET and cloud-based systems.",
  },
  {
    period: "2025 — 2026",
    role: "Junior Software Developer",
    description:
      "Worked across production backend systems, event processing, data access, integrations, and reliability improvements.",
  },
  {
    period: "2026 — Present",
    role: "Software Developer",
    description:
      "Focused on backend and distributed systems, contributing to production services operating at significant event volume and scale.",
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
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-orange">
                  About / Jeanty Nassau
                </p>
              </div>

              <div className="lg:col-span-8">
                <h1 className="max-w-4xl text-5xl font-medium leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                  I like building things that have to work.
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-paper/65">
                  I&apos;m a software developer based in Cape Town, focused on
                  backend systems, distributed architectures, and the
                  engineering work required to keep software reliable at scale.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-paper py-24 text-ink md:py-32">
          <Container>
            <div className="grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">
                  What I do
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="max-w-3xl space-y-8 text-xl leading-9 text-ink/70">
                  <p>
                    Professionally, I spend most of my time working with .NET,
                    event-driven systems, AWS, Kafka, PostgreSQL, integrations,
                    and the kinds of problems that appear when software has to
                    operate continuously in production.
                  </p>

                  <p>
                    Outside of work, I enjoy building products and experimenting
                    with the more visual side of the web — Three.js, animation,
                    interaction, and creative coding.
                  </p>

                  <p>
                    I&apos;m particularly interested in becoming stronger at
                    system design, distributed systems, and building software
                    that remains understandable as it grows.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-ink py-24 text-paper md:py-32">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/45">
                  Current stack
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="flex max-w-4xl flex-wrap gap-3">
                  {stack.map((technology) => (
                    <span
                      key={technology}
                      className="border border-paper/20 px-4 py-3 font-mono text-xs uppercase tracking-[0.13em]"
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
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">
                  Experience
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="border-t border-ink/15">
                  {timeline.map((item) => (
                    <article
                      key={item.period}
                      className="grid gap-6 border-b border-ink/15 py-8 md:grid-cols-[160px_1fr]"
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">
                        {item.period}
                      </p>

                      <div>
                        <h2 className="text-2xl font-medium tracking-[-0.03em]">
                          {item.role}
                        </h2>

                        <p className="mt-3 max-w-2xl leading-7 text-ink/60">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  ))}
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
