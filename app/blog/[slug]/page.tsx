import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

async function getArticle(slug: string) {
  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Image - 90% Width with Rounded Corners */}
      {article.featured_image && (
        <div className="mx-auto w-[90%] px-4 py-8 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: '16/5' }}>
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{article.title}</h1>

          {/* Meta Info */}
          <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {article.published_at && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(article.published_at).toLocaleDateString("fr-FR", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
            {article.author && (
              <>
                <span>•</span>
                <span>Par {article.author}</span>
              </>
            )}
          </div>

          {/* Excerpt */}
          <p className="mb-6 text-lg text-muted-foreground">
            {article.excerpt}
          </p>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <Separator className="my-8" />

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>
      </div>
    </div>
  );
}
