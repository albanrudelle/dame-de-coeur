import type { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import { SITE, EVENT_TYPES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Faire une demande — Disponibilités & devis',
  description: 'Vérifiez la disponibilité de votre date et recevez un devis personnalisé sous 24h. Domaine la Dame de Cœur, Ménoire, Corrèze.',
}

type Props = { searchParams: { [key: string]: string | string[] | undefined } }

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v
}

export default function ContactPage({ searchParams }: Props) {
  const typeParam = first(searchParams.type) ?? ''
  const dateParam = first(searchParams.date) ?? ''
  const defaultType = EVENT_TYPES.includes(typeParam) ? typeParam : ''
  const defaultDate = /^\d{4}-\d{2}-\d{2}$/.test(dateParam) ? dateParam : ''

  // Le numéro n'est affiché que s'il a été renseigné pour de bon (pas le « 05 XX XX XX XX » par défaut).
  const phoneOk = !/x/i.test(SITE.phone)

  const infos: [string, string][] = [
    ['Adresse', `${SITE.address}\nAccessible depuis Tulle, Brive, Ussel`],
    ...(phoneOk ? ([['Téléphone', `${SITE.phone}\nLun–Sam · 9h–19h`]] as [string, string][]) : []),
    ['E-mail', SITE.email],
    ['Réponse', 'Sous 24 heures ouvrées'],
    ['Visites', 'Sur rendez-vous · 7j/7\nGratuit et sans engagement'],
  ]

  return (
    <div className="dc">
      <section className="page-head wrap">
        <div className="eyebrow">Disponibilités &amp; devis</div>
        <h1>Faire une <em>demande</em></h1>
        <p className="lead">
          Complétez le formulaire : un membre de notre équipe revient vers vous sous 24 heures ouvrées avec les disponibilités et un devis personnalisé.
        </p>
      </section>

      <div className="wrap contact-grid">
        <div className="form-card">
          <h2>Votre demande</h2>
          <p className="muted" style={{ marginBottom: 26 }}>Réponse garantie sous 24h ouvrées · Sans engagement</p>
          <ContactForm defaultType={defaultType} defaultDate={defaultDate} />
        </div>

        <aside className="aside">
          <div className="aside-img">
            <Image src="/images/grande-salle.jpg" alt="Le Domaine la Dame de Cœur" fill sizes="(max-width: 900px) 100vw, 380px" />
          </div>
          <h3>{SITE.name}</h3>
          <div>
            {infos.map(([k, v]) => (
              <div className="info-row" key={k}>
                <b>{k}</b>
                <span>{v}</span>
              </div>
            ))}
          </div>
          <div className="aside-quote">
            <div style={{ color: 'var(--gold)', letterSpacing: '.25em', fontSize: 13 }} aria-hidden="true">★★★★★</div>
            <blockquote>« Réponse rapide, équipe disponible, devis clair. On a visité le Domaine le week-end et signé 3 jours après. »</blockquote>
            <cite>Céline M. · Mariage 2024</cite>
          </div>
        </aside>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
