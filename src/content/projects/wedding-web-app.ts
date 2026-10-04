import type { CaseStudy } from "@/types/case-study";

export const weddingWebAppCaseStudy: CaseStudy = {
  projectSlug: "wedding-web-app",

  intro:
    "A real full-stack wedding product, now available as a recruiter-safe public demo with fictional guest data and hardened authorization boundaries.",

  metrics: [],

  sections: [
    {
      eyebrow: "Product",
      title: "Built for real guests",
      body: [
        "The application was originally built for my own wedding. Guests could authenticate, find event information, and manage RSVP, meal, and dietary preferences.",

        "That made the product constraints real: the site had to feel personal while ordinary tasks stayed obvious on desktop and mobile.",
      ],
    },

    {
      eyebrow: "Architecture",
      title: "The server owns authorization",
      body: [
        "Next.js and TypeScript sit on top of Clerk, tRPC, Zod, Prisma, and PostgreSQL, giving the application a typed path from interaction to persistence.",

        "For the public demo, client-provided guest IDs identify records but do not grant access. The server resolves the caller's invitation and constrains reads and writes to that ownership boundary.",
      ],
    },

    {
      eyebrow: "Delivery",
      title: "A personal build taken through production",
      body: [
        "The project includes migrations, seeded fictional demo data, authorization integration tests, a persisted recruiter flow, CI, responsive UI, and a deployed public demo.",

        "The original visual identity and personal meaning remain intact while private guest information stays out of the public deployment.",
      ],
    },
  ],

  contributions: [
    {
      title: "Secure guest workflows",
      description:
        "Protected RSVP and guest flows with server-side invitation ownership rather than trusting browser identifiers.",
    },
    {
      title: "Typed application boundaries",
      description:
        "tRPC, Zod, Prisma, and PostgreSQL provide validated application and persistence contracts.",
    },
    {
      title: "Recruiter-safe demo",
      description:
        "Fictional seeded data and a constrained demo identity make the real product safely explorable without signup.",
    },
    {
      title: "End-to-end delivery",
      description:
        "Responsive interaction, migrations, tests, CI, deployment, and real-world use rather than a portfolio-only prototype.",
    },
  ],
};
