# Portfolio — Next.js

Site portfolio minimaliste construit avec Next.js, prêt à déployer sur Vercel.

## Démarrage local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

## Personnalisation

Modifie ces fichiers pour adapter le site à toi :

| Fichier | Contenu |
|---|---|
| `app/layout.tsx` | Titre et meta description |
| `components/Hero.tsx` | Titre principal et accroche |
| `components/About.tsx` | Bio et stats |
| `components/Projects.tsx` | Tes projets (nom, description, tags, lien) |
| `components/Stack.tsx` | Tes technologies |
| `components/Contact.tsx` | Email et réseaux sociaux |

## Déploiement sur Vercel

### 1. Mettre le projet sur GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TON_USER/portfolio.git
git push -u origin main
```

### 2. Déployer sur Vercel
1. Va sur [vercel.com](https://vercel.com) et connecte-toi avec GitHub
2. Clique **"Add New Project"** → sélectionne ton repo
3. Vercel détecte automatiquement Next.js
4. Clique **"Deploy"** — c'est tout ✅

### 3. Connecter ton nom de domaine
1. Dans ton projet Vercel → **Settings → Domains**
2. Ajoute ton domaine (ex: `monsite.com`)
3. Vercel te donne 2 enregistrements DNS à copier
4. Va chez ton registrar (OVH, Namecheap, Cloudflare…)
5. Colle les enregistrements DNS → attends 5-30 min
6. ✅ Ton domaine est connecté !

## Structure du projet

```
portfolio/
├── app/
│   ├── layout.tsx      # Layout racine
│   ├── page.tsx        # Page principale
│   └── globals.css     # Styles globaux
├── components/
│   ├── Nav.tsx / .css
│   ├── Hero.tsx / .css
│   ├── About.tsx / .css
│   ├── Projects.tsx / .css
│   ├── Stack.tsx / .css
│   ├── Contact.tsx / .css
│   └── Footer.tsx / .css
└── public/             # Images, favicon...
```
