import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mehdislife.com";

  // Fetch data from Supabase
  const [projectsRes, studiesRes] = await Promise.all([
    supabase.from("projects").select("slug, updated_at").eq("published", true),
    supabase.from("studies").select("slug, updated_at").eq("published", true),
  ]);

  const projects = projectsRes.data || [];
  const studies = studiesRes.data || [];

  // Static pages
  const staticPages = [
    "",
    "/projects",
    "/studies",
    "/education",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.updated_at ? new Date(project.updated_at) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Study pages
  const studyPages = studies.map((study) => ({
    url: `${baseUrl}/studies/${study.slug}`,
    lastModified: study.updated_at ? new Date(study.updated_at) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...studyPages];
}
