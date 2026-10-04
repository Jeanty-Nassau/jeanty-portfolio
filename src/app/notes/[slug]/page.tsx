import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";
import { notes } from "@/content/notes/notes";

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const noteModules = {
  "building-reliable-consumers": () =>
    import("@/content/notes/building-reliable-consumers.mdx"),
};

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug);

  if (!note) {
    return {
      title: "Note",
    };
  }

  return {
    title: note.title,
    description: note.description,
  };
}

export default async function NotePage({
  params,
}: NotePageProps) {
  const { slug } = await params;

  const note = notes.find((item) => item.slug === slug);

  if (!note) {
    notFound();
  }

  const loader =
    noteModules[slug as keyof typeof noteModules];

  if (!loader) {
    notFound();
  }

  const { default: NoteContent } = await loader();

  return (
    <>
      <Header theme="light" />

      <main className="bg-paper text-ink">
        <article className="pb-28 pt-40 md:pt-48">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12">
              <aside className="lg:col-span-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
                  Note
                </p>

                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
                  {note.date}
                </p>
              </aside>

              <div className="lg:col-span-8">
                <h1 className="max-w-4xl text-5xl font-medium leading-[0.96] tracking-[-0.05em] sm:text-6xl">
                  {note.title}
                </h1>

                <p className="mt-8 max-w-2xl text-xl leading-8 text-ink/60">
                  {note.description}
                </p>

                <div className="mt-16 max-w-3xl border-t border-ink/15 pt-2">
                  <NoteContent />
                </div>
              </div>
            </div>
          </Container>
        </article>
      </main>

      <Footer />
    </>
  );
}
