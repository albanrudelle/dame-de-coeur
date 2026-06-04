# Domaine la Dame de Cœur — Site Next.js 14

Design luxury editorial inspiré des grands hôtels parisiens.

## Stack

- **Next.js 14** App Router · TypeScript
- **Tailwind CSS** · Cormorant Garamond + Jost
- **React Hook Form** + Zod (validation)
- **Vercel** (déploiement, région Paris CDG1)

## Structure

```
dame-next/
├── app/
│   ├── layout.tsx          # Layout global + SEO
│   ├── page.tsx            # Accueil
│   ├── mariages/           # Page Mariages
│   ├── soirees/            # Anniversaires & soirées
│   ├── espaces/            # Les 3 espaces
│   ├── contact/            # Formulaire de devis
│   ├── mentions-legales/
│   ├── api/contact/        # API route email
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── Navbar.tsx          # Navigation sticky transparente
│   ├── Footer.tsx          # Footer + Schema.org
│   ├── DisposBand.tsx      # Bandeau disponibilités
│   ├── Temoignages.tsx     # Section avis clients
│   └── ContactForm.tsx     # Formulaire avec validation
├── lib/
│   ├── constants.ts        # Données du site
│   └── schemas.ts          # Validation Zod
└── public/images/          # 18 photos optimisées
```

## Démarrage rapide

```bash
npm install
cp .env.example .env.local
npm run dev
# → http://localhost:3000
```

## Déploiement Vercel

```bash
npm i -g vercel
vercel          # prévisualisation
vercel --prod   # production
```

Ou connectez votre repo GitHub directement sur vercel.com.

## Configurer l'envoi d'emails

Éditez `app/api/contact/route.ts` et décommentez l'une des options :

### Option A — Resend (recommandé)
```bash
npm install resend
```
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=contact@domaine-dame-de-coeur.fr
```

### Option B — SMTP (Nodemailer)
```bash
npm install nodemailer @types/nodemailer
```
```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=yourpassword
CONTACT_EMAIL=contact@domaine-dame-de-coeur.fr
```

## Checklist avant mise en production

- [ ] Remplir `lib/constants.ts` : téléphone, email réels
- [ ] Configurer l'envoi d'emails (Resend ou SMTP)
- [ ] Mettre à jour les disponibilités réelles dans `constants.ts`
- [ ] Ajouter `NEXT_PUBLIC_SITE_URL` dans les variables Vercel
- [ ] Créer `/public/og.jpg` (1200×630px) pour les partages réseaux sociaux
- [ ] Créer une fiche Google Business Profile
- [ ] S'inscrire sur Mariages.net et Zankyou
