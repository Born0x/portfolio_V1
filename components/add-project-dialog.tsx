"use client";

import * as React from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddProjectDialogProps {
  onAddProject: (project: {
    title: string;
    description: string;
    fullDescription: string;
    year: number;
    tags: string[];
    status: string;
    role: string;
    technologies: string[];
    links: {
      website?: string;
      instagram?: string;
      linkedin?: string;
      github?: string;
    };
  }) => void;
}

const PREDEFINED_TAGS = [
  "E-commerce",
  "Santé",
  "Femtech",
  "Startup",
  "Puériculture",
  "Premium",
  "Bio",
  "Fintech",
  "Investissement",
  "SaaS",
  "Web3",
  "Tech",
  "Marketing",
];

const PREDEFINED_TECHNOLOGIES = [
  "Shopify",
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Stripe",
  "Instagram",
  "Facebook Ads",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "Python",
];

const STATUS_OPTIONS = ["En cours", "Lancé", "En développement", "Terminé", "En pause"];

export function AddProjectDialog({ onAddProject }: AddProjectDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [fullDescription, setFullDescription] = React.useState("");
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [status, setStatus] = React.useState("En cours");
  const [role, setRole] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = React.useState<string[]>([]);
  const [website, setWebsite] = React.useState("");
  const [instagram, setInstagram] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [github, setGithub] = React.useState("");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !role.trim()) return;

    const links: any = {};
    if (website.trim()) links.website = website.trim();
    if (instagram.trim()) links.instagram = instagram.trim();
    if (linkedin.trim()) links.linkedin = linkedin.trim();
    if (github.trim()) links.github = github.trim();

    onAddProject({
      title,
      description,
      fullDescription: fullDescription || description,
      year,
      tags: selectedTags,
      status,
      role,
      technologies: selectedTechnologies,
      links,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setFullDescription("");
    setYear(new Date().getFullYear());
    setStatus("En cours");
    setRole("");
    setSelectedTags([]);
    setSelectedTechnologies([]);
    setWebsite("");
    setInstagram("");
    setLinkedin("");
    setGithub("");
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-netflix-red shadow-lg transition-all hover:scale-110 hover:shadow-xl md:bottom-12 md:right-12"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Plus className="h-6 w-6 text-white" />
      </motion.button>

      {/* Dialog */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />

            {/* Dialog Content - Scrollable Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-netflix-divider bg-netflix-black p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    Nouveau Projet
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 transition-colors hover:bg-[#2a2a2a]"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Nom du projet *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex: Bleedi"
                      className="w-full rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-3 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                      required
                    />
                  </div>

                  {/* Row: Role + Year + Status */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Votre rôle *
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Ex: Co-fondateur & CEO"
                        className="w-full rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-3 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Année
                      </label>
                      <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value))}
                        min="2000"
                        max="2100"
                        className="w-full rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-3 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Statut
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-3 text-white transition-colors focus:border-netflix-red focus:outline-none"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      Description courte *
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Une courte description du projet..."
                      rows={2}
                      className="w-full rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-3 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                      required
                    />
                  </div>

                  {/* Full Description */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                      À propos (description complète)
                    </label>
                    <textarea
                      value={fullDescription}
                      onChange={(e) => setFullDescription(e.target.value)}
                      placeholder="Description détaillée du projet..."
                      rows={4}
                      className="w-full rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-3 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-white">
                      Tags / Domaines
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PREDEFINED_TAGS.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                              isSelected
                                ? "bg-netflix-red text-white shadow-lg"
                                : "border border-netflix-divider bg-[#1a1a1a] text-muted-foreground hover:bg-[#2a2a2a]"
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-white">
                      Technologies utilisées
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PREDEFINED_TECHNOLOGIES.map((tech) => {
                        const isSelected = selectedTechnologies.includes(tech);
                        return (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => toggleTechnology(tech)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                              isSelected
                                ? "bg-blue-600 text-white shadow-lg"
                                : "border border-netflix-divider bg-[#1a1a1a] text-muted-foreground hover:bg-[#2a2a2a]"
                            }`}
                          >
                            {tech}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Links */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-white">
                      Liens
                    </label>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Site web (https://...)"
                        className="rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-2 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                      />
                      <input
                        type="url"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="Instagram (https://...)"
                        className="rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-2 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                      />
                      <input
                        type="url"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="LinkedIn (https://...)"
                        className="rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-2 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                      />
                      <input
                        type="url"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="GitHub (https://...)"
                        className="rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-2 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 rounded-lg border border-netflix-divider bg-transparent px-4 py-3 text-white transition-colors hover:bg-[#2a2a2a]"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-lg bg-netflix-red px-4 py-3 text-white transition-all hover:bg-[#c0000d] hover:shadow-lg disabled:opacity-50"
                      disabled={!title.trim() || !description.trim() || !role.trim()}
                    >
                      Ajouter le projet
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
