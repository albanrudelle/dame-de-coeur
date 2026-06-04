import type { Metadata, Viewport } from 'next'
import './globals.css'
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
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: SITE.name }],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#1C1C1A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
