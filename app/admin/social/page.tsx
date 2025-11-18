"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Plus, GripVertical } from "lucide-react";

type SocialLink = {
  id: string;
  name: string;
  url: string;
  icon: string;
  order_index: number;
};

const AVAILABLE_ICONS = [
  "linkedin",
  "github",
  "twitter",
  "facebook",
  "instagram",
  "youtube",
  "mail",
  "globe",
  "link",
];

export default function AdminSocialPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    icon: "linkedin",
    order_index: 0,
  });

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Error fetching social links:", error);
    } else {
      setSocialLinks(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        // Update existing link
        const { error } = await supabase
          .from("social_links")
          .update(formData)
          .eq("id", editingId);

        if (error) throw error;
        alert("Lien mis à jour avec succès !");
      } else {
        // Create new link
        const { error } = await supabase.from("social_links").insert([formData]);

        if (error) throw error;
        alert("Lien ajouté avec succès !");
      }

      setFormData({ name: "", url: "", icon: "linkedin", order_index: 0 });
      setEditingId(null);
      fetchSocialLinks();
    } catch (error: any) {
      alert("Erreur : " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (link: SocialLink) => {
    setEditingId(link.id);
    setFormData({
      name: link.name,
      url: link.url,
      icon: link.icon,
      order_index: link.order_index,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce lien ?")) return;

    try {
      const { error } = await supabase.from("social_links").delete().eq("id", id);

      if (error) throw error;
      alert("Lien supprimé avec succès !");
      fetchSocialLinks();
    } catch (error: any) {
      alert("Erreur lors de la suppression : " + error.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", url: "", icon: "linkedin", order_index: 0 });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">
          Réseaux Sociaux
        </h1>
        <p className="text-muted-foreground">
          Gérez vos liens vers les réseaux sociaux
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-xl font-bold text-white">
            {editingId ? "Modifier le lien" : "Ajouter un lien"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Nom du réseau
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                placeholder="LinkedIn"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                URL
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                placeholder="https://linkedin.com/in/votre-profil"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Icône
              </label>
              <select
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                required
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Ordre d'affichage
              </label>
              <input
                type="number"
                value={formData.order_index}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order_index: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                min="0"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-2 bg-netflix-red text-white rounded-md hover:bg-netflix-red/90 transition-colors disabled:opacity-50"
              >
                {saving
                  ? "Enregistrement..."
                  : editingId
                  ? "Mettre à jour"
                  : "Ajouter"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-white/20 text-white rounded-md hover:bg-white/10 transition-colors"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <h2 className="mb-6 text-xl font-bold text-white">
            Liens existants ({socialLinks.length})
          </h2>

          {socialLinks.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              Aucun lien pour le moment
            </p>
          ) : (
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">
                        {link.name}
                      </span>
                      <span className="text-xs text-muted-foreground px-2 py-1 bg-white/5 rounded">
                        {link.icon}
                      </span>
                    </div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-netflix-red hover:underline"
                    >
                      {link.url}
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(link)}
                      className="px-3 py-1 text-sm border border-white/20 text-white rounded hover:bg-white/10 transition-colors"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
