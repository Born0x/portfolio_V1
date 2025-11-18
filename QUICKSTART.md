# 🚀 Quick Start - 5 Minutes

Lancez votre site "Mehdi's Life" en 5 minutes chrono !

## 1. Installer les dépendances (2 min)

```bash
cd mehdis-life
npm install
```

## 2. Télécharger les images (1 min)

### Option rapide : Script automatique

Créez et exécutez ce script pour télécharger des images Unsplash :

```bash
# Créer les dossiers
mkdir -p public/images/{projects,trips,blog}

# Télécharger les images (macOS/Linux)
curl -L "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop" -o public/images/hero-home.jpg
curl -L "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1280&h=720&fit=crop" -o public/images/projects/bleedi.jpg
curl -L "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1280&h=720&fit=crop" -o public/images/projects/mamayou.jpg
curl -L "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1280&h=720&fit=crop" -o public/images/projects/open-wealth.jpg
curl -L "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1280&h=720&fit=crop" -o public/images/trips/istanbul.jpg
curl -L "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1280&h=720&fit=crop" -o public/images/trips/marrakech.jpg
curl -L "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop" -o public/images/blog/innovation-pme.jpg
curl -L "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=720&fit=crop" -o public/images/blog/ga4-marjane.jpg
```

## 3. Ajouter la font (1 min)

### Option A : Google Fonts (rapide)

Modifiez [app/layout.tsx](app/layout.tsx#L5) :

Remplacez :
```tsx
import localFont from "next/font/local";

const bebasNeue = localFont({
  src: [
    {
      path: "../public/fonts/BebasNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-bebas-neue",
  display: "swap",
});
```

Par :
```tsx
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
});
```

### Option B : Font locale (si vous l'avez)

1. Téléchargez Bebas Neue : https://fonts.google.com/specimen/Bebas+Neue
2. Placez `BebasNeue-Regular.ttf` dans `public/fonts/`

## 4. Lancer le site (1 min)

```bash
npm run dev
```

Ouvrez http://localhost:3000

## ✅ C'est prêt !

Votre site tourne maintenant en local. Vous devriez voir :

- ✅ Page d'accueil avec hero
- ✅ Carrousels de projets, voyages, articles
- ✅ Navigation fonctionnelle
- ✅ Recherche (appuyez sur Cmd+K)

## 📝 Prochaines étapes

### Personnaliser le contenu (10 min)

1. **Modifiez vos projets** : `data/projects.json`
2. **Modifiez vos voyages** : `data/trips.json`
3. **Modifiez vos articles** : `data/blog.json`
4. **Modifiez vos objectifs** : `data/goals.json`
5. **Liens sociaux** : `components/layout/footer.tsx`

### Déployer sur Vercel (5 min)

```bash
# Créer un repo Git
git init
git add .
git commit -m "Initial commit"

# Push sur GitHub
git remote add origin https://github.com/VOTRE_USERNAME/mehdis-life.git
git push -u origin main

# Sur vercel.com :
# 1. New Project
# 2. Import from GitHub
# 3. Deploy
```

## 🆘 Problèmes Courants

### Les images ne s'affichent pas

**Solution** : Vérifiez que les images existent dans `public/images/`

### La font ne charge pas

**Solution** : Utilisez l'Option A (Google Fonts) c'est plus simple

### Erreur "Module not found"

**Solution** :
```bash
rm -rf node_modules package-lock.json
npm install
```

### Le port 3000 est déjà utilisé

**Solution** :
```bash
npm run dev -- -p 3001
```

## 📚 Documentation Complète

- [README.md](README.md) - Documentation complète
- [SETUP.md](SETUP.md) - Guide détaillé
- [IMAGE_GUIDE.md](IMAGE_GUIDE.md) - Gestion des images
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Résumé technique

## 🎯 Checklist

- [ ] Dépendances installées
- [ ] Images téléchargées
- [ ] Font configurée
- [ ] Site lancé en local
- [ ] Navigation testée
- [ ] Recherche testée (Cmd+K)
- [ ] Responsive testé (mobile)

---

**Vous êtes prêt !** 🎉

Le site est maintenant fonctionnel. Personnalisez le contenu et déployez-le !
