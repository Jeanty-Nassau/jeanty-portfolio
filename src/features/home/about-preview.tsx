import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/motion/reveal";

export function AboutPreview() {
  return (
    <section id="about" className="bg-cobalt-dark py-24 text-paper md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel number="03">
              About
            </SectionLabel>
          </div>

          <Reveal className="lg:col-span-8">
            <div>
              <h2 className="max-w-4xl text-4xl font-medium leading-[1.03] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Backend engineer by profession. <span className="text-orange">Builder by default.</span>
              </h2>

              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <p className="leading-8 text-paper/70">
                  I&apos;m a software developer based in Cape Town, focused on
                  backend systems, distributed architectures, and the engineering
                  challenges that appear when software operates at scale.
                </p>

                <p className="leading-8 text-paper/70">
                  Outside of production systems, I use the web as a creative
                  medium — experimenting with graphics, interaction, motion, and
                  small products of my own.
                </p>
              </div>

              <div className="mt-12">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-orange transition-colors hover:text-paper"
                >
                  More about me
                  <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
