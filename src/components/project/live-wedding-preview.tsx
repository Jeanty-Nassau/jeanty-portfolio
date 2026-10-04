import Image from "next/image";

const imageBase =
  "https://raw.githubusercontent.com/Jeanty-Nassau/wedding-website/main/public/images";

export function LiveWeddingPreview() {
  return (
    <section className="bg-ink py-20 text-paper md:py-28">
      <div className="px-[var(--page-padding)]">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-orange">
                Product preview
              </p>
            </div>

            <div className="lg:col-span-9">
              <h2 className="max-w-3xl text-4xl font-medium tracking-[-0.04em] md:text-5xl">
                A real wedding website, presented as a real product.
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-paper/60">
                The public demo uses fictional guest data, while the visual identity,
                interaction, and product flows stay true to the site I built for my wedding.
              </p>
            </div>
          </div>

          <a
            href="https://nassau-wedding.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="group block overflow-hidden border border-paper/20 bg-paper"
          >
            <div className="flex items-center justify-between border-b border-ink/10 bg-paper px-4 py-3 text-ink">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-orange" />
              </div>

              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink/45">
                nassau-wedding.vercel.app
              </p>

              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-cobalt transition-colors group-hover:text-orange">
                Open demo ↗
              </span>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="relative aspect-[16/10] min-h-[420px] overflow-hidden bg-[#eee9df]">
                <Image
                  src={`${imageBase}/HeroLarge.jpg`}
                  alt="Wedding website hero preview"
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 68vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-orange">
                    Nassau / Wedding Web App
                  </p>
                  <p className="mt-2 max-w-lg text-2xl font-medium tracking-[-0.03em] text-paper md:text-3xl">
                    Guest access, RSVP flows, event information, and a visual identity built for the day itself.
                  </p>
                </div>
              </div>

              <div className="grid grid-rows-2">
                <div className="relative min-h-[210px] overflow-hidden">
                  <Image
                    src={`${imageBase}/engagement.JPG`}
                    alt="Engagement photography used in the wedding site"
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 32vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                </div>

                <div className="relative min-h-[210px] overflow-hidden border-t border-paper/15">
                  <Image
                    src={`${imageBase}/venue3.jpg`}
                    alt="Venue photography used in the wedding site"
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 32vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
