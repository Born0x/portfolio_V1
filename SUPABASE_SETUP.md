# Guide de Configuration Supabase

## 📋 Étape 1 : Récupérer vos identifiants Supabase

1. Connectez-vous à [https://supabase.com](https://supabase.com)
2. Sélectionnez votre projet (ou créez-en un nouveau)
3. Allez dans **Settings** (⚙️) > **API**
4. Vous y trouverez :
   - **Project URL** → C'est votre `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys** :
     - `anon` `public` → C'est votre `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role` `secret` → C'est votre `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Ne jamais exposer côté client)

5. Copiez ces 3 valeurs dans votre fichier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```

---

## 🗄️ Étape 2 : Créer les tables de la base de données

1. Dans Supabase, allez dans **SQL Editor** (icône `</>`)
2. Cliquez sur **New query**
3. Copiez tout le contenu du fichier `supabase-schema.sql`
4. Collez-le dans l'éditeur SQL
5. Cliquez sur **Run** (ou appuyez sur `Cmd/Ctrl + Enter`)

✅ Vous devriez voir le message "Success. No rows returned"

Cela créera 5 tables :
- `projects` - Vos projets
- `certifications` - Vos certifications
- `education` - Vos diplômes
- `studies` - Vos études/travaux académiques
- `blog` - Vos articles de blog

---

## 📁 Étape 3 : Configurer Storage pour les images

1. Dans Supabase, allez dans **Storage** (icône 📦)
2. Cliquez sur **Create a new bucket**
3. Créez les buckets suivants avec ces paramètres :

### Bucket 1 : `project-images`
- **Name**: `project-images`
- **Public bucket**: ✅ Coché (les images doivent être publiques)
- Cliquez sur **Create bucket**

### Bucket 2 : `certification-logos`
- **Name**: `certification-logos`
- **Public bucket**: ✅ Coché
- Cliquez sur **Create bucket**

### Bucket 3 : `education-logos`
- **Name**: `education-logos`
- **Public bucket**: ✅ Coché
- Cliquez sur **Create bucket**

### Bucket 4 : `study-images`
- **Name**: `study-images`
- **Public bucket**: ✅ Coché
- Cliquez sur **Create bucket**

### Bucket 5 : `blog-images`
- **Name**: `blog-images`
- **Public bucket**: ✅ Coché
- Cliquez sur **Create bucket**

---

## 🔐 Étape 4 : Configurer l'authentification

1. Dans Supabase, allez dans **Authentication** > **Users**
2. Cliquez sur **Add user** > **Create new user**
3. Entrez vos informations :
   - **Email** : Votre email admin
   - **Password** : Un mot de passe fort
   - ✅ Cochez **Auto Confirm User** (pour éviter la validation par email en dev)
4. Cliquez sur **Create user**

### Désactiver les inscriptions publiques (sécurité)

Pour que vous soyez le SEUL à pouvoir vous connecter :

1. Allez dans **Authentication** > **Providers**
2. Trouvez **Email** dans la liste
3. Cliquez dessus pour modifier
4. **Décochez** l'option **Enable Sign ups** (Enable sign ups: OFF)
5. Cliquez sur **Save**

✅ Maintenant, seul votre compte admin existant pourra se connecter !

---

## 🧪 Étape 5 : Tester la connexion

Une fois que vous avez :
- ✅ Mis à jour `.env.local` avec vos credentials
- ✅ Créé les tables avec le script SQL
- ✅ Créé les buckets Storage
- ✅ Créé votre compte admin

Redémarrez votre serveur de développement :

```bash
# Arrêtez le serveur (Ctrl+C dans le terminal)
npm run dev
```

Vous êtes prêt ! 🚀

---

## 📝 Prochaines étapes

Une fois cette configuration terminée, je vais :
1. ✅ Supprimer les sections voyages et objectifs
2. ✅ Créer la page de login admin
3. ✅ Créer le dashboard admin avec CRUD complet
4. ✅ Migrer vos données existantes vers Supabase

---

## ⚠️ Notes importantes

- **Ne commitez JAMAIS le fichier `.env.local`** (il est déjà dans `.gitignore`)
- Le `SUPABASE_SERVICE_ROLE_KEY` doit rester secret (ne l'utilisez que côté serveur)
- Les buckets Storage publics permettent l'accès direct aux images via URL
- Row Level Security (RLS) est activé : le public peut lire, seul l'admin authentifié peut modifier

---

Besoin d'aide ? Consultez la [documentation Supabase](https://supabase.com/docs) ou demandez-moi !
