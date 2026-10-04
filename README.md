# Jeanty Nassau — Portfolio

Personal portfolio for Jeanty Nassau, a software developer focused on backend systems, distributed systems, and creative coding.

The site is intentionally split between two sides of my work:

- **Engineering:** .NET, Kafka, AWS, PostgreSQL, reliability, event-driven systems, and production-oriented backend work.
- **Creative code:** Three.js, WebGL, motion, interaction, shaders, and procedural graphics.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Motion
- Lenis
- Three.js / React Three Fiber
- MDX

## Featured work

### Event Processing Platform

A public .NET reference implementation of a durable asynchronous event-processing pipeline covering at-least-once delivery, idempotency, delayed retries, dead-letter handling, partitioning, observability, and integration testing.

Repository: https://github.com/Jeanty-Nassau/event-processing-platform

### Wedding Web App

A real full-stack application originally built for my wedding and later converted into a recruiter-safe public demo with fictional guest records, strengthened authorization boundaries, testing, and CI.

Live demo: https://nassau-wedding.vercel.app/

Repository: https://github.com/Jeanty-Nassau/wedding-website

### Creative Studies

A five-study Three.js collection covering shaders, procedural geometry, video textures, displacement, noise, particles, and scroll choreography:

- Orbital Signals
- Signal Theatre
- Displacement Field
- Noise Field
- Scroll Studies

## Portfolio details

- interactive ASCII portrait
- custom route transitions
- reduced-motion support
- project case studies
- creative-coding Lab
- MDX notes
- custom loading and 404 states
- Open Graph metadata
- sitemap and robots metadata
- Playwright smoke coverage
- GitHub Actions CI

## Local development

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

Useful commands:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
```

The portfolio intentionally keeps the presentation concise. Deep technical detail lives in the individual project repositories.
