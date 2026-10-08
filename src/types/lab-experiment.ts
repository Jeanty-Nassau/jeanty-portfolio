export type LabExperiment = {
  slug: string;
  title: string;
  summary: string;
  technologies: string[];
  year?: string;
  status?: "complete" | "ongoing";
  featured?: boolean;
  repositoryUrl?: string;
};
