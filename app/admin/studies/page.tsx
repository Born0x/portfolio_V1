"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminStudiesPage() {
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStudy, setEditingStudy] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    full_description: "",
    category: "",
    tags: "",
    date: "",
    image: "",
    pdf_url: "",
  });

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("studies")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching studies:", error);
    } else {
      setStudies(data || []);
    }
    setLoading(false);
  };

  const uploadFiles = async (): Promise<{ imageUrl: string | null, pdfUrl: string | null }> => {
    let imageUrl = formData.image || null;
    let pdfUrl = formData.pdf_url || null;

    setUploading(true);
    try {
      // Upload image
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("project-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      // Upload PDF
      if (pdfFile) {
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.pdf`;
        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(fileName, pdfFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("project-images")
          .getPublicUrl(fileName);

        pdfUrl = publicUrl;
      }

      return { imageUrl, pdfUrl };
    } catch (error: any) {
      alert("Erreur lors de l'upload : " + error.message);
      return { imageUrl, pdfUrl };
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { imageUrl, pdfUrl } = await uploadFiles();

    const studyData = {
      ...formData,
      slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      image: imageUrl,
      pdf_url: pdfUrl,
      category: formData.category || null,
      full_description: formData.full_description || null,
      date: formData.date ? `${formData.date}-01` : null,
    };

    if (editingStudy) {
      const { error } = await supabase
        .from("studies")
        .update(studyData)
        .eq("id", editingStudy.id);

      if (error) {
        alert("Erreur lors de la mise a jour : " + error.message);
      } else {
        alert("Projet academique mis a jour avec succes !");
        resetForm();
        fetchStudies();
      }
    } else {
      const { error } = await supabase.from("studies").insert([studyData]);

      if (error) {
        alert("Erreur lors de la creation : " + error.message);
      } else {
        alert("Projet academique cree avec succes !");
        resetForm();
        fetchStudies();
      }
    }
  };

  const handleEdit = (study: any) => {
    setEditingStudy(study);
    setFormData({
      title: study.title,
      description: study.description,
      full_description: study.full_description || "",
      category: study.category || "",
      tags: study.tags?.join(", ") || "",
      date: study.date ? study.date.substring(0, 7) : "",
      image: study.image || "",
      pdf_url: study.pdf_url || "",
    });
    setImageFile(null);
    setPdfFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Etes-vous sur de vouloir supprimer ce projet academique ?")) return;

    const { error } = await supabase.from("studies").delete().eq("id", id);

    if (error) {
      alert("Erreur lors de la suppression : " + error.message);
    } else {
      alert("Projet academique supprime avec succes !");
      fetchStudies();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      full_description: "",
      category: "",
      tags: "",
      date: "",
      image: "",
      pdf_url: "",
    });
    setImageFile(null);
    setPdfFile(null);
    setEditingStudy(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Projets Academiques
          </h1>
          <p className="text-muted-foreground">
            Gerez vos etudes et recherches
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
            {editingStudy ? "Modifier le projet" : "Nouveau projet"}
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
                  Categorie
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="Recherche, etude de cas, etc."
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
                Description complete
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
                  Tags (separes par des virgules)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="Analyse, Recherche, Data"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Date *
                </label>
                <input
                  type="month"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Image
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
                  <p className="text-sm text-muted-foreground mb-2">Apercu :</p>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
                      alt="Apercu"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                PDF (optionnel)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setPdfFile(e.target.files[0]);
                  }
                }}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-netflix-red file:text-white hover:file:bg-netflix-red/90"
              />
              {(pdfFile || formData.pdf_url) && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {pdfFile ? `Nouveau PDF: ${pdfFile.name}` : "PDF actuel disponible"}
                </p>
              )}
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
                  editingStudy ? "Mettre a jour" : "Creer"
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

      {/* Studies List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-netflix-red" />
        </div>
      ) : studies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun projet academique pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {studies.map((study) => (
            <div
              key={study.id}
              className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {study.title}
                    </h3>
                    {study.category && (
                      <span className="px-2 py-1 text-xs bg-white/10 text-white rounded">
                        {study.category}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2">
                    {study.description}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {new Date(study.date).toLocaleDateString("fr-FR")}
                  </p>
                  {study.tags && study.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {study.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-white/5 text-white rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {study.pdf_url && (
                    <a
                      href={study.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm text-netflix-red hover:underline"
                    >
                      Voir le PDF
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(study)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(study.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {study.image && (
                <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={study.image}
                    alt={study.title}
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
