"use client";

import Link from "next/link";
import {
  Briefcase,
  Award,
  GraduationCap,
  BookOpen,
  FileText,
  Database,
  Wrench,
  Settings,
  Share2,
} from "lucide-react";

const adminSections = [
  {
    title: "Projets",
    description: "Gérer vos projets entrepreneuriaux",
    icon: Briefcase,
    href: "/admin/projects",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Certifications",
    description: "Gérer vos certifications professionnelles",
    icon: Award,
    href: "/admin/certifications",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Diplômes",
    description: "Gérer votre parcours académique",
    icon: GraduationCap,
    href: "/admin/education",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Études & Travaux",
    description: "Gérer vos études et recherches",
    icon: BookOpen,
    href: "/admin/studies",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Blog",
    description: "Gérer vos articles de blog",
    icon: FileText,
    href: "/admin/blog",
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Outils & Technologies",
    description: "Gérer les logos de vos outils",
    icon: Wrench,
    href: "/admin/tools",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Réseaux Sociaux",
    description: "Gérer vos liens vers les réseaux sociaux",
    icon: Share2,
    href: "/admin/social",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Paramètres",
    description: "Gérer la bannière et les textes de la page d'accueil",
    icon: Settings,
    href: "/admin/settings",
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Migration",
    description: "Migrer les données JSON vers Supabase",
    icon: Database,
    href: "/admin/migrate",
    color: "from-red-500 to-pink-500",
  },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-white mb-2">
          Tableau de bord
        </h1>
        <p className="text-muted-foreground">
          Gérez le contenu de votre portfolio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/10"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity`}
              />

              {/* Content */}
              <div className="relative">
                <div className="mb-4">
                  <Icon className="h-10 w-10 text-netflix-red group-hover:scale-110 transition-transform" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  {section.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="absolute bottom-4 right-4 text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all">
                →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
