import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

async function getStudy(slug: string) {
  const { data, error } = await supabase
    .from("studies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function StudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = await getStudy(params.slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Image - 90% Width with Rounded Corners */}
      {study.image && (
        <div className="mx-auto w-[90%] px-4 py-8 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: '16/5' }}>
            <Image
              src={study.image}
              alt={study.title}
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
            href="/studies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux projets academiques
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold text-white">{study.title}</h1>
            {study.category && (
              <Badge className="rounded-full bg-netflix-red px-3 py-1 text-white border-netflix-red">
                {study.category}
              </Badge>
            )}
          </div>

          {/* Date */}
          <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {study.date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(study.date).toLocaleDateString("fr-FR", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>

          <p className="mb-6 text-lg text-muted-foreground">
            {study.description}
          </p>

          {/* Tags */}
          {study.tags && study.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {study.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* PDF Link */}
          {study.pdf_url && (
            <div className="flex flex-wrap gap-3">
              <a
                href={study.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-netflix-red px-4 py-2 text-white transition-all hover:bg-[#c0000d] hover:shadow-lg"
              >
                <ExternalLink className="h-4 w-4" />
                Voir le PDF
              </a>
            </div>
          )}
        </div>

        <Separator className="my-8" />

        {/* About Section */}
        {study.full_description && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-white">A propos</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {study.full_description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
