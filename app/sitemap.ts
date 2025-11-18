import { MetadataRoute } from "next";
import projects from "@/data/projects.json";
import trips from "@/data/trips.json";
import blog from "@/data/blog.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mehdislife.com";

  // Static pages
  const staticPages = [
    "",
    "/projects",
    "/trips",
    "/studies",
    "/experience",
    "/goals",
    "/learning",
    "/blog",
    "/timeline",
    "/gallery",
    "/press",
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
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Trip pages
  const tripPages = trips.map((trip) => ({
    url: `${baseUrl}/trips/${trip.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog pages
  const blogPages = blog.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...tripPages, ...blogPages];
}
