import type { CaseStudy } from "@/types/case-study";

export const weddingWebAppCaseStudy: CaseStudy = {
  projectSlug: "wedding-web-app",

  intro:
    "A full-stack wedding platform built for real guests, combining authentication, RSVP and meal workflows, relational data, and an interactive frontend experience.",

  metrics: [],

  sections: [
    {
      eyebrow: "Product",
      title: "Built around a real guest journey",
      body: [
        "The application was built for an actual wedding rather than as a portfolio exercise. Guests could authenticate, access event information, and manage their RSVP and meal preferences through the application.",

        "That made usability important. The experience needed to feel personal and visually distinctive while still making ordinary tasks such as finding information or updating an RSVP straightforward.",
      ],
    },

    {
      eyebrow: "Architecture",
      title: "A full-stack application with typed boundaries",
      body: [
        "The application uses Next.js and TypeScript across the frontend, with Clerk providing authentication and tRPC exposing typed application procedures.",

        "Zod is used for validation, Prisma manages relational data access, and PostgreSQL stores guest, RSVP, and related application data. This gave the project a strongly typed path from UI interaction through server logic to persistence.",
      ],
    },

    {
      eyebrow: "Interaction",
      title: "Creative frontend work without sacrificing the product",
      body: [
        "The interface uses animation and smooth interaction to make the experience feel more personal than a conventional event-information site.",

        "Motion, GSAP, and smooth-scrolling techniques were used selectively, with the goal of enhancing the experience while keeping the core guest workflows accessible and understandable.",
      ],
    },

    {
      eyebrow: "Engineering",
      title: "Owning the application end to end",
      body: [
        "Building the application involved more than implementing screens. I worked across authentication, application procedures, database access, validation, responsive UI, deployment, and production refinement.",

        "Because the application was used by real people, issues around authorization, data integrity, error handling, and maintainability mattered in a way they often do not in purely demonstrative projects.",
      ],
    },
  ],

  contributions: [
    {
      title: "Authenticated guest experience",
      description:
        "Implemented protected guest flows using Clerk so users could access and manage wedding information associated with their account.",
    },

    {
      title: "Typed RSVP workflows",
      description:
        "Built tRPC procedures and validated application inputs for retrieving and updating RSVP, meal, and dietary information.",
    },

    {
      title: "Relational data layer",
      description:
        "Used Prisma and PostgreSQL to model and persist guest and event-related application data.",
    },

    {
      title: "Interactive interface",
      description:
        "Built a responsive, animation-rich frontend using Next.js, Tailwind CSS, Motion, GSAP, and smooth-scrolling techniques.",
    },

    {
      title: "End-to-end delivery",
      description:
        "Took the application through implementation, refinement, deployment, and real-world use rather than stopping at a prototype.",
    },
  ],
};