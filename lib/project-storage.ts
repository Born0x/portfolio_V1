// Local storage utilities for projects

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  year: number;
  tags: string[];
  status: string;
  role: string;
  technologies: string[];
  links: {
    website?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
}

const STORAGE_KEY = "mehdis-life-projects";

export function saveProject(project: Project) {
  if (typeof window === "undefined") return;

  const projects = getProjects();
  const existingIndex = projects.findIndex((p) => p.id === project.id);

  if (existingIndex >= 0) {
    projects[existingIndex] = project;
  } else {
    projects.push(project);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProjects(): Project[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function deleteProject(projectId: string) {
  if (typeof window === "undefined") return;

  const projects = getProjects();
  const filtered = projects.filter((p) => p.id !== projectId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
