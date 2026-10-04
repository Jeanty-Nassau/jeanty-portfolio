import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-cobalt text-paper">
      <Container>
        <div className="border-t border-paper/20 py-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-2xl font-medium tracking-[-0.035em]">
                Jeanty Nassau
              </p>

              <p className="mt-2 text-sm text-paper/55">
                Software Developer · Cape Town
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
              <Link
                href="/work"
                className="font-mono text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-orange"
              >
                Work
              </Link>

              <Link
                href="/lab"
                className="font-mono text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-orange"
              >
                Lab
              </Link>

              <Link
                href="/about"
                className="font-mono text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-orange"
              >
                About
              </Link>

              <Link
                href="/notes"
                className="font-mono text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-orange"
              >
                Notes
              </Link>

              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-orange transition-colors hover:text-paper"
              >
                GitHub ↗
              </a>

              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-orange transition-colors hover:text-paper"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="mt-20 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40">
            <span>Built with Next.js</span>

            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
