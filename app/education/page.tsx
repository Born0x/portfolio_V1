import { SectionTitle } from "@/components/ui/section-title";
import { GraduationCap, Award, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export const metadata = {
  title: "Mon Parcours",
  description: "Découvrez mon parcours académique et professionnel à travers mes diplômes et certifications.",
};

async function getEducation() {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) {
    console.error("Error fetching education:", error);
    return [];
  }

  return data || [];
}

async function getCertifications() {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("obtained_date", { ascending: false });

  if (error) {
    console.error("Error fetching certifications:", error);
    return [];
  }

  return data || [];
}

export default async function EducationPage() {
  const [education, certifications] = await Promise.all([
    getEducation(),
    getCertifications(),
  ]);
  // Combine and sort all items by date
  const allItems = [
    ...education.map((item) => ({
      ...item,
      type: "education" as const,
      date: item.end_date || item.start_date,
    })),
    ...certifications.map((item) => ({
      ...item,
      type: "certification" as const,
      date: item.obtained_date,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <SectionTitle className="mb-4">Mon Parcours</SectionTitle>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Découvrez mon parcours académique et professionnel à travers mes diplômes et certifications.
          </p>
        </div>

        {/* Diplômes Section */}
        <section className="mb-16">
          <h2 className="flex items-center gap-3 font-display text-3xl font-bold text-white mb-8">
            <GraduationCap className="h-8 w-8 text-netflix-red" />
            Diplômes
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:border-netflix-red/50 hover:bg-white/10"
              >
                {/* Logo if available */}
                {edu.logo && (
                  <div className="mb-4 h-16 w-16 rounded-lg bg-white/10 p-2">
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}

                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-netflix-red transition-colors">
                  {edu.degree}
                </h3>

                <div className="mb-4 space-y-2">
                  <p className="text-lg text-muted-foreground">{edu.institution}</p>
                  {edu.location && (
                    <p className="text-sm text-muted-foreground">{edu.location}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(edu.start_date).toLocaleDateString("fr-FR", {
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {edu.current
                        ? "Présent"
                        : new Date(edu.end_date!).toLocaleDateString("fr-FR", {
                            month: "short",
                            year: "numeric",
                          })}
                    </span>
                  </div>
                  {edu.grade && (
                    <p className="text-sm font-semibold text-netflix-red">{edu.grade}</p>
                  )}
                </div>

                {edu.description && (
                  <p className="mb-4 text-sm text-muted-foreground">{edu.description}</p>
                )}

                {edu.skills && edu.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {edu.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-netflix-divider bg-[#1a1a1a] px-3 py-1 text-xs font-medium text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="mb-16">
          <h2 className="flex items-center gap-3 font-display text-3xl font-bold text-white mb-8">
            <Award className="h-8 w-8 text-netflix-red" />
            Certifications
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:border-netflix-red/50 hover:bg-white/10"
              >
                {/* Logo if available */}
                {cert.logo && (
                  <div className="mb-4 h-16 w-16 rounded-lg bg-white/10 p-2">
                    <img
                      src={cert.logo}
                      alt={cert.organization}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}

                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-netflix-red transition-colors">
                  {cert.name}
                </h3>

                <div className="mb-4 space-y-2">
                  <p className="text-lg text-muted-foreground">{cert.organization}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Obtenue en{" "}
                      {new Date(cert.obtained_date).toLocaleDateString("fr-FR", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {cert.description && (
                  <p className="mb-4 text-sm text-muted-foreground">{cert.description}</p>
                )}

                {cert.tags && cert.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-netflix-divider bg-[#1a1a1a] px-3 py-1 text-xs font-medium text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-netflix-red hover:underline"
                  >
                    Voir le certificat →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section>
          <h2 className="font-display text-3xl font-bold text-white mb-8">
            Chronologie
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-netflix-divider" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {allItems.map((item, index) => (
                <div key={`${item.type}-${item.id}`} className="relative pl-20">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-6 top-2 h-5 w-5 rounded-full border-4 ${
                      item.type === "education"
                        ? "border-green-500 bg-green-500/20"
                        : "border-purple-500 bg-purple-500/20"
                    }`}
                  />

                  {/* Content */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {item.type === "education" ? (
                            <GraduationCap className="h-5 w-5 text-green-500" />
                          ) : (
                            <Award className="h-5 w-5 text-purple-500" />
                          )}
                          <span className="text-sm font-semibold text-muted-foreground">
                            {item.type === "education" ? "Diplôme" : "Certification"}
                          </span>
                        </div>
                        <h3 className="font-bold text-white mb-1">
                          {item.type === "education"
                            ? (item as any).degree
                            : (item as any).name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.type === "education"
                            ? (item as any).institution
                            : (item as any).organization}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-muted-foreground">
                          {new Date(item.date).toLocaleDateString("fr-FR", {
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
