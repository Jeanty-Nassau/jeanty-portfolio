export function LiveWeddingPreview() {
  return (
    <section className="bg-ink py-20 text-paper md:py-28">
      <div className="px-[var(--page-padding)]">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/45">
                Live Product
              </p>
            </div>

            <div className="lg:col-span-9">
              <h2 className="max-w-3xl text-4xl font-medium tracking-[-0.04em] md:text-5xl">
                The portfolio should show the product, not just describe it.
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-paper/60">
                This is the deployed recruiter-safe edition of the wedding website.
                The preview remains interactive; open the full demo for RSVP flows.
              </p>
            </div>
          </div>

          <div className="overflow-hidden border border-paper/20 bg-paper">
            <div className="flex items-center justify-between border-b border-ink/10 bg-paper px-4 py-3 text-ink">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-orange" />
              </div>

              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink/45">
                nassau-wedding.vercel.app
              </p>

              <a
                href="https://nassau-wedding.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink transition-colors hover:text-cobalt"
              >
                Open demo ↗
              </a>
            </div>

            <div className="relative aspect-[16/10] min-h-[420px] bg-[#eee9df]">
              <iframe
                src="https://nassau-wedding.vercel.app/"
                title="Live preview of the Wedding Web App"
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>

          <p className="mt-4 font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-paper/35">
            If your browser blocks embedded cross-site previews, use “Open demo” above.
          </p>
        </div>
      </div>
    </section>
  );
}
