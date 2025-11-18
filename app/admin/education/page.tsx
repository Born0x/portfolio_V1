"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminEducationPage() {
  const [education, setEducation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEdu, setEditingEdu] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    location: "",
    description: "",
    start_date: "",
    end_date: "",
    current: false,
    grade: "",
    skills: "",
    logo: "",
  });

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      console.error("Error fetching education:", error);
    } else {
      setEducation(data || []);
    }
    setLoading(false);
  };

  const uploadLogo = async (): Promise<string | null> => {
    if (!imageFile) return formData.logo || null;

    setUploading(true);
    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      alert("Erreur lors de l'upload du logo : " + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const logoUrl = await uploadLogo();

    const eduData = {
      ...formData,
      slug: formData.degree.toLowerCase().replace(/\s+/g, "-"),
      skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
      logo: logoUrl,
      location: formData.location || null,
      description: formData.description || null,
      start_date: formData.start_date ? `${formData.start_date}-01` : null,
      end_date: formData.current ? null : (formData.end_date ? `${formData.end_date}-01` : null),
      grade: formData.grade || null,
    };

    if (editingEdu) {
      const { error } = await supabase
        .from("education")
        .update(eduData)
        .eq("id", editingEdu.id);

      if (error) {
        alert("Erreur lors de la mise a jour : " + error.message);
      } else {
        alert("Diplome mis a jour avec succes !");
        resetForm();
        fetchEducation();
      }
    } else {
      const { error } = await supabase.from("education").insert([eduData]);

      if (error) {
        alert("Erreur lors de la creation : " + error.message);
      } else {
        alert("Diplome cree avec succes !");
        resetForm();
        fetchEducation();
      }
    }
  };

  const handleEdit = (edu: any) => {
    setEditingEdu(edu);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location || "",
      description: edu.description || "",
      start_date: edu.start_date ? edu.start_date.substring(0, 7) : "",
      end_date: edu.end_date ? edu.end_date.substring(0, 7) : "",
      current: edu.current || false,
      grade: edu.grade || "",
      skills: edu.skills?.join(", ") || "",
      logo: edu.logo || "",
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Etes-vous sur de vouloir supprimer ce diplome ?")) return;

    const { error } = await supabase.from("education").delete().eq("id", id);

    if (error) {
      alert("Erreur lors de la suppression : " + error.message);
    } else {
      alert("Diplome supprime avec succes !");
      fetchEducation();
    }
  };

  const resetForm = () => {
    setFormData({
      degree: "",
      institution: "",
      location: "",
      description: "",
      start_date: "",
      end_date: "",
      current: false,
      grade: "",
      skills: "",
      logo: "",
    });
    setImageFile(null);
    setEditingEdu(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Diplomes
          </h1>
          <p className="text-muted-foreground">
            Gerez votre parcours academique
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-netflix-red hover:bg-netflix-red/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Diplome
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 p-6 rounded-lg border border-white/10 bg-white/5">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingEdu ? "Modifier le diplome" : "Nouveau diplome"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Diplome *
                </label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Localisation
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Paris, France"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Date de debut *
                </label>
                <input
                  type="month"
                  required
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
                  disabled={formData.current}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Mention
                </label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) =>
                    setFormData({ ...formData, grade: e.target.value })
                  }
                  placeholder="Mention Bien"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="current"
                checked={formData.current}
                onChange={(e) =>
                  setFormData({ ...formData, current: e.target.checked, end_date: e.target.checked ? "" : formData.end_date })
                }
                className="h-4 w-4"
              />
              <label htmlFor="current" className="text-sm text-white">
                Formation en cours
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Competences (separees par des virgules)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
                placeholder="Management, Strategie, Innovation"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Logo de l'institution
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
              {(imageFile || formData.logo) && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Apercu :</p>
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={imageFile ? URL.createObjectURL(imageFile) : formData.logo}
                      alt="Apercu"
                      className="w-full h-full object-contain bg-white/10"
                    />
                  </div>
                </div>
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
                  editingEdu ? "Mettre a jour" : "Creer"
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

      {/* Education List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-netflix-red" />
        </div>
      ) : education.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun diplome pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4 flex-1">
                  {edu.logo && (
                    <div className="w-16 h-16 rounded-lg bg-white/10 p-2 flex-shrink-0">
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-muted-foreground mb-1">
                      {edu.institution}
                    </p>
                    {edu.location && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {edu.location}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(edu.start_date).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}
                      {" - "}
                      {edu.current ? "Present" : new Date(edu.end_date).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}
                    </p>
                    {edu.grade && (
                      <p className="text-sm font-semibold text-netflix-red mb-2">
                        {edu.grade}
                      </p>
                    )}
                    {edu.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {edu.description}
                      </p>
                    )}
                    {edu.skills && edu.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {edu.skills.map((skill: string) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs bg-white/5 text-white rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(edu)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(edu.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
