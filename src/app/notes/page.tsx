import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";
import { notes } from "@/content/notes/notes";

export default function NotesPage() {
  return (
    <>
      <Header theme="light" />

      <main className="bg-paper text-ink">
        <section className="pb-20 pt-40 md:pb-28 md:pt-48">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink/40">
                  Notes / Writing
                </p>
              </div>

              <div className="lg:col-span-8">
                <h1 className="max-w-4xl text-5xl font-medium leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                  Things worth thinking through in public.
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-ink/60">
                  Short notes on software engineering, distributed systems,
                  creative coding, and lessons from building things.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-28">
          <Container>
            <div className="border-t border-ink/15">
              {notes.map((note, index) => (
                <article
                  key={note.slug}
                  className="border-b border-ink/15"
                >
                  <Link
                    href={`/notes/${note.slug}`}
                    className="group grid gap-8 py-10 lg:grid-cols-12"
                  >
                    <div className="font-mono text-xs text-ink/35 lg:col-span-1">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="lg:col-span-7">
                      <h2 className="text-2xl font-medium tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                        {note.title}
                      </h2>

                      <p className="mt-4 max-w-2xl leading-7 text-ink/60">
                        {note.description}
                      </p>
                    </div>

                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40 lg:col-span-3">
                      {note.date}
                    </div>

                    <div className="flex justify-end lg:col-span-1">
                      <span aria-hidden="true">↗</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}