"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";

const navigation = [
  {
    label: "Work",
    href: "/work",
  },
  {
    label: "Lab",
    href: "/lab",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Notes",
    href: "/notes",
  },
];

type HeaderProps = {
  theme?: "light" | "dark";
};

export function Header({
  theme = "dark",
}: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLight = theme === "light";

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <Container>
          <div
            className={[
              "flex h-[var(--header-height)] items-center justify-between border-b",
              isLight
                ? "border-ink/15 text-ink"
                : "border-paper/20 text-paper",
            ].join(" ")}
          >
            <Link
              href="/"
              className="font-medium tracking-[-0.03em]"
              onClick={() => setMenuOpen(false)}
            >
              JEANTY NASSAU
            </Link>

            <p
              className={[
                "hidden font-mono text-[11px] uppercase tracking-[0.16em] lg:block",
                isLight ? "text-ink/45" : "text-paper/60",
              ].join(" ")}
            >
              Software Developer / Cape Town
            </p>

            <nav className="hidden items-center gap-6 md:flex">
              {navigation.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "relative font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                      isLight
                        ? active
                          ? "text-ink"
                          : "text-ink/50 hover:text-ink"
                        : active
                          ? "text-paper"
                          : "text-paper/60 hover:text-paper",
                    ].join(" ")}
                  >
                    {item.label}

                    {active && (
                      <span
                        className="absolute -bottom-2 left-0 h-1 w-1 rounded-full bg-orange"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              className="font-mono text-xs uppercase tracking-[0.14em] md:hidden"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </Container>
      </header>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-40 bg-cobalt pt-[var(--header-height)] text-paper md:hidden"
        >
          <Container className="flex min-h-screen flex-col py-10">
            <nav className="flex flex-1 flex-col justify-center gap-6">
              {navigation.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline justify-between border-b border-paper/20 py-4"
                >
                  <span className="text-4xl font-medium tracking-[-0.04em]">
                    {item.label}
                  </span>

                  <span className="font-mono text-xs text-paper/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </nav>

            <p className="pb-6 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40">
              Cape Town / South Africa
            </p>
          </Container>
        </div>
      )}
    </>
  );
}
