export type Note = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export const notes: Note[] = [
  {
    slug: "building-reliable-consumers",
    title: "Building Consumers That Fail Usefully",
    description:
      "A short note on failure propagation, observability, and why generic error handling can make distributed systems harder to operate.",
    date: "2026-10-03",
  },
];