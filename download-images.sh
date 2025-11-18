#!/bin/bash

# Script pour télécharger automatiquement les images Unsplash
# Usage: chmod +x download-images.sh && ./download-images.sh

echo "📸 Téléchargement des images Unsplash..."
echo ""

# Créer les dossiers nécessaires
echo "📁 Création des dossiers..."
mkdir -p public/images/projects
mkdir -p public/images/trips
mkdir -p public/images/blog

# Hero
echo "⬇️  Téléchargement de l'image hero..."
curl -L "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop&q=80" -o public/images/hero-home.jpg

# Projets
echo "⬇️  Téléchargement des images projets..."
curl -L "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1280&h=720&fit=crop&q=80" -o public/images/projects/bleedi.jpg
curl -L "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1280&h=720&fit=crop&q=80" -o public/images/projects/mamayou.jpg
curl -L "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1280&h=720&fit=crop&q=80" -o public/images/projects/open-wealth.jpg

# Voyages
echo "⬇️  Téléchargement des images voyages..."
curl -L "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1280&h=720&fit=crop&q=80" -o public/images/trips/istanbul.jpg
curl -L "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1280&h=720&fit=crop&q=80" -o public/images/trips/marrakech.jpg

# Blog
echo "⬇️  Téléchargement des images blog..."
curl -L "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop&q=80" -o public/images/blog/innovation-pme.jpg
curl -L "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=720&fit=crop&q=80" -o public/images/blog/ga4-marjane.jpg

echo ""
echo "✅ Toutes les images ont été téléchargées avec succès !"
echo ""
echo "📋 Images téléchargées :"
echo "   - public/images/hero-home.jpg"
echo "   - public/images/projects/bleedi.jpg"
echo "   - public/images/projects/mamayou.jpg"
echo "   - public/images/projects/open-wealth.jpg"
echo "   - public/images/trips/istanbul.jpg"
echo "   - public/images/trips/marrakech.jpg"
echo "   - public/images/blog/innovation-pme.jpg"
echo "   - public/images/blog/ga4-marjane.jpg"
echo ""
echo "🚀 Vous pouvez maintenant lancer le site avec: npm run dev"
