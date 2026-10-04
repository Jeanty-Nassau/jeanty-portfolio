import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { notes } from "@/content/notes/notes";
import { Reveal } from "@/components/motion/reveal";

export function NotesPreview() {
  const latestNote = notes[0];

  return (
    <section id="notes" className="bg-paper py-24 text-ink md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel
              number="04"
              dark
            >
              Notes
            </SectionLabel>
          </div>
          <Reveal className="lg:col-span-8">
          <div>
            <h2 className="max-w-3xl text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
              Things worth writing down.
            </h2>

            <p className="mt-6 max-w-xl leading-7 text-ink/60">
              Notes on software engineering, systems, experiments, and lessons
              learned while building things.
            </p>
            
            <div className="mt-16 border-t border-ink/15">
              <Link
                href={`/notes/${latestNote.slug}`}
                className="group grid gap-6 border-b border-ink/15 py-8 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="text-xl font-medium tracking-[-0.025em]">
                    {latestNote.title}
                  </p>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-ink/55">
                    {latestNote.description}
                  </p>
                </div>

                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                  {latestNote.date}
                </span>
              </Link>
            </div>

            <Link
              href="/notes"
              className="font-mono text-xs uppercase tracking-[0.16em] underline decoration-ink/30 underline-offset-8"
            >
              Browse notes
            </Link>
          </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}