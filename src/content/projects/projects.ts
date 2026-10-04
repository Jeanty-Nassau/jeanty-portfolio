import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "webhook-processing-platform",

    title: "Webhook Processing Platform",

    summary:
      "High-throughput backend infrastructure for processing large volumes of event-driven workload reliably.",

    description:
      "Backend services designed around asynchronous processing, reliability, observability, and high event throughput in a production fleet-telematics environment.",

    category: "distributed-systems",

    technologies: [
      ".NET",
      "AWS",
      "Kafka",
      "PostgreSQL",
    ],

    metrics: [
      {
        label: "Event volume",
        value: "50–90M / day",
      },
      {
        label: "Sustained throughput",
        value: "1.3K–1.5K / sec",
      },
    ],

    company: "Powerfleet",

    featured: true,

    confidential: true,
  },

  {
  slug: "wedding-web-app",

  title: "Wedding Web App",

  summary:
    "A full-stack private-event platform combining authenticated guest workflows, RSVP management, and a highly interactive frontend experience.",

  description:
    "A real-world wedding application built with Next.js, TypeScript, Clerk, tRPC, Prisma, and PostgreSQL, with authenticated guest flows and a strong focus on interaction and visual polish.",

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
},
];