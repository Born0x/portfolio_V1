import { Metadata } from "next";
import { MediaCard } from "@/components/media-card";
import { SectionTitle } from "@/components/ui/section-title";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Projets Académiques",
  description: "Mes travaux académiques et études de cas professionnelles",
};

async function getStudies() {
  const { data, error } = await supabase
    .from("studies")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching studies:", error);
    return [];
  }

  return data || [];
}

export default async function StudiesPage() {
  const studies = await getStudies();
  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <SectionTitle className="mb-4">Projets Académiques</SectionTitle>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Découvrez mes travaux académiques, rapports de recherche et études de cas
            professionnelles réalisés tout au long de mon parcours.
          </p>
        </div>

        {/* Studies Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <MediaCard
              key={study.id}
              title={study.title}
              description={study.description}
              image={study.image}
              href={`/studies/${study.slug}`}
              tags={study.tags}
              year={study.date ? new Date(study.date).getFullYear() : undefined}
            />
          ))}
        </div>

        {/* Empty State */}
        {studies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-4 text-6xl">📚</div>
            <h3 className="mb-2 text-xl font-semibold text-white">
              Aucune étude pour le moment
            </h3>
            <p className="text-muted-foreground">
              Revenez bientôt pour découvrir mes travaux académiques.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
