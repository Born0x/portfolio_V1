# Mehdi's Life - Portfolio Personnel

Un site personnel style Netflix créé avec Next.js 14, TypeScript, Tailwind CSS et shadcn/ui.

## Caractéristiques

- **Design Netflix-style** : Interface sombre avec palette rouge (#E50914) et animations fluides
- **Carrousels horizontaux** : Navigation style Netflix avec Embla Carousel
- **Recherche globale** : Recherche rapide avec raccourci Cmd+K
- **Responsive** : Design mobile-first entièrement adaptatif
- **SEO optimisé** : Métadonnées, sitemap, robots.txt et OpenGraph
- **Performance** : Images optimisées avec next/image, chargement lazy
- **Animations** : Transitions douces avec Framer Motion
- **Accessibilité** : Navigation clavier, ARIA labels, focus visible

## Tech Stack

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Composants UI** : shadcn/ui + Radix UI
- **Carrousels** : Embla Carousel React
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **Recherche** : cmdk (Command Palette)

## Structure du Projet

```
mehdis-life/
├── app/                      # Pages et routes (App Router)
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Page d'accueil
│   ├── projects/            # Pages projets
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── trips/               # Pages voyages
│   ├── blog/                # Pages blog
│   ├── goals/               # Page objectifs
│   ├── sitemap.ts           # Génération sitemap
│   ├── robots.ts            # Configuration robots.txt
│   └── manifest.ts          # PWA manifest
├── components/              # Composants React
│   ├── layout/             # Header, Footer
│   ├── search/             # Recherche globale
│   ├── ui/                 # Composants UI shadcn
│   ├── hero.tsx            # Composant Hero
│   ├── media-card.tsx      # Carte média
│   └── row-carousel.tsx    # Carrousel horizontal
├── data/                    # Données JSON
│   ├── projects.json
│   ├── trips.json
│   ├── blog.json
│   └── goals.json
├── lib/                     # Utilitaires
│   └── utils.ts
└── public/                  # Assets statiques
    ├── images/
    └── fonts/
```

## Installation

### Prérequis

- Node.js 18+
- npm, yarn ou pnpm

### Étapes

1. **Cloner le projet** (ou utiliser le dossier créé)

```bash
cd mehdis-life
```

2. **Installer les dépendances**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Ajouter les fonts**

Téléchargez la font **Bebas Neue** depuis [Google Fonts](https://fonts.google.com/specimen/Bebas+Neue) et placez le fichier `BebasNeue-Regular.ttf` dans `public/fonts/`.

Alternativement, vous pouvez utiliser une font similaire ou modifier `app/layout.tsx` pour utiliser une font Google Fonts directement.

4. **Ajouter les images**

Ajoutez vos images dans `public/images/` selon la structure suivante :

```
public/images/
├── hero-home.jpg
├── projects/
│   ├── bleedi.jpg
│   ├── mamayou.jpg
│   └── open-wealth.jpg
├── trips/
│   ├── istanbul.jpg
│   └── marrakech.jpg
└── blog/
    ├── innovation-pme.jpg
    └── ga4-marjane.jpg
```

**Dimensions recommandées** :
- Hero : 1920x1080px
- Cartes média : 1280x720px (16:9)

5. **Lancer le serveur de développement**

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Scripts Disponibles

```bash
# Développement avec Turbopack
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint

# Vérification TypeScript
npm run type-check
```

## Personnalisation

### 1. Données de contenu

Modifiez les fichiers JSON dans `data/` pour ajouter vos propres projets, voyages, articles :

- `data/projects.json` : Vos projets
- `data/trips.json` : Vos voyages
- `data/blog.json` : Vos articles
- `data/goals.json` : Vos objectifs

### 2. Couleurs et thème

Les couleurs sont définies dans `tailwind.config.ts` et `app/globals.css` :

```css
--primary: 356 100% 45%; /* Netflix Red #E50914 */
--background: 0 0% 8%;   /* #141414 */
--card: 0 0% 6%;         /* #0F0F0F */
```

### 3. Navigation

Modifiez la navigation dans `components/layout/header.tsx` pour ajouter/supprimer des liens.

### 4. SEO

Mettez à jour les métadonnées dans :
- `app/layout.tsx` : Métadonnées globales
- `app/sitemap.ts` : URL du site
- Chaque page : Métadonnées spécifiques

## Déploiement sur Vercel

### Méthode 1 : Via GitHub (Recommandé)

1. **Créer un repo GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-username/mehdis-life.git
git push -u origin main
```

2. **Déployer sur Vercel**

- Allez sur [vercel.com](https://vercel.com)
- Cliquez sur "New Project"
- Importez votre repo GitHub
- Vercel détectera automatiquement Next.js
- Cliquez sur "Deploy"

### Méthode 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

### Variables d'environnement (si nécessaire)

Si vous ajoutez des variables d'environnement, créez un fichier `.env.local` :

```env
NEXT_PUBLIC_SITE_URL=https://mehdislife.com
```

Et configurez-les sur Vercel dans Project Settings > Environment Variables.

## Configuration DNS

Après déploiement, configurez votre domaine personnalisé :

1. Allez dans Project Settings > Domains sur Vercel
2. Ajoutez votre domaine (ex: mehdislife.com)
3. Suivez les instructions pour configurer les DNS

## Optimisations de Production

Le projet est déjà optimisé pour la production :

- ✅ Images optimisées avec `next/image`
- ✅ Fonts optimisées avec `next/font`
- ✅ Code splitting automatique
- ✅ Compression et minification
- ✅ ISR (Incremental Static Regeneration)
- ✅ SEO (sitemap, robots, metadata)

## Fonctionnalités Additionnelles à Ajouter

Voici des améliorations que vous pourriez implémenter :

1. **Internationalisation (i18n)** : Ajouter next-intl pour FR/EN
2. **Analytics** : Intégrer Google Analytics ou Plausible
3. **Blog avec MDX** : Utiliser Contentlayer pour articles complets
4. **Formulaire de contact** : Ajouter une page contact fonctionnelle
5. **Timeline interactive** : Créer une timeline visuelle
6. **Galerie photos** : Ajouter une galerie avec lightbox
7. **Dark/Light mode** : Ajouter un toggle (actuellement dark only)
8. **Filtres avancés** : Filtrer par tags, années, catégories
9. **RSS Feed** : Générer un feed RSS pour le blog
10. **CMS Headless** : Intégrer Sanity ou Contentful

## Pages Manquantes à Créer

Les pages suivantes sont mentionnées dans la nav mais non encore créées :

- `/studies` : Page études
- `/experience` : Page expériences
- `/learning` : Page apprentissages
- `/timeline` : Timeline interactive
- `/gallery` : Galerie photos
- `/press` : Revue de presse
- `/contact` : Formulaire de contact

Vous pouvez créer ces pages en suivant le même pattern que les pages existantes.

## Support et Contribution

Pour toute question ou suggestion :
- Ouvrez une issue sur GitHub
- Contactez-moi via le site

## Licence

Ce projet est sous licence MIT. Libre d'utilisation pour votre propre portfolio.

---

Fait avec ❤️ par Mehdi Zeroual
