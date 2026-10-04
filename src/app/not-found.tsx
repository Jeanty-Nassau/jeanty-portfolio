import Link from "next/link";

import { SignalField } from "@/features/not-found/signal-field";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cobalt text-paper">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,77,0,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_32%)]" />

      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-6 pb-10 pt-8 md:px-10 lg:px-12">
        <div className="flex items-center justify-between border-b border-paper/20 pb-6">
          <Link
            href="/"
            className="font-medium tracking-[-0.03em]"
          >
            JEANTY NASSAU
          </Link>

          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/55">
            404 / Not Found
          </p>
        </div>

        <div className="grid flex-1 items-center gap-14 py-10 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-orange">
              Routing error / lost in transit
            </p>

            <h1 className="mt-6 text-[clamp(5rem,15vw,12rem)] font-medium leading-[0.82] tracking-[-0.08em]">
              404
            </h1>

            <h2 className="mt-4 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              This page doesn&apos;t exist in the current system.
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-paper/70">
              The route you tried to access either never existed,
              moved somewhere else, or was lost somewhere between
              intent and implementation.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center border border-paper/20 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:border-paper/40 hover:bg-paper hover:text-cobalt"
              >
                Return home
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center border border-orange/40 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-orange transition-colors hover:bg-orange hover:text-cobalt"
              >
                View work
              </Link>
            </div>

            <div className="mt-12 border-t border-paper/15 pt-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40">
                Suggested recovery
              </p>

              <p className="mt-3 max-w-xl text-sm leading-6 text-paper/60">
                Try returning to the homepage, reviewing selected
                work, or navigating through the main system
                manually.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <SignalField />
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-paper/20 pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40">
            Status / unresolved route
          </p>

          <div className="h-2.5 w-2.5 rounded-full bg-orange" />
        </div>
      </div>
    </main>
  );
}