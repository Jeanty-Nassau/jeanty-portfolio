import type { MDXComponents } from "mdx/types";

export function useMDXComponents(
  components: MDXComponents,
): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-16 text-4xl font-medium tracking-[-0.04em] md:text-5xl">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="mt-14 text-3xl font-medium tracking-[-0.035em]">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mt-10 text-2xl font-medium tracking-[-0.025em]">
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="mt-6 text-lg leading-8 text-ink/70">
        {children}
      </p>
    ),

    ul: ({ children }) => (
      <ul className="mt-6 list-disc space-y-3 pl-6 text-lg leading-8 text-ink/70">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-3 pl-6 text-lg leading-8 text-ink/70">
        {children}
      </ol>
    ),

    code: ({ children }) => (
      <code className="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-[0.9em]">
        {children}
      </code>
    ),

    pre: ({ children }) => (
      <pre className="mt-8 overflow-x-auto bg-ink p-6 font-mono text-sm leading-7 text-paper">
        {children}
      </pre>
    ),

    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-orange pl-6 text-xl leading-8 text-ink/60">
        {children}
      </blockquote>
    ),

    a: ({ href, children }) => (
      <a
        href={href}
        className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
      >
        {children}
      </a>
    ),

    ...components,
  };
}