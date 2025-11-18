"use client";

import * as React from "react";
import { Mail, Phone, Send, MapPin, Linkedin, Github, Instagram, Twitter, Facebook, Youtube, Globe, Link as LinkIcon } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

type SocialLink = {
  id: string;
  name: string;
  url: string;
  icon: string;
  order_index: number;
};

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    mail: Mail,
    globe: Globe,
    link: LinkIcon,
  };
  return icons[iconName] || LinkIcon;
};

export default function ContactPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [socialLinks, setSocialLinks] = React.useState<SocialLink[]>([]);

  React.useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Error fetching social links:", error);
    } else {
      setSocialLinks(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi");
      }

      setSubmitStatus("success");

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      alert("Erreur lors de l'envoi du message : " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <SectionTitle className="mb-4">Me Contacter</SectionTitle>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Une question, un projet, ou simplement envie d'échanger ? N'hésitez pas à
            me contacter, je vous répondrai dans les plus brefs délais.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Email Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 rounded-lg border border-netflix-divider bg-netflix-dark-gray p-6 transition-all hover:border-netflix-red/50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-netflix-red/10">
                  <Mail className="h-6 w-6 text-netflix-red" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-white">Email</h3>
                  <a
                    href="mailto:mehdizer35200@gmail.com"
                    className="text-muted-foreground transition-colors hover:text-netflix-red"
                  >
                    mehdizer35200@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Phone Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 rounded-lg border border-netflix-divider bg-netflix-dark-gray p-6 transition-all hover:border-netflix-red/50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-netflix-red/10">
                  <Phone className="h-6 w-6 text-netflix-red" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-white">Téléphone</h3>
                  <a
                    href="tel:+33767747964"
                    className="text-muted-foreground transition-colors hover:text-netflix-red"
                  >
                    +33 7 67 74 79 64
                  </a>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 rounded-lg border border-netflix-divider bg-netflix-dark-gray p-6 transition-all hover:border-netflix-red/50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-netflix-red/10">
                  <MapPin className="h-6 w-6 text-netflix-red" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-white">Localisation</h3>
                  <p className="text-muted-foreground">Rennes, France</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="rounded-lg border border-netflix-divider bg-netflix-dark-gray p-6">
              <h3 className="mb-4 font-semibold text-white">Réseaux Sociaux</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.length > 0 ? (
                  socialLinks.map((link) => {
                    const IconComponent = getIconComponent(link.icon);
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.name}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-netflix-divider bg-[#1a1a1a] text-muted-foreground transition-all hover:border-netflix-red hover:bg-netflix-red hover:text-white"
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground">Aucun réseau social configuré</p>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-lg border border-netflix-divider bg-netflix-dark-gray p-6">
              <h3 className="mb-2 font-semibold text-white">Disponibilité</h3>
              <p className="text-sm text-muted-foreground">
                Je suis actuellement ouvert aux opportunités de collaboration et aux
                nouveaux projets. N'hésitez pas à me contacter pour discuter de vos idées.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border border-netflix-divider bg-netflix-dark-gray p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Envoyer un message</h2>

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-green-400"
              >
                Message envoyé avec succès ! Je vous répondrai bientôt.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Dupont"
                  className="w-full rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-3 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                  required
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jean.dupont@example.com"
                    className="w-full rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-3 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-3 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Sujet de la demande *
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Collaboration, Opportunité, Question..."
                  className="w-full rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-3 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre demande en détail..."
                  rows={6}
                  className="w-full rounded-lg border border-netflix-divider bg-[#1a1a1a] px-4 py-3 text-white placeholder-muted-foreground transition-colors focus:border-netflix-red focus:outline-none"
                  required
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  {message.length} / 1000 caractères
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-netflix-red px-6 py-3 font-semibold text-white transition-all hover:bg-[#c0000d] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
