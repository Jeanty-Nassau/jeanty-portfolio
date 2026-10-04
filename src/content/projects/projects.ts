import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "webhook-processing-platform",

    title: "Event Processing Platform",

    summary:
      "A durable asynchronous event-processing reference implementation focused on reliability and failure handling.",

    description:
      "A public .NET reference implementation exploring at-least-once delivery, idempotency, delayed retries, dead-letter handling, partition ordering, observability, and integration testing.",

    category: "distributed-systems",

    technologies: [
      ".NET",
      "Kafka",
      "PostgreSQL",
      "OpenTelemetry",
      "Docker",
    ],

    featured: true,

    links: {
      github: "https://github.com/Jeanty-Nassau/event-processing-platform",
    },
  },

  {
    slug: "wedding-web-app",

    title: "Wedding Web App",

    summary:
      "A full-stack guest experience combining authenticated RSVP workflows, relational persistence, and an interaction-rich frontend.",

    description:
      "A real wedding application later converted into a recruiter-safe public demo with fictional guest data, strengthened authorization boundaries, automated testing, and CI.",

    category: "full-stack",

    technologies: [
      "Next.js",
      "TypeScript",
      "Clerk",
      "tRPC",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],

    featured: true,

    links: {
      live: "https://nassau-wedding.vercel.app/",
      github: "https://github.com/Jeanty-Nassau/wedding-website",
    },
  },
];
