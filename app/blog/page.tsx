"use client";

import * as React from "react";
import { X } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { supabase } from "@/lib/supabase";

export default function BlogPage() {
  const [articles, setArticles] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  // Fetch articles from Supabase
  React.useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blog")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching articles:", error);
      } else {
        setArticles(data || []);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  // Get all unique tags from articles
  const allTags = React.useMemo(() => {
    const tagsSet = new Set<string>();
    articles.forEach((article: any) => {
      article.tags?.forEach((tag: string) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [articles]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedTags([]);
  };

  // Filter articles based on selected tags
  const filteredArticles = React.useMemo(() => {
    if (selectedTags.length === 0) {
      return articles;
    }
    return articles.filter((article: any) =>
      selectedTags.every((tag) => article.tags?.includes(tag))
    );
  }, [selectedTags, articles]);

  if (loading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <SectionTitle className="mb-4">Blog</SectionTitle>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Mes reflexions, apprentissages et retours d'experience sur
            l'entrepreneuriat, la tech, les voyages et le developpement personnel.
          </p>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-white">Filtrer par tag :</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? "border-netflix-red bg-netflix-red text-white shadow-lg"
                      : "border-netflix-divider bg-[#1a1a1a] text-muted-foreground hover:border-netflix-red/50 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {selectedTags.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 rounded-full border border-netflix-divider bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-red-500/50 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                  Reinitialiser
                </button>
              )}
            </div>
            {selectedTags.length > 0 && (
              <p className="mt-3 text-sm text-muted-foreground">
                {filteredArticles.length} article{filteredArticles.length > 1 ? "s" : ""} trouve
                {filteredArticles.length > 1 ? "s" : ""}
              </p>
            )}
          </div>
        )}

        {/* Blog Posts List */}
        {filteredArticles.length > 0 ? (
          <div className="mx-auto max-w-[75%] space-y-4">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="group relative overflow-hidden rounded-lg border border-netflix-divider bg-netflix-dark-gray transition-all hover:border-netflix-red/50 hover:bg-[#1f1f1f] hover:shadow-lg"
              >
                <a
                  href={`/blog/${article.slug}`}
                  className="block p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Title */}
                      <h2 className="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-netflix-red">
                        {article.title}
                      </h2>

                      {/* Meta Info */}
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span>
                          {new Date(article.published_at).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        {article.author && (
                          <>
                            <span>•</span>
                            <span>Par {article.author}</span>
                          </>
                        )}
                      </div>

                      {/* Excerpt */}
                      <p className="mb-4 text-muted-foreground line-clamp-2">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="rounded-full border border-netflix-divider bg-[#1a1a1a] px-3 py-1 text-xs font-medium text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-4 text-6xl">📝</div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              Aucun article pour le moment
            </h3>
            <p className="text-muted-foreground">
              Les articles apparaitront ici une fois publies
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
