import Image from "next/image";

const demoUrl = "https://nassau-wedding.vercel.app/home";

const demos = [
  {
    label: "Home experience",
    src: "/project-demos/wedding-home.png",
    alt: "Screenshot of the live wedding website home experience",
  },
  {
    label: "RSVP flow",
    src: "/project-demos/wedding-rsvp.png",
    alt: "Screenshot of the live wedding website RSVP experience",
  },
];

export function LiveWeddingPreview() {
  return (
    <section className="bg-ink py-20 text-paper md:py-28">
      <div className="px-[var(--page-padding)]">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
                Live product
              </p>
            </div>

            <div className="lg:col-span-9">
              <h2 className="max-w-3xl text-4xl font-medium tracking-[-0.04em] md:text-5xl">
                The actual product, not a placeholder.
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-paper/60">
                These captures come from the deployed public demo: the home
                experience and the recruiter-safe RSVP flow backed by fictional
                guest data.
              </p>

              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex border border-orange px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-orange transition-all hover:bg-orange hover:text-ink"
              >
                Open live website ↗
              </a>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {demos.map((demo) => (
              <a
                key={demo.label}
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden border border-paper/20 bg-[#111]"
              >
                <div className="flex items-center justify-between border-b border-paper/15 px-4 py-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-orange" />
                  </div>

                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.13em] text-paper/45">
                    {demo.label}
                  </p>

                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.13em] text-orange">
                    View ↗
                  </span>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <Image
                    src={demo.src}
                    alt={demo.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
                  />
                </div>
              </a>
            ))}
          </div>

          <p className="mt-5 font-mono text-[9px] font-semibold uppercase leading-5 tracking-[0.12em] text-paper/35">
            Captured automatically from the deployed demo so the portfolio stays
            in sync with the real product.
          </p>
        </div>
      </div>
    </section>
  );
}
