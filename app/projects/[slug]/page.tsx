import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe, Github, Instagram, Linkedin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

async function getProject(slug: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const statusColor = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    in_progress: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    archived: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  const statusLabel = {
    active: "Actif",
    in_progress: "En cours",
    archived: "Archivé",
  };

  return (
    <div className="min-h-screen">
      {/* Hero Image - 90% Width with Rounded Corners */}
      {project.image && (
        <div className="mx-auto w-[90%] px-4 py-8 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: '16/5' }}>
            <Image
              src={project.image}
              alt={project.title}
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
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux projets
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold text-white">{project.title}</h1>
            {project.featured && (
              <Badge className="rounded-full bg-netflix-red px-3 py-1 text-white border-netflix-red">
                Featured
              </Badge>
            )}
            <Badge
              className={`${
                statusColor[project.status as keyof typeof statusColor] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
              } rounded-full border px-3 py-1`}
            >
              {statusLabel[project.status as keyof typeof statusLabel] || project.status}
            </Badge>
          </div>

          {/* Category & Dates */}
          <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {project.category && (
              <>
                <span>{project.category}</span>
                <span>•</span>
              </>
            )}
            {project.start_date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(project.start_date).toLocaleDateString("fr-FR", {
                    month: "long",
                    year: "numeric",
                  })}
                  {project.end_date && (
                    <>
                      {" - "}
                      {new Date(project.end_date).toLocaleDateString("fr-FR", {
                        month: "long",
                        year: "numeric",
                      })}
                    </>
                  )}
                  {!project.end_date && " - Présent"}
                </span>
              </div>
            )}
          </div>

          <p className="mb-6 text-lg text-muted-foreground">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-netflix-red px-4 py-2 text-white transition-all hover:bg-[#c0000d] hover:shadow-lg"
              >
                <Globe className="h-4 w-4" />
                Visiter le site
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white transition-colors hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        </div>

        <Separator className="my-8" />

        {/* About Section */}
        {project.full_description && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-white">À propos</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {project.full_description}
            </p>
          </div>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Technologies utilisées
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Galerie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((imageUrl: string, index: number) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 aspect-video group cursor-pointer"
                >
                  <Image
                    src={imageUrl}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
