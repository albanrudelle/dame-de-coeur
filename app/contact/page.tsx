import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { DisposBand } from '@/components/DisposBand'
import { ContactForm } from '@/components/ContactForm'
import { SITE, DISPONIBILITES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Faire une demande — Disponibilités & devis',
  description: 'Vérifiez la disponibilité de votre date et recevez un devis personnalisé sous 24h. Domaine la Dame de Cœur, Ménoire, Corrèze.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-[120px] pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="ornament mb-8">✦</div>
          <h1 className="font-serif font-light mb-4" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
            Faire une<br /><em>demande</em>
          </h1>
          <p className="font-sans font-light text-mid text-sm leading-[1.85] max-w-md mx-auto">
            Complétez le formulaire et un membre de notre équipe reviendra vers vous sous 24 heures ouvrées avec les disponibilités et un devis personnalisé.
          </p>
        </div>
      </section>

      <DisposBand />

      {/* Main */}
      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">

          {/* Form */}
          <div>
            <h2 className="font-serif font-light text-3xl mb-1">Votre demande</h2>
            <div className="flex items-center gap-3 font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-mid mb-10">
              <span className="block w-5 h-px bg-gold" />Réponse garantie sous 24h ouvrées
            </div>
            <Suspense fallback={<div className="h-96 bg-cream animate-pulse" />}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24">
            <div className="relative h-48 overflow-hidden mb-8">
              <Image src="/images/grande-salle.jpg" alt="Domaine la Dame de Cœur" fill className="object-cover" />
            </div>

            <h3 className="font-serif font-light text-xl mb-6">{SITE.name}</h3>

            {[
              ['Adresse',  `${SITE.address}\nAccessible depuis Tulle, Brive, Ussel`],
              ['Téléphone', `${SITE.phone}\nLun–Sam · 9h–19h`],
              ['Email',     SITE.email],
              ['Réponse',   'Sous 24 heures ouvrées'],
              ['Visites',   'Sur rendez-vous · 7j/7\nGratuit et sans engagement'],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-border pb-4 mb-4 last:border-b-0">
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-gold mb-1">{k}</p>
                <p className="font-sans font-light text-sm text-charcoal whitespace-pre-line leading-relaxed">{v}</p>
              </div>
            ))}

            {/* Mini dispo */}
            <div className="bg-charcoal p-5 mt-6">
              <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-gold mb-4">Disponibilités</p>
              <div className="flex flex-wrap gap-2">
                {DISPONIBILITES.map(({ date, libre }) => (
                  <span key={date} className={`font-sans text-[10px] font-light px-3 py-1.5 border ${
                    libre ? 'border-white/40 text-white/70' : 'border-white/10 text-white/20 line-through'
                  }`}>
                    {date}
                  </span>
                ))}
              </div>
            </div>

            {/* Témo */}
            <div className="border-t border-border pt-6 mt-6">
              <div className="text-gold text-sm tracking-[3px] mb-3">★★★★★</div>
              <blockquote className="font-serif font-light italic text-base leading-relaxed text-charcoal mb-3">
                &ldquo;Réponse rapide, équipe disponible, devis clair. On a visité le Domaine le week-end et signé 3 jours après.&rdquo;
              </blockquote>
              <cite className="not-italic font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-gold">Céline M. · Mariage 2024</cite>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
