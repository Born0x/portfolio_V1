import { Hero } from "@/components/hero";
import { RowCarousel } from "@/components/row-carousel";
import { MediaCard } from "@/components/media-card";
import { SkillsSection } from "@/components/skills-section";
import { ToolsSection } from "@/components/tools-section";
import { supabase } from "@/lib/supabase";
import { GraduationCap, Award, Calendar } from "lucide-react";

export const revalidate = 0; // Disable caching for this page

async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
}

async function getStudies() {
  const { data, error } = await supabase
    .from("studies")
    .select("*")
    .order("date", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Error fetching studies:", error);
    return [];
  }

  return data || [];
}

async function getEducation() {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("start_date", { ascending: false })
    .limit(3);

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
    .order("obtained_date", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching certifications:", error);
    return [];
  }

  return data || [];
}

async function getSettings() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) {
    console.error("Error fetching settings:", error);
    return {};
  }

  const settings: Record<string, string> = {};
  data?.forEach((setting: any) => {
    settings[setting.key] = setting.value;
  });

  return settings;
}

export default async function HomePage() {
  const [projects, studies, education, certifications, settings] = await Promise.all([
    getProjects(),
    getStudies(),
    getEducation(),
    getCertifications(),
    getSettings(),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title={settings.hero_title || "Portfolio de Mehdi Zeroual"}
        tagline={settings.hero_tagline || "Entrepreneur • Développeur • Apprenant"}
        description={settings.hero_description || "Bienvenue dans mon univers. Découvrez mes projets entrepreneuriaux, mes certifications, et mon parcours de développement personnel et professionnel."}
        image={settings.hero_banner || "/images/hero-home.jpg"}
        imageMobile={settings.hero_banner_mobile || settings.hero_banner || "/images/hero-home.jpg"}
        cvUrl={settings.cv_url}
        ctaPrimary={{
          label: "Explorer mes projets",
          href: "/projects",
        }}
        ctaSecondary={{
          label: "Voir mon parcours",
          href: "/education",
        }}
      />

      {/* Projects Section */}
      {projects.length > 0 && (
        <RowCarousel title="Expériences Professionnelles">
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
        </RowCarousel>
      )}

      {/* Studies Section */}
      {studies.length > 0 && (
        <RowCarousel title="Projets Académiques">
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
        </RowCarousel>
      )}

      {/* Skills Section */}
      <SkillsSection />

      {/* Tools Section */}
      <ToolsSection />

      {/* Timeline Section - Education & Certifications */}
      {(education.length > 0 || certifications.length > 0) && (
        <section className="py-16 px-4 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-display text-4xl font-bold text-white">
                Mon Parcours
              </h2>
              <p className="text-lg text-muted-foreground">
                Diplômes et certifications
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Education Timeline */}
              {education.length > 0 && (
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-netflix-red/20 p-3">
                      <GraduationCap className="h-6 w-6 text-netflix-red" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Diplômes</h3>
                  </div>

                  <div className="space-y-6">
                    {education.map((edu: any, index: number) => (
                      <div
                        key={edu.id}
                        className="rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 h-[180px] flex items-start animate-float"
                        style={{
                          animationDelay: `${index * 0.2}s`,
                          animationDuration: `${3 + index * 0.3}s`
                        }}
                      >
                        <div className="flex items-start gap-4 w-full">
                          {edu.logo && (
                            <div className="w-12 h-12 rounded-lg bg-white/10 p-2 flex-shrink-0">
                              <img
                                src={edu.logo}
                                alt={edu.institution}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-bold text-white mb-1">
                              {edu.degree}
                            </h4>
                            <p className="text-muted-foreground mb-2">
                              {edu.institution}
                            </p>
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
                                  : new Date(edu.end_date).toLocaleDateString("fr-FR", {
                                      month: "short",
                                      year: "numeric",
                                    })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <a
                      href="/education"
                      className="text-netflix-red hover:underline font-semibold"
                    >
                      Voir tous mes diplômes →
                    </a>
                  </div>
                </div>
              )}

              {/* Certifications Timeline */}
              {certifications.length > 0 && (
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-netflix-red/20 p-3">
                      <Award className="h-6 w-6 text-netflix-red" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Certifications</h3>
                  </div>

                  <div className="space-y-6">
                    {certifications.map((cert: any, index: number) => (
                      <div
                        key={cert.id}
                        className="rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 h-[180px] flex items-start animate-float"
                        style={{
                          animationDelay: `${index * 0.25}s`,
                          animationDuration: `${3.5 + index * 0.4}s`
                        }}
                      >
                        <div className="flex items-start gap-4 w-full">
                          {cert.logo && (
                            <div className="w-12 h-12 rounded-lg bg-white/10 p-2 flex-shrink-0">
                              <img
                                src={cert.logo}
                                alt={cert.organization}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-bold text-white mb-1">
                              {cert.name}
                            </h4>
                            <p className="text-muted-foreground mb-2">
                              {cert.organization}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(cert.obtained_date).toLocaleDateString("fr-FR", {
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <a
                      href="/education"
                      className="text-netflix-red hover:underline font-semibold"
                    >
                      Voir toutes mes certifications →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-display text-4xl font-bold text-white">
            Découvrez mon parcours
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Explorez mon parcours académique et mes articles de blog
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/education"
              className="rounded-md bg-netflix-red px-6 py-3 font-semibold text-white transition-colors hover:bg-netflix-red/90"
            >
              Mon Parcours
            </a>
            <a
              href="/blog"
              className="rounded-md border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Lire le Blog
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
