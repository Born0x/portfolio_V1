"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2 } from "lucide-react";

const AVAILABLE_TAGS = [
  "E-commerce & Web",
  "Analyse & Programmation",
  "Création & Média",
  "Bureautique",
  "IA & Code"
];

export default function AdminToolsPage() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTool, setEditingTool] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    tags: [] as string[],
    order_index: 0,
  });

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

  const uploadLogo = async () => {
    if (!logoFile) return formData.logo;

    setUploading(true);
    try {
      const fileExt = logoFile.name.split(".").pop();
      const fileName = `tool-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("tool-logos")
        .upload(fileName, logoFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("tool-logos")
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error: any) {
      alert("Erreur lors de l'upload du logo : " + error.message);
      return formData.logo;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const logoUrl = await uploadLogo();

    const toolData = {
      name: formData.name,
      logo: logoUrl,
      tags: formData.tags,
      order_index: formData.order_index,
    };

    if (editingTool) {
      const { error } = await supabase
        .from("tools")
        .update(toolData)
        .eq("id", editingTool.id);

      if (error) {
        alert("Erreur lors de la mise à jour : " + error.message);
      } else {
        alert("Outil mis à jour avec succès !");
        fetchTools();
        resetForm();
      }
    } else {
      const { error } = await supabase.from("tools").insert([toolData]);

      if (error) {
        alert("Erreur lors de la création : " + error.message);
      } else {
        alert("Outil créé avec succès !");
        fetchTools();
        resetForm();
      }
    }
  };

  const handleEdit = (tool: any) => {
    setEditingTool(tool);
    setFormData({
      name: tool.name,
      logo: tool.logo,
      tags: tool.tags || [],
      order_index: tool.order_index || 0,
    });
    setLogoFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet outil ?")) return;

    const { error } = await supabase.from("tools").delete().eq("id", id);

    if (error) {
      alert("Erreur lors de la suppression : " + error.message);
    } else {
      alert("Outil supprimé avec succès !");
      fetchTools();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      logo: "",
      tags: [],
      order_index: 0,
    });
    setLogoFile(null);
    setEditingTool(null);
    setShowForm(false);
  };

  const toggleTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.includes(tag)
        ? formData.tags.filter(t => t !== tag)
        : [...formData.tags, tag]
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Outils & Technologies
          </h1>
          <p className="text-muted-foreground">
            Gérez les logos et catégories de vos outils
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-netflix-red text-white rounded-md hover:bg-netflix-red/90 transition-colors"
        >
          {showForm ? "Annuler" : "Ajouter un outil"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-lg border border-white/10 bg-white/5 p-6"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            {editingTool ? "Modifier l'outil" : "Nouvel outil"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Nom de l'outil *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Logo *
              </label>
              <input
                type="file"
                accept="image/*,.svg"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setLogoFile(e.target.files[0]);
                  }
                }}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-netflix-red file:text-white hover:file:bg-netflix-red/90"
              />

              {(logoFile || formData.logo) && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Aperçu :</p>
                  <div className="w-24 h-24 rounded-lg border border-white/10 bg-white/5 p-4">
                    <img
                      src={logoFile ? URL.createObjectURL(logoFile) : formData.logo}
                      alt="Aperçu"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Catégories *
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      formData.tags.includes(tag)
                        ? "bg-netflix-red text-white"
                        : "bg-white/10 text-muted-foreground hover:bg-white/20"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {formData.tags.length === 0 && (
                <p className="mt-2 text-sm text-red-400">
                  Veuillez sélectionner au moins une catégorie
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Ordre d'affichage
              </label>
              <input
                type="number"
                value={formData.order_index}
                onChange={(e) =>
                  setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={uploading || formData.tags.length === 0}
                className="px-6 py-2 bg-netflix-red text-white rounded-md hover:bg-netflix-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Upload..." : editingTool ? "Mettre à jour" : "Créer"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-lg bg-white/10 p-3">
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <button
                  onClick={() => handleDelete(tool.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>

              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-1">Catégories :</p>
                <div className="flex flex-wrap gap-1">
                  {tool.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-netflix-red/20 text-netflix-red"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground">
                  Ordre: {tool.order_index}
                </p>
              </div>

              <button
                onClick={() => handleEdit(tool)}
                className="w-full px-4 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
              >
                Modifier
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
