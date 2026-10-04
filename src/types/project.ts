import type { CaseStudyMetric } from "@/types/case-study";

export type ProjectCategory =
  | "backend"
  | "distributed-systems"
  | "full-stack"
  | "creative-code";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;

  category: ProjectCategory;

  technologies: string[];

  metrics?: CaseStudyMetric[];

  year?: string;
  company?: string;

  featured: boolean;

  confidential?: boolean;
  
  links?: ProjectLinks;
};

export type ProjectLinks = {
  live?: string;
  github?: string;
};