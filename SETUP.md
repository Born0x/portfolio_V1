# Guide de Configuration Rapide

Ce guide vous aidera à lancer votre site "Mehdi's Life" en quelques minutes.

## Étape 1 : Installation (5 min)

```bash
cd mehdis-life
npm install
```

## Étape 2 : Ajouter la Font Bebas Neue (2 min)

### Option A : Télécharger depuis Google Fonts

1. Allez sur https://fonts.google.com/specimen/Bebas+Neue
2. Cliquez sur "Download family"
3. Extrayez le ZIP et copiez `BebasNeue-Regular.ttf` dans `public/fonts/`

### Option B : Utiliser une font Google directement

Si vous ne voulez pas télécharger la font, modifiez `app/layout.tsx` :

Remplacez :
```tsx
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

## Étape 3 : Ajouter vos Images (10 min)

Créez les dossiers et ajoutez vos images :

```bash
mkdir -p public/images/projects
mkdir -p public/images/trips
mkdir -p public/images/blog
```

### Images nécessaires :

1. **Hero** : `public/images/hero-home.jpg` (1920x1080px)
2. **Projets** :
   - `public/images/projects/bleedi.jpg`
   - `public/images/projects/mamayou.jpg`
   - `public/images/projects/open-wealth.jpg`
3. **Voyages** :
   - `public/images/trips/istanbul.jpg`
   - `public/images/trips/marrakech.jpg`
4. **Blog** :
   - `public/images/blog/innovation-pme.jpg`
   - `public/images/blog/ga4-marjane.jpg`

### Astuce : Utiliser des images de placeholder

Si vous n'avez pas encore vos images, utilisez des services comme :
- https://unsplash.com (images gratuites haute qualité)
- https://placeholder.com (images de test)

Exemple d'URL placeholder : `https://placehold.co/1280x720/141414/E50914/png?text=Bleedi`

Pour utiliser des placeholders temporairement, modifiez les URLs dans les fichiers JSON :
```json
"image": "https://placehold.co/1280x720/141414/E50914/png?text=Bleedi"
```

## Étape 4 : Personnaliser le Contenu (15 min)

### A. Modifier les projets

Éditez `data/projects.json` avec vos vrais projets.

### B. Modifier les voyages

Éditez `data/trips.json` avec vos voyages.

### C. Modifier le blog

Éditez `data/blog.json` avec vos articles.

### D. Modifier les objectifs

Éditez `data/goals.json` avec vos objectifs personnels.

### E. Modifier le Footer

Éditez `components/layout/footer.tsx` pour mettre vos vrais liens sociaux.

## Étape 5 : Lancer le Site (1 min)

```bash
npm run dev
```

Ouvrez http://localhost:3000 dans votre navigateur.

## Étape 6 : Tester les Fonctionnalités

✅ Navigation entre les pages
✅ Recherche globale (Cmd+K ou Ctrl+K)
✅ Carrousels horizontaux
✅ Pages de détail des projets/voyages
✅ Responsive design (testez sur mobile)

## Étape 7 : Déployer sur Vercel (10 min)

### A. Créer un compte Vercel

1. Allez sur https://vercel.com
2. Créez un compte avec GitHub

### B. Créer un repo GitHub

```bash
git init
git add .
git commit -m "Initial commit: Mehdi's Life portfolio"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/mehdis-life.git
git push -u origin main
```

### C. Déployer

1. Sur Vercel, cliquez "New Project"
2. Importez votre repo `mehdis-life`
3. Vercel détecte Next.js automatiquement
4. Cliquez "Deploy"
5. Attendez 2-3 minutes

✅ Votre site est en ligne !

## Étape 8 : Configurer un Domaine (Optionnel)

1. Achetez un domaine (ex: namecheap.com, ovh.com)
2. Dans Vercel > Project Settings > Domains
3. Ajoutez votre domaine
4. Configurez les DNS selon les instructions Vercel

## Prochaines Étapes

Maintenant que votre site est en ligne, vous pouvez :

1. **Ajouter plus de contenu** : Projets, articles, voyages
2. **Créer les pages manquantes** : Studies, Experience, Timeline, etc.
3. **Ajouter Analytics** : Google Analytics, Plausible
4. **Optimiser le SEO** : Métadonnées, descriptions, alt texts
5. **Ajouter i18n** : Support multilingue FR/EN
6. **Améliorer l'accessibilité** : Tests WCAG

## Besoin d'Aide ?

- 📖 Documentation Next.js : https://nextjs.org/docs
- 🎨 Documentation Tailwind : https://tailwindcss.com/docs
- 🧩 shadcn/ui : https://ui.shadcn.com
- 🚀 Vercel Support : https://vercel.com/support

## Checklist Complète

- [ ] Node.js installé
- [ ] Dépendances installées (`npm install`)
- [ ] Font Bebas Neue ajoutée
- [ ] Images ajoutées dans `/public/images`
- [ ] Contenu personnalisé (JSON)
- [ ] Site teste en local (`npm run dev`)
- [ ] Repo GitHub créé
- [ ] Site déployé sur Vercel
- [ ] Domaine configuré (optionnel)
- [ ] Analytics ajouté (optionnel)

---

Bon développement ! 🚀
