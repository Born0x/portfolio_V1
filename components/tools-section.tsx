"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Tool = {
  name: string;
  logo: string;
  tags: string[];
};

export function ToolsSection() {
  const tags = [
    "E-commerce & Web",
    "Analyse & Programmation",
    "Création & Média",
    "Bureautique",
    "IA & Code"
  ];

  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Error fetching tools:", error);
    } else {
      setTools(data || []);
    }
    setLoading(false);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredTools = selectedTags.length === 0
    ? tools
    : tools.filter(tool =>
        selectedTags.some(tag => tool.tags.includes(tag))
      );

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-4xl font-bold text-white">
            Outils & Technologies
          </h2>
          <p className="text-lg text-muted-foreground">
            Les outils que j'utilise au quotidien
          </p>
        </div>

        {/* Tag Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                selectedTags.includes(tag)
                  ? "bg-netflix-red text-white shadow-lg shadow-netflix-red/30"
                  : "bg-white/10 text-muted-foreground hover:bg-white/20 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Clear Filters Button */}
        {selectedTags.length > 0 && (
          <div className="mb-6 text-center">
            <button
              onClick={() => setSelectedTags([])}
              className="text-sm text-netflix-red hover:underline"
            >
              Effacer les filtres
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Chargement des outils...</p>
          </div>
        ) : (
          <>
            {/* Tools Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredTools.map((tool) => (
                <div
                  key={tool.name}
                  className="group flex flex-col items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-netflix-red/50 hover:shadow-lg"
                >
                  <div className="h-16 w-16 grayscale transition-all group-hover:grayscale-0">
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-center text-sm font-medium text-muted-foreground group-hover:text-white transition-colors">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Aucun outil trouvé pour cette sélection
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
