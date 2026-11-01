import type { Metadata, Viewport } from 'next'
import './globals.css'
import './dc.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Salle de réception & discothèque en Corrèze`,
    template: `%s | ${SITE.name}`,
  },
  description: "Domaine la Dame de Cœur à Ménoire (Corrèze) : grande salle de réception avec lustres en cristal, discothèque privée avec piste LED encastrée, bar lounge. Jusqu'à 150 convives. Mariages, anniversaires, EVJF. Devis gratuit sous 24h.",
  keywords: ['salle mariage Corrèze', 'location salle réception 19', 'salle de fête Corrèze', 'discothèque privée Corrèze', 'EVJF Corrèze', 'salle mariage Tulle', 'domaine mariage Corrèze', 'espace événementiel Corrèze'],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE.name,
    images: [{ url: '/images/hero.jpg', alt: SITE.name }],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#f5f2ec',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col min-h-screen">
        <a href="#contenu" className="skip-link">Aller au contenu</a>
        <Navbar />
        <main id="contenu" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
export const revalidate = 0
