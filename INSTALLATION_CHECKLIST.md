# ✅ Checklist d'Installation

Suivez cette checklist pour vous assurer que tout fonctionne correctement.

## Phase 1 : Installation de Base

### 1.1 Prérequis
- [ ] Node.js 18+ installé (`node --version`)
- [ ] npm ou yarn installé (`npm --version`)
- [ ] Git installé (`git --version`)

### 1.2 Installation des Dépendances
```bash
cd mehdis-life
npm install
```

- [ ] Installation réussie (pas d'erreurs)
- [ ] Fichier `node_modules/` créé
- [ ] Fichier `package-lock.json` créé

## Phase 2 : Configuration

### 2.1 Font Bebas Neue

**Option A : Google Fonts (Recommandé)**
- [ ] Modifié `app/layout.tsx` pour utiliser `next/font/google`
- [ ] Import ajouté : `import { Bebas_Neue } from "next/font/google";`

**Option B : Font Locale**
- [ ] Font téléchargée depuis Google Fonts
- [ ] Fichier `public/fonts/BebasNeue-Regular.ttf` créé
- [ ] Path correct dans `app/layout.tsx`

### 2.2 Images

**Option A : Script Automatique**
```bash
chmod +x download-images.sh
./download-images.sh
```
- [ ] Script exécuté avec succès
- [ ] 8 images téléchargées dans `public/images/`

**Option B : Manuel**
- [ ] `public/images/hero-home.jpg` existe
- [ ] `public/images/projects/` contient 3 images
- [ ] `public/images/trips/` contient 2 images
- [ ] `public/images/blog/` contient 2 images

### 2.3 Configuration Optionnelle
- [ ] `.env.example` copié en `.env.local` (si nécessaire)
- [ ] Variables d'environnement configurées

## Phase 3 : Test en Local

### 3.1 Démarrage du Serveur
```bash
npm run dev
```

- [ ] Serveur démarré sans erreur
- [ ] Console affiche "Ready in X ms"
- [ ] Accessible sur http://localhost:3000

### 3.2 Tests de Navigation

**Page d'Accueil**
- [ ] Hero s'affiche correctement
- [ ] Image hero visible
- [ ] Titre "Mehdi's Life" affiché
- [ ] CTAs cliquables
- [ ] 3 carrousels visibles (Projets, Voyages, Articles)
- [ ] Cartes s'affichent correctement
- [ ] Images des cartes chargées

**Header**
- [ ] Logo "Mehdi's Life" visible
- [ ] Navigation sticky fonctionne au scroll
- [ ] Liens de navigation fonctionnels
- [ ] Menu mobile fonctionne (< 1024px)
- [ ] Icône de recherche visible

**Footer**
- [ ] Footer s'affiche en bas
- [ ] Liens sociaux visibles
- [ ] Sections de liens fonctionnelles
- [ ] Copyright affiché

### 3.3 Tests des Pages

**Pages Statiques**
- [ ] `/projects` - Liste des projets
- [ ] `/trips` - Liste des voyages
- [ ] `/blog` - Liste des articles
- [ ] `/goals` - 4 piliers affichés

**Pages Dynamiques**
- [ ] `/projects/bleedi` - Détail projet
- [ ] `/projects/mamayou` - Détail projet
- [ ] `/projects/open-wealth` - Détail projet
- [ ] `/trips/istanbul-2024` - Détail voyage
- [ ] `/trips/marrakech-2023` - Détail voyage

**Pages Système**
- [ ] `/404` ou page inexistante - 404 personnalisé
- [ ] `/sitemap.xml` - Sitemap généré
- [ ] `/robots.txt` - Robots.txt généré

### 3.4 Tests des Fonctionnalités

**Recherche**
- [ ] Cmd+K (Mac) ou Ctrl+K (Windows) ouvre la recherche
- [ ] Dialog de recherche s'affiche
- [ ] Recherche fonctionne (essayez "Bleedi")
- [ ] Clic sur résultat redirige correctement
- [ ] ESC ferme le dialog

**Carrousels**
- [ ] Défilement fluide
- [ ] Boutons prev/next fonctionnent
- [ ] Drag to scroll fonctionne
- [ ] Désactivation des boutons aux extrémités

**Cartes Média**
- [ ] Hover zoom fonctionne
- [ ] Overlay apparaît au hover
- [ ] Play button visible au hover
- [ ] Tags affichés
- [ ] Badge année affiché
- [ ] Clic redirige vers la page détail

**Animations**
- [ ] Hero animations (Framer Motion)
- [ ] Transitions fluides entre pages
- [ ] Hover effects sur boutons

### 3.5 Tests Responsive

**Mobile (< 768px)**
- [ ] Menu hamburger visible
- [ ] Navigation mobile fonctionne
- [ ] Carrousels défilent horizontalement
- [ ] Hero adapté
- [ ] Footer adapté

**Tablet (768px - 1024px)**
- [ ] Layout adapté
- [ ] Carrousels affichent 2-3 cartes
- [ ] Navigation adaptée

**Desktop (> 1024px)**
- [ ] Layout complet
- [ ] Carrousels affichent 4-5 cartes
- [ ] Navigation horizontale

## Phase 4 : Vérifications TypeScript & Linting

### 4.1 TypeScript
```bash
npm run type-check
```
- [ ] Pas d'erreurs TypeScript
- [ ] Compilation réussie

### 4.2 Linting
```bash
npm run lint
```
- [ ] Pas d'erreurs de linting
- [ ] Code respecte les règles ESLint

### 4.3 Build de Production
```bash
npm run build
```
- [ ] Build réussi
- [ ] Dossier `.next/` créé
- [ ] Pas d'erreurs de build
- [ ] Toutes les pages générées (SSG)

```bash
npm start
```
- [ ] Production build démarre
- [ ] Site accessible sur http://localhost:3000

## Phase 5 : SEO & Performance

### 5.1 SEO
- [ ] Métadonnées présentes (`<title>`, `<meta description>`)
- [ ] OpenGraph tags configurés
- [ ] Sitemap accessible `/sitemap.xml`
- [ ] Robots.txt accessible `/robots.txt`
- [ ] Manifest PWA `/manifest.webmanifest`

### 5.2 Performance
- [ ] Images optimisées (next/image)
- [ ] Lazy loading fonctionne
- [ ] Fonts optimisées
- [ ] Pas de console errors
- [ ] Lighthouse score > 90 (optionnel)

## Phase 6 : Préparation au Déploiement

### 6.1 Git
```bash
git init
git add .
git commit -m "Initial commit"
```
- [ ] Repo Git initialisé
- [ ] `.gitignore` fonctionne
- [ ] Premier commit créé

### 6.2 GitHub
```bash
git remote add origin https://github.com/USERNAME/mehdis-life.git
git push -u origin main
```
- [ ] Repo GitHub créé
- [ ] Code poussé sur GitHub
- [ ] README visible sur GitHub

### 6.3 Vercel (Optionnel)
- [ ] Compte Vercel créé
- [ ] Projet importé depuis GitHub
- [ ] Premier déploiement réussi
- [ ] URL de production accessible
- [ ] Domaine personnalisé configuré (optionnel)

## Phase 7 : Personnalisation

### 7.1 Contenu
- [ ] `data/projects.json` personnalisé
- [ ] `data/trips.json` personnalisé
- [ ] `data/blog.json` personnalisé
- [ ] `data/goals.json` personnalisé
- [ ] Footer liens sociaux mis à jour
- [ ] Images personnelles ajoutées

### 7.2 Branding
- [ ] Nom du site modifié si nécessaire
- [ ] Couleurs ajustées si souhaité
- [ ] Logo/favicon ajouté (optionnel)
- [ ] Métadonnées personnalisées

## 📊 Récapitulatif

### Status d'Installation

| Phase | Status |
|-------|--------|
| Installation de base | ⬜ |
| Configuration | ⬜ |
| Tests en local | ⬜ |
| TypeScript & Linting | ⬜ |
| SEO & Performance | ⬜ |
| Déploiement | ⬜ |
| Personnalisation | ⬜ |

### Problèmes Rencontrés

Notez ici les problèmes rencontrés et leurs solutions :

```
1.

2.

3.
```

## 🆘 En Cas de Problème

### Problèmes Courants

**Erreur "Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 déjà utilisé**
```bash
npm run dev -- -p 3001
```

**Images ne chargent pas**
- Vérifier que les fichiers existent dans `public/images/`
- Vérifier les chemins dans les fichiers JSON

**Font ne charge pas**
- Utiliser Google Fonts (Option A)
- Vérifier le path si font locale

**Build échoue**
- Vérifier les erreurs TypeScript
- Corriger les imports manquants
- Vérifier les fichiers JSON (syntaxe valide)

### Support

- Documentation : [README.md](README.md)
- Setup rapide : [QUICKSTART.md](QUICKSTART.md)
- Guide images : [IMAGE_GUIDE.md](IMAGE_GUIDE.md)

## ✅ Installation Complète !

Une fois toutes les cases cochées, votre site est prêt à être utilisé !

**Prochaines étapes** :
1. Ajouter plus de contenu
2. Créer les pages manquantes (Studies, Experience, etc.)
3. Optimiser le SEO
4. Ajouter Google Analytics
5. Partager votre site ! 🚀

---

**Date d'installation** : ________________

**Notes** :
