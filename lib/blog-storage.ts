// Local storage utilities for blog articles

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  content: string;
  tags: string[];
  publishedAt: string;
  excerpt?: string;
  readingTime?: number;
}

const STORAGE_KEY = "mehdis-life-blog-articles";

export function saveBlogArticle(article: BlogArticle) {
  if (typeof window === "undefined") return;

  const articles = getBlogArticles();
  const existingIndex = articles.findIndex((a) => a.id === article.id);

  if (existingIndex >= 0) {
    articles[existingIndex] = article;
  } else {
    articles.push(article);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

export function getBlogArticles(): BlogArticle[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function deleteBlogArticle(articleId: string) {
  if (typeof window === "undefined") return;

  const articles = getBlogArticles();
  const filtered = articles.filter((a) => a.id !== articleId);
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

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
