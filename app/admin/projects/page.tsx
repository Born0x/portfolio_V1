"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    full_description: "",
    category: "",
    technologies: "",
    tags: "",
    github_url: "",
    live_url: "",
    status: "active",
    featured: false,
    start_date: "",
    end_date: "",
    image: "",
    gallery: [] as string[],
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return formData.image || null;

    setUploading(true);
    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("project-images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      alert("Erreur lors de l'upload de l'image : " + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadGalleryImages = async (): Promise<string[]> => {
    if (galleryFiles.length === 0) return formData.gallery || [];

    setUploading(true);
    try {
      const uploadedUrls: string[] = [...formData.gallery];

      for (const file of galleryFiles) {
        const fileExt = file.name.split(".").pop();
        const fileName = `gallery-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("project-images")
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
      }

      return uploadedUrls;
    } catch (error: any) {
      alert("Erreur lors de l'upload des images de la galerie : " + error.message);
      return formData.gallery || [];
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imageUrl = await uploadImage();
    const galleryUrls = await uploadGalleryImages();

    const projectData = {
      ...formData,
      slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
      technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      image: imageUrl,
      gallery: galleryUrls,
      // Convert YYYY-MM to YYYY-MM-01 for PostgreSQL date fields
      start_date: formData.start_date ? `${formData.start_date}-01` : null,
      end_date: formData.end_date ? `${formData.end_date}-01` : null,
      github_url: formData.github_url || null,
      live_url: formData.live_url || null,
      category: formData.category || null,
      full_description: formData.full_description || null,
    };

    if (editingProject) {
      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", editingProject.id);

      if (error) {
        alert("Erreur lors de la mise à jour : " + error.message);
      } else {
        alert("Projet mis à jour avec succès !");
        resetForm();
        fetchProjects();
      }
    } else {
      const { error } = await supabase.from("projects").insert([projectData]);

      if (error) {
        alert("Erreur lors de la création : " + error.message);
      } else {
        alert("Projet créé avec succès !");
        resetForm();
        fetchProjects();
      }
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      full_description: project.full_description || "",
      category: project.category || "",
      technologies: project.technologies?.join(", ") || "",
      tags: project.tags?.join(", ") || "",
      github_url: project.github_url || "",
      live_url: project.live_url || "",
      status: project.status || "active",
      featured: project.featured || false,
      start_date: project.start_date ? project.start_date.substring(0, 7) : "",
      end_date: project.end_date ? project.end_date.substring(0, 7) : "",
      image: project.image || "",
      gallery: project.gallery || [],
    });
    setImageFile(null);
    setGalleryFiles([]);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      alert("Erreur lors de la suppression : " + error.message);
    } else {
      alert("Projet supprimé avec succès !");
      fetchProjects();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      full_description: "",
      category: "",
      technologies: "",
      tags: "",
      github_url: "",
      live_url: "",
      status: "active",
      featured: false,
      start_date: "",
      end_date: "",
      image: "",
      gallery: [],
    });
    setImageFile(null);
    setGalleryFiles([]);
    setEditingProject(null);
    setShowForm(false);
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, index) => index !== indexToRemove),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Expériences Professionnelles
          </h1>
          <p className="text-muted-foreground">
            Gérez vos projets entrepreneuriaux
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-netflix-red hover:bg-netflix-red/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Projet
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 p-6 rounded-lg border border-white/10 bg-white/5">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingProject ? "Modifier le projet" : "Nouveau projet"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  Catégorie
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description courte *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={2}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description complète
              </label>
              <textarea
                value={formData.full_description}
                onChange={(e) =>
                  setFormData({ ...formData, full_description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Technologies (séparées par des virgules)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  placeholder="React, Node.js, PostgreSQL"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="E-commerce, SaaS, MVP"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  URL GitHub
                </label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) =>
                    setFormData({ ...formData, github_url: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  URL Live
                </label>
                <input
                  type="url"
                  value={formData.live_url}
                  onChange={(e) =>
                    setFormData({ ...formData, live_url: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Statut
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                >
                  <option value="active">Actif</option>
                  <option value="in_progress">En cours</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Date de début
                </label>
                <input
                  type="month"
                  value={formData.start_date}
                  onChange={(e) =>
                    setFormData({ ...formData, start_date: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Date de fin
                </label>
                <input
                  type="month"
                  value={formData.end_date}
                  onChange={(e) =>
                    setFormData({ ...formData, end_date: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Image de bannière du projet
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
              {(imageFile || formData.image) && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Aperçu :</p>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
                      alt="Aperçu"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Galerie d'images (plusieurs images)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setGalleryFiles(Array.from(e.target.files));
                  }
                }}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-netflix-red file:text-white hover:file:bg-netflix-red/90"
              />

              {/* Existing Gallery Images */}
              {formData.gallery.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Images actuelles :</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.gallery.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Galerie ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-white/10"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Gallery Files Preview */}
              {galleryFiles.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Nouvelles images à ajouter ({galleryFiles.length}) :</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Nouvelle ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-white/10"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="h-4 w-4"
              />
              <label htmlFor="featured" className="text-sm text-white">
                Projet mis en avant
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
                  editingProject ? "Mettre à jour" : "Créer"
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

      {/* Projects List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-netflix-red" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun projet pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-1 text-xs bg-netflix-red text-white rounded">
                        Featured
                      </span>
                    )}
                    <span className="px-2 py-1 text-xs bg-white/10 text-white rounded">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-white/5 text-white rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                      >
                        GitHub →
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                      >
                        Live →
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(project)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {project.image && (
                <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
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
