"use client";

import * as React from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddBlogDialogProps {
  onAddArticle: (article: {
    title: string;
    content: string;
    tags: string[];
  }) => void;
}

const PREDEFINED_TAGS = [
  { label: "E-commerce", color: "bg-blue-500" },
  { label: "Étude", color: "bg-purple-500" },
  { label: "Media Buying", color: "bg-green-500" },
  { label: "Religion", color: "bg-yellow-500" },
  { label: "Sport", color: "bg-red-500" },
  { label: "Business", color: "bg-indigo-500" },
  { label: "Tech", color: "bg-cyan-500" },
  { label: "Marketing", color: "bg-pink-500" },
];

export function AddBlogDialog({ onAddArticle }: AddBlogDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAddArticle({
      title,
      content,
      tags: selectedTags,
    });

    // Reset form
    setTitle("");
    setContent("");
    setSelectedTags([]);
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
                className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-netflix-divider bg-netflix-black p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Nouvel Article
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
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Titre de l'article *
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Mon voyage à Istanbul"
                    className="w-full rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-3 text-xl font-semibold text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                    required
                  />
                </div>

                {/* Content */}
                <div>
                  <label
                    htmlFor="content"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Contenu de l'article *
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Écrivez votre article ici..."
                    rows={12}
                    className="w-full rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-3 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                    required
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {content.trim().split(/\s+/).filter(Boolean).length} mots
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-white">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PREDEFINED_TAGS.map((tag) => {
                      const isSelected = selectedTags.includes(tag.label);
                      return (
                        <button
                          key={tag.label}
                          type="button"
                          onClick={() => toggleTag(tag.label)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                            isSelected
                              ? `${tag.color} text-white shadow-lg`
                              : "border border-netflix-divider bg-[#1a1a1a] text-muted-foreground hover:bg-[#2a2a2a]"
                          }`}
                        >
                          {tag.label}
                        </button>
                      );
                    })}
                  </div>
                  {selectedTags.length > 0 && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      {selectedTags.length} tag(s) sélectionné(s)
                    </p>
                  )}
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
                    disabled={!title.trim() || !content.trim()}
                  >
                    Publier
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
