import { MediaCard } from "@/components/media-card";
import { SectionTitle } from "@/components/ui/section-title";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Cache for 60 seconds

async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
}

async function ProjectsList() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-muted-foreground">Aucun projet pour le moment</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <MediaCard
          key={project.id}
          title={project.title}
          description={project.description}
          image={project.image}
          href={`/projects/${project.slug}`}
          tags={project.tags}
          year={project.start_date ? new Date(project.start_date).getFullYear() : undefined}
        />
      ))}
    </div>
  );
}

export default function ProjectsPage() {

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <SectionTitle className="mb-4">Expériences Professionnelles</SectionTitle>
          <p className="text-lg text-muted-foreground max-w-3xl">
            De l'e-commerce à la fintech, découvrez les projets entrepreneuriaux
            sur lesquels je travaille pour créer de la valeur et résoudre des
            problèmes concrets.
          </p>
        </div>

        {/* Projects Grid */}
        <ProjectsList />
      </div>
    </div>
  );
}
