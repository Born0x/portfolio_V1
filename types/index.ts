// Type definitions for the application

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
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface Trip {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  year: number;
  duration: string;
  location: string;
  tags: string[];
  highlights: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  tags: string[];
  readingTime: number;
  category: string;
}

export interface Goal {
  title: string;
  description: string;
  status: "completed" | "in_progress" | "planned";
  timeline?: string;
  metrics?: {
    current: string;
    target: string;
    deadline: string;
  };
}

export interface Pillar {
  id: string;
  title: string;
  icon: string;
  description: string;
  goals: Goal[];
}

export interface GoalsData {
  pillars: Pillar[];
}
