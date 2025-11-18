# Guide des Images

Ce fichier explique comment obtenir et optimiser les images pour votre site.

## Structure des Images Requises

```
public/images/
├── hero-home.jpg           (1920x1080px - 16:9)
├── projects/
│   ├── bleedi.jpg         (1280x720px - 16:9)
│   ├── mamayou.jpg        (1280x720px - 16:9)
│   └── open-wealth.jpg    (1280x720px - 16:9)
├── trips/
│   ├── istanbul.jpg       (1280x720px - 16:9)
│   └── marrakech.jpg      (1280x720px - 16:9)
└── blog/
    ├── innovation-pme.jpg (1280x720px - 16:9)
    └── ga4-marjane.jpg    (1280x720px - 16:9)
```

## Option 1 : Utiliser des Images Temporaires (Placeholders)

Pour tester rapidement le site sans vos vraies images, utilisez des URLs de placeholder.

Modifiez les fichiers JSON pour utiliser des URLs au lieu de chemins locaux :

### Exemple dans `data/projects.json` :

```json
{
  "image": "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=1280&h=720&fit=crop"
}
```

### Services de Placeholder Recommandés :

1. **Unsplash** (images réelles gratuites) :
   ```
   https://images.unsplash.com/photo-PHOTO_ID?w=1280&h=720&fit=crop
   ```

2. **Placeholder.com** (images de test) :
   ```
   https://placehold.co/1280x720/141414/E50914/png?text=Bleedi
   ```

3. **Lorem Picsum** (images aléatoires) :
   ```
   https://picsum.photos/1280/720
   ```

## Option 2 : Utiliser vos Propres Images

### 1. Sources d'Images Gratuites

- **Unsplash** : https://unsplash.com (photos haute qualité)
- **Pexels** : https://pexels.com (vidéos et photos)
- **Pixabay** : https://pixabay.com (images libres de droits)

### 2. Optimisation des Images

Avant d'ajouter vos images, optimisez-les :

#### Outils en Ligne :
- **TinyPNG** : https://tinypng.com (compression PNG/JPG)
- **Squoosh** : https://squoosh.app (outil Google)
- **ImageOptim** : https://imageoptim.com (Mac app)

#### Commande en ligne (si vous avez ImageMagick) :
```bash
# Redimensionner à 1280x720
convert input.jpg -resize 1280x720^ -gravity center -extent 1280x720 output.jpg

# Compresser
convert input.jpg -quality 85 output.jpg
```

### 3. Format Recommandé

- **Format** : JPG (pour photos) ou WebP (meilleur compression)
- **Qualité** : 80-85% (bon compromis qualité/taille)
- **Dimensions** :
  - Hero : 1920x1080px
  - Cartes : 1280x720px
- **Poids max** : 200-300 KB par image

### 4. Nommage des Fichiers

Utilisez des noms clairs en minuscules sans espaces :
- ✅ `bleedi-hero.jpg`
- ✅ `istanbul-2024.jpg`
- ❌ `Photo Bleedi (1).JPG`

## Option 3 : Générer des Images avec IA

Utilisez des outils IA pour créer des images :

1. **DALL-E** : https://openai.com/dall-e-2
2. **Midjourney** : https://midjourney.com
3. **Stable Diffusion** : https://stability.ai

Prompts suggérés pour vos projets :
```
"Modern e-commerce website mockup, clean design, professional, 16:9"
"Startup office workspace, minimal, bright, professional photography"
"Travel photography Istanbul, Blue Mosque, golden hour, cinematic"
```

## Exemples d'URLs Unsplash par Catégorie

### Pour les Projets (Business/Tech) :
```
# Bleedi (Santé/Femtech)
https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1280&h=720&fit=crop

# Mamayou (Bébé/Puériculture)
https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1280&h=720&fit=crop

# Open Wealth (Finance/Tech)
https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1280&h=720&fit=crop
```

### Pour les Voyages :
```
# Istanbul
https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1280&h=720&fit=crop

# Marrakech
https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1280&h=720&fit=crop
```

### Pour le Blog :
```
# Innovation/Tech
https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop

# Analytics/Data
https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=720&fit=crop
```

### Pour le Hero :
```
# Hero personnel/professionnel
https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop
```

## Modification Rapide avec URLs Unsplash

Pour utiliser ces URLs immédiatement, mettez à jour vos fichiers JSON :

**data/projects.json** :
```json
{
  "id": "bleedi",
  "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1280&h=720&fit=crop",
  ...
}
```

**data/trips.json** :
```json
{
  "id": "istanbul-2024",
  "image": "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1280&h=720&fit=crop",
  ...
}
```

## Next.js Image Configuration

Le fichier `next.config.mjs` est déjà configuré pour accepter les images externes :

```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
}
```

Cela permet d'utiliser des images d'Unsplash, Pexels, etc.

## Checklist Images

- [ ] Hero image ajoutée ou URL configurée
- [ ] Images projets (3) ajoutées
- [ ] Images voyages (2) ajoutées
- [ ] Images blog (2) ajoutées
- [ ] Images optimisées (< 300 KB chacune)
- [ ] Format 16:9 respecté
- [ ] Images testées sur le site local

## Astuce : Script pour Télécharger les Images Unsplash

Créez un fichier `download-images.sh` :

```bash
#!/bin/bash

mkdir -p public/images/projects
mkdir -p public/images/trips
mkdir -p public/images/blog

# Hero
curl "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop" -o public/images/hero-home.jpg

# Projets
curl "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1280&h=720&fit=crop" -o public/images/projects/bleedi.jpg
curl "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1280&h=720&fit=crop" -o public/images/projects/mamayou.jpg
curl "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1280&h=720&fit=crop" -o public/images/projects/open-wealth.jpg

# Voyages
curl "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1280&h=720&fit=crop" -o public/images/trips/istanbul.jpg
curl "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1280&h=720&fit=crop" -o public/images/trips/marrakech.jpg

# Blog
curl "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop" -o public/images/blog/innovation-pme.jpg
curl "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=720&fit=crop" -o public/images/blog/ga4-marjane.jpg

echo "✅ Toutes les images ont été téléchargées !"
```

Rendez-le exécutable et lancez-le :
```bash
chmod +x download-images.sh
./download-images.sh
```

---

Avec ce guide, vous avez toutes les options pour gérer vos images efficacement ! 📸
