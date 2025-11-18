"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCert, setEditingCert] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    description: "",
    credential_url: "",
    obtained_date: "",
    tags: "",
    skills: "",
    logo: "",
  });

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .order("obtained_date", { ascending: false });

    if (error) {
      console.error("Error fetching certifications:", error);
    } else {
      setCertifications(data || []);
    }
    setLoading(false);
  };

  const uploadLogo = async (): Promise<string | null> => {
    if (!imageFile) return formData.logo || null;

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
      alert("Erreur lors de l'upload du logo : " + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const logoUrl = await uploadLogo();

    const certData = {
      ...formData,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
      logo: logoUrl,
      description: formData.description || null,
      credential_url: formData.credential_url || null,
      obtained_date: formData.obtained_date ? `${formData.obtained_date}-01` : null,
    };

    if (editingCert) {
      const { error } = await supabase
        .from("certifications")
        .update(certData)
        .eq("id", editingCert.id);

      if (error) {
        alert("Erreur lors de la mise a jour : " + error.message);
      } else {
        alert("Certification mise a jour avec succes !");
        resetForm();
        fetchCertifications();
      }
    } else {
      const { error } = await supabase.from("certifications").insert([certData]);

      if (error) {
        alert("Erreur lors de la creation : " + error.message);
      } else {
        alert("Certification creee avec succes !");
        resetForm();
        fetchCertifications();
      }
    }
  };

  const handleEdit = (cert: any) => {
    setEditingCert(cert);
    setFormData({
      name: cert.name,
      organization: cert.organization,
      description: cert.description || "",
      credential_url: cert.credential_url || "",
      obtained_date: cert.obtained_date ? cert.obtained_date.substring(0, 7) : "",
      tags: cert.tags?.join(", ") || "",
      skills: cert.skills?.join(", ") || "",
      logo: cert.logo || "",
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Etes-vous sur de vouloir supprimer cette certification ?")) return;

    const { error } = await supabase.from("certifications").delete().eq("id", id);

    if (error) {
      alert("Erreur lors de la suppression : " + error.message);
    } else {
      alert("Certification supprimee avec succes !");
      fetchCertifications();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      organization: "",
      description: "",
      credential_url: "",
      obtained_date: "",
      tags: "",
      skills: "",
      logo: "",
    });
    setImageFile(null);
    setEditingCert(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Certifications
          </h1>
          <p className="text-muted-foreground">
            Gerez vos certifications professionnelles
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-netflix-red hover:bg-netflix-red/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Certification
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 p-6 rounded-lg border border-white/10 bg-white/5">
          <h2 className="text-xl font-bold text-white mb-4">
            {editingCert ? "Modifier la certification" : "Nouvelle certification"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Nom de la certification *
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
                  Organisation *
                </label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({ ...formData, organization: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  URL de la certification
                </label>
                <input
                  type="url"
                  value={formData.credential_url}
                  onChange={(e) =>
                    setFormData({ ...formData, credential_url: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Date d'obtention *
                </label>
                <input
                  type="month"
                  required
                  value={formData.obtained_date}
                  onChange={(e) =>
                    setFormData({ ...formData, obtained_date: e.target.value })
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
                placeholder="Cloud, AWS, DevOps"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              />
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
                placeholder="Architecture, Securite, Automatisation"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Logo de l'organisation
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
                  editingCert ? "Mettre a jour" : "Creer"
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

      {/* Certifications List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-netflix-red" />
        </div>
      ) : certifications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune certification pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4 flex-1">
                  {cert.logo && (
                    <div className="w-16 h-16 rounded-lg bg-white/10 p-2 flex-shrink-0">
                      <img
                        src={cert.logo}
                        alt={cert.organization}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-muted-foreground mb-1">
                      {cert.organization}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(cert.obtained_date).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                    </p>
                    {cert.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {cert.description}
                      </p>
                    )}
                    {cert.tags && cert.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {cert.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-white/5 text-white rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {cert.skills.map((skill: string) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs bg-netflix-red/20 text-netflix-red rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-sm text-netflix-red hover:underline"
                      >
                        Voir la certification
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(cert)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(cert.id)}
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
