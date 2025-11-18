"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import projectsData from "@/data/projects.json";
import studiesData from "@/data/studies.json";

export default function MigratePage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const migrateProjects = async () => {
    setLoading(true);
    const migrationResults = [];

    for (const project of projectsData) {
      const projectData = {
        slug: project.slug,
        title: project.title,
        description: project.description,
        full_description: project.fullDescription,
        image: project.image,
        category: project.tags?.[0] || null,
        technologies: project.technologies || [],
        tags: project.tags || [],
        github_url: project.links?.github || null,
        live_url: project.links?.website || null,
        status: project.status === "Lancé" ? "active" : project.status === "En cours" ? "in_progress" : "active",
        featured: false,
        start_date: `${project.year}-01-01`,
        end_date: null,
      };

      const { error } = await supabase.from("projects").insert([projectData]);

      migrationResults.push({
        name: project.title,
        success: !error,
        error: error?.message,
      });
    }

    setResults((prev) => [...prev, ...migrationResults]);
    setLoading(false);
  };

  const migrateStudies = async () => {
    setLoading(true);
    const migrationResults = [];

    for (const study of studiesData) {
      const studyData = {
        slug: study.slug,
        title: study.title,
        description: study.description,
        full_description: study.fullDescription,
        image: study.image,
        category: study.category || null,
        tags: study.tags || [],
        pdf_url: study.pdfUrl || null,
        date: study.completedAt,
      };

      const { error } = await supabase.from("studies").insert([studyData]);

      migrationResults.push({
        name: study.title,
        success: !error,
        error: error?.message,
      });
    }

    setResults((prev) => [...prev, ...migrationResults]);
    setLoading(false);
  };

  const migrateAll = async () => {
    setResults([]);
    await migrateProjects();
    await migrateStudies();
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">
          Migration des données
        </h1>
        <p className="text-muted-foreground">
          Migrez vos données depuis les fichiers JSON vers Supabase
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="p-6 rounded-lg border border-white/10 bg-white/5">
          <h2 className="text-xl font-bold text-white mb-4">
            Projets (Expériences Professionnelles)
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {projectsData.length} projets à migrer depuis projects.json
          </p>
          <Button
            onClick={migrateProjects}
            disabled={loading}
            className="bg-netflix-red hover:bg-netflix-red/90"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Migration en cours...
              </>
            ) : (
              "Migrer les projets"
            )}
          </Button>
        </div>

        <div className="p-6 rounded-lg border border-white/10 bg-white/5">
          <h2 className="text-xl font-bold text-white mb-4">
            Studies (Projets Académiques)
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {studiesData.length} études à migrer depuis studies.json
          </p>
          <Button
            onClick={migrateStudies}
            disabled={loading}
            className="bg-netflix-red hover:bg-netflix-red/90"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Migration en cours...
              </>
            ) : (
              "Migrer les études"
            )}
          </Button>
        </div>

        <div className="p-6 rounded-lg border border-white/10 bg-white/5">
          <h2 className="text-xl font-bold text-white mb-4">Tout migrer</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Migrer tous les contenus en une seule fois
          </p>
          <Button
            onClick={migrateAll}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Migration en cours...
              </>
            ) : (
              "Migrer tout"
            )}
          </Button>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="p-6 rounded-lg border border-white/10 bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Résultats</h2>
            <Button variant="outline" size="sm" onClick={clearResults}>
              Effacer
            </Button>
          </div>
          <div className="space-y-2">
            {results.map((result, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded bg-white/5"
              >
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <div className="flex-1">
                  <p className="text-white font-medium">{result.name}</p>
                  {result.error && (
                    <p className="text-sm text-red-400">{result.error}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-white/5 rounded">
            <p className="text-sm text-muted-foreground">
              ✅ Réussis: {results.filter((r) => r.success).length} / ❌ Échecs:{" "}
              {results.filter((r) => !r.success).length}
            </p>
          </div>
        </div>
      )}

      {/* Warning */}
      <div className="mt-8 p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
        <p className="text-sm text-yellow-500">
          ⚠️ Attention : Cette migration va ajouter les données à Supabase. Si
          vous l'exécutez plusieurs fois, vous aurez des doublons. Assurez-vous
          de ne migrer qu'une seule fois.
        </p>
      </div>
    </div>
  );
}
