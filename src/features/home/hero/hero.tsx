import { Container } from "@/components/ui/container";
import { SmoothScrollLink } from "@/components/motion/smooth-scroll-link";
import { AsciiPortrait } from "./ascii-portrait";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-cobalt">
    <div
      className="
        absolute
        right-[-10%]
        top-[49%]
        z-[5]
        hidden
        -translate-y-1/2
        md:block
        md:right-[-16%]
        md:opacity-80
        lg:right-[-8%]
        lg:opacity-100
        xl:right-[-3%]
        2xl:right-[1%]
      "
    >
      <AsciiPortrait />
    </div>

      <Container className="pointer-events-none relative z-10 flex min-h-screen flex-col">
        <div className="grid flex-1 items-center pb-20 pt-[var(--header-height)] lg:grid-cols-12">
          <div className="relative z-20 lg:col-span-8">
            <p className="mb-6 font-bold text-md uppercase tracking-[0.18em] text-orange">
              Backend / Distributed Systems / Creative Code
            </p>

            <h1 className="max-w-5xl text-[clamp(3.5rem,8vw,8.5rem)] font-bold leading-[0.84] tracking-[-0.065em]">
              Building systems
              <br />
              that move.
            </h1>

            <p className="mt-10 max-w-xl text-lg leading-8 text-paper/85 md:text-xl">
              Software developer focused on backend and distributed systems,
              working with .NET, AWS, Kafka, and PostgreSQL — while exploring
              interactive experiences through creative code.
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-paper/20 py-6">
          <SmoothScrollLink
            target="#selected-work"
            className="pointer-events-auto font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60 transition-colors hover:text-paper"
          >
            Scroll to explore ↓
          </SmoothScrollLink>
          <div className="h-2.5 w-2.5 rounded-full bg-orange" />
        </div>
      </Container>
    </section>
  );
}