"use client";

import type {
  MouseEvent,
  ReactNode,
} from "react";

import { useLenis } from "./smooth-scroll";

type SmoothScrollLinkProps = {
  target: string;
  children: ReactNode;
  className?: string;
};

export function SmoothScrollLink({
  target,
  children,
  className = "",
}: SmoothScrollLinkProps) {
  const lenis = useLenis();

  function handleClick(
    event: MouseEvent<HTMLAnchorElement>,
  ) {
    event.preventDefault();

    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.25,
        offset: 0,
      });

      return;
    }

    document
      .querySelector(target)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  return (
    <a
      href={target}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}