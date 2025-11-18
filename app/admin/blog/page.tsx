"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    tags: "",
    published: true,
    featured_image: "",
    published_at: "",
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching articles:", error);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return formData.featured_image || null;

    setUploading(true);
    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error: any) {
      alert("Erreur lors de l'upload de l'image : " + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imageUrl = await uploadImage();

    const articleData = {
      ...formData,
      slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      featured_image: imageUrl,
      author: formData.author || null,
      published_at: formData.published_at ? `${formData.published_at}-01` : new Date().toISOString().split('T')[0],
    };

    if (editingArticle) {
      const { error } = await supabase
        .from("blog")
        .update(articleData)
        .eq("id", editingArticle.id);

      if (error) {
        alert("Erreur lors de la mise a jour : " + error.message);
      } else {
        alert("Article mis a jour avec succes !");
        resetForm();
        fetchArticles();
      }
    } else {
      const { error } = await supabase.from("blog").insert([articleData]);

      if (error) {
        alert("Erreur lors de la creation : " + error.message);
      } else {
        alert("Article cree avec succes !");
        resetForm();
        fetchArticles();
      }
    }
  };

  const handleEdit = (article: any) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      author: article.author || "",
      tags: article.tags?.join(", ") || "",
      published: article.published ?? true,
      featured_image: article.featured_image || "",
      published_at: article.published_at ? article.published_at.substring(0, 7) : "",
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Etes-vous sur de vouloir supprimer cet article ?")) return;

    const { error } = await supabase.from("blog").delete().eq("id", id);

    if (error) {
      alert("Erreur lors de la suppression : " + error.message);
    } else {
      alert("Article supprime avec succes !");
      fetchArticles();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      tags: "",
      published: true,
      featured_image: "",
      published_at: "",
    });
    setImageFile(null);
    setEditingArticle(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Articles de Blog
          </h1>
          <p className="text-muted-foreground">
            Gerez vos articles de blog
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-netflix-red hover:bg-netflix-red/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvel Article
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 p-6 rounded-lg border border-white/10 bg-white/5">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingArticle ? "Modifier l'article" : "Nouvel article"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Titre *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Extrait *
              </label>
              <textarea
                required
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={2}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Contenu *
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={10}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white font-mono text-sm"
                placeholder="Vous pouvez utiliser du Markdown..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Auteur
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  placeholder="Votre nom"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Date de publication
                </label>
                <input
                  type="month"
                  value={formData.published_at}
                  onChange={(e) =>
                    setFormData({ ...formData, published_at: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tags (separes par des virgules)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder="Developpement, React, Tutorial"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Image de couverture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-netflix-red file:text-white hover:file:bg-netflix-red/90"
              />
              {(imageFile || formData.featured_image) && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Apercu :</p>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={imageFile ? URL.createObjectURL(imageFile) : formData.featured_image}
                      alt="Apercu"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="h-4 w-4"
              />
              <label htmlFor="published" className="text-sm text-white">
                Article publie
              </label>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={uploading}
                className="bg-netflix-red hover:bg-netflix-red/90"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Upload en cours...
                  </>
                ) : (
                  editingArticle ? "Mettre a jour" : "Creer"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={uploading}
              >
                Annuler
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Articles List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-netflix-red" />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun article pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {article.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      article.published
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}>
                      {article.published ? "Publie" : "Brouillon"}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    {article.excerpt}
                  </p>
                  {article.author && (
                    <p className="text-sm text-muted-foreground mb-1">
                      Par {article.author}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mb-2">
                    {new Date(article.published_at).toLocaleDateString("fr-FR")}
                  </p>
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-white/5 text-white rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(article)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(article.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {article.featured_image && (
                <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={article.featured_image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
