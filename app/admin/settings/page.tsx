"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Setting = {
  key: string;
  value: string;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    hero_banner: "",
    hero_banner_mobile: "",
    hero_title: "",
    hero_tagline: "",
    hero_description: "",
    cv_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerMobileFile, setBannerMobileFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error) {
      console.error("Error fetching settings:", error);
    } else {
      const settingsObj: Record<string, string> = {};
      data?.forEach((setting: Setting) => {
        settingsObj[setting.key] = setting.value;
      });
      setSettings(settingsObj);
    }
    setLoading(false);
  };

  const uploadBanner = async () => {
    if (!bannerFile) return settings.hero_banner;

    setUploading(true);
    try {
      const fileExt = bannerFile.name.split(".").pop();
      const fileName = `hero-banner-desktop-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(fileName, bannerFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error: any) {
      alert("Erreur lors de l'upload de l'image : " + error.message);
      return settings.hero_banner;
    } finally {
      setUploading(false);
    }
  };

  const uploadBannerMobile = async () => {
    if (!bannerMobileFile) return settings.hero_banner_mobile;

    setUploading(true);
    try {
      const fileExt = bannerMobileFile.name.split(".").pop();
      const fileName = `hero-banner-mobile-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(fileName, bannerMobileFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error: any) {
      alert("Erreur lors de l'upload de l'image mobile : " + error.message);
      return settings.hero_banner_mobile;
    } finally {
      setUploading(false);
    }
  };

  const uploadCV = async () => {
    if (!cvFile) return settings.cv_url;

    setUploading(true);
    try {
      const fileExt = cvFile.name.split(".").pop();
      const fileName = `cv-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(fileName, cvFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error: any) {
      alert("Erreur lors de l'upload du CV : " + error.message);
      return settings.cv_url;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Upload files if new files are selected
      const bannerUrl = await uploadBanner();
      const bannerMobileUrl = await uploadBannerMobile();
      const cvUrl = await uploadCV();

      // Update all settings
      const updates = [
        { key: "hero_banner", value: bannerUrl },
        { key: "hero_banner_mobile", value: bannerMobileUrl },
        { key: "hero_title", value: settings.hero_title },
        { key: "hero_tagline", value: settings.hero_tagline },
        { key: "hero_description", value: settings.hero_description },
        { key: "cv_url", value: cvUrl },
      ];

      for (const update of updates) {
        const { error } = await supabase
          .from("site_settings")
          .upsert(update, { onConflict: "key" });

        if (error) throw error;
      }

      alert("Paramètres mis à jour avec succès !");
      setBannerFile(null);
      setBannerMobileFile(null);
      setCvFile(null);
      fetchSettings();
    } catch (error: any) {
      alert("Erreur lors de la mise à jour : " + error.message);
    } finally {
      setSaving(false);
    }
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
          Paramètres du site
        </h1>
        <p className="text-muted-foreground">
          Gérez les paramètres de la page d'accueil
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl rounded-lg border border-white/10 bg-white/5 p-6"
      >
        <h2 className="mb-6 text-xl font-bold text-white">
          Section Hero (Bannière principale)
        </h2>

        <div className="space-y-6">
          {/* Banner Image Desktop */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Image de bannière (Desktop)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setBannerFile(e.target.files[0]);
                }
              }}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-netflix-red file:text-white hover:file:bg-netflix-red/90"
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Résolution recommandée : 1920×1080 pixels (16:9) - Affichée sur ordinateur
            </p>

            {(bannerFile || settings.hero_banner) && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {bannerFile ? "Nouvel aperçu :" : "Image actuelle :"}
                </p>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={
                      bannerFile
                        ? URL.createObjectURL(bannerFile)
                        : settings.hero_banner
                    }
                    alt="Aperçu bannière desktop"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Banner Image Mobile */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Image de bannière (Mobile)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setBannerMobileFile(e.target.files[0]);
                }
              }}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-netflix-red file:text-white hover:file:bg-netflix-red/90"
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Résolution recommandée : 1080×1920 pixels (9:16) - Affichée sur mobile et tablette
            </p>

            {(bannerMobileFile || settings.hero_banner_mobile) && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {bannerMobileFile ? "Nouvel aperçu :" : "Image actuelle :"}
                </p>
                <div className="relative w-full max-w-sm mx-auto aspect-[9/16] rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={
                      bannerMobileFile
                        ? URL.createObjectURL(bannerMobileFile)
                        : settings.hero_banner_mobile
                    }
                    alt="Aperçu bannière mobile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              CV (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setCvFile(e.target.files[0]);
                }
              }}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-netflix-red file:text-white hover:file:bg-netflix-red/90"
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Format PDF uniquement - Sera téléchargeable sur la page d'accueil
            </p>
            {(cvFile || settings.cv_url) && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {cvFile ? "Nouveau fichier sélectionné :" : "Fichier actuel :"}
                </p>
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white">
                    {cvFile ? cvFile.name : "CV actuel"}
                  </span>
                  {settings.cv_url && !cvFile && (
                    <a
                      href={settings.cv_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-netflix-red hover:underline text-sm"
                    >
                      Voir le CV actuel
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Titre principal
            </label>
            <input
              type="text"
              value={settings.hero_title}
              onChange={(e) =>
                setSettings({ ...settings, hero_title: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              placeholder="Portfolio de Mehdi Zeroual"
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Sous-titre (Tagline)
            </label>
            <input
              type="text"
              value={settings.hero_tagline}
              onChange={(e) =>
                setSettings({ ...settings, hero_tagline: e.target.value })
              }
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              placeholder="Entrepreneur • Développeur • Apprenant"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              value={settings.hero_description}
              onChange={(e) =>
                setSettings({ ...settings, hero_description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              placeholder="Bienvenue dans mon univers..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-6 py-2 bg-netflix-red text-white rounded-md hover:bg-netflix-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading
                ? "Upload en cours..."
                : saving
                ? "Enregistrement..."
                : "Enregistrer les modifications"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
