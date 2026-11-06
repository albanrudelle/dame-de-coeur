import type { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import { SITE, EVENT_TYPES, GUEST_RANGES } from '@/lib/constants'
import { formatJour, getDisponibilites, getSettings, getTemoignages } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Faire une demande — Disponibilités & devis',
  description: 'Vérifiez la disponibilité de votre date et recevez un devis personnalisé. Domaine la Dame de Cœur, Ménoire, Corrèze.',
}

type Props = { searchParams: { [key: string]: string | string[] | undefined } }

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v
}

export default async function ContactPage({ searchParams }: Props) {
  const typeParam = first(searchParams.type) ?? ''
  const dateParam = first(searchParams.date) ?? ''
  const defaultType = EVENT_TYPES.includes(typeParam) ? typeParam : ''
  const guestsParam = first(searchParams.n) ?? ''
  const defaultGuests = GUEST_RANGES.includes(guestsParam) ? guestsParam : ''
  const defaultDate = /^\d{4}-\d{2}-\d{2}$/.test(dateParam) ? dateParam : ''

  const [s, dispos, temoignages] = await Promise.all([getSettings(), getDisponibilites(), getTemoignages()])
  const t = temoignages[0]
  // Le numéro n'est affiché que s'il a été renseigné pour de bon.
  const phoneOk = s.phoneOk

  const infos: [string, string][] = [
    ['Adresse', `${s.address}\nAccessible depuis Tulle, Brive, Ussel`],
    ...(phoneOk ? ([['Téléphone', `${s.phone}\n${s.horaires}`]] as [string, string][]) : []),
    ['E-mail', s.email],
    ...(dispos.length ? ([['Prochaines dates libres', dispos.slice(0, 6).map(formatJour).join('\n')]] as [string, string][]) : []),
    ['Visites', 'Sur rendez-vous · 7j/7\nGratuit et sans engagement'],
  ]

  return (
    <div className="dc">
      <section className="page-head wrap">
        <div className="eyebrow">Disponibilités &amp; devis</div>
        <h1>Faire une <em>demande</em></h1>
        <p className="lead">
          Complétez le formulaire : un membre de notre équipe revient vers vous dans les meilleurs délais avec les disponibilités et un devis personnalisé.
        </p>
      </section>

      <div className="wrap contact-grid">
        <div className="form-card">
          <h2>Votre demande</h2>
          <p className="muted" style={{ marginBottom: 26 }}>Sans engagement · Devis gratuit</p>
          <ContactForm defaultType={defaultType} defaultDate={defaultDate} defaultGuests={defaultGuests} />
        </div>

        <aside className="aside">
          <div className="aside-img">
            <Image src={s.contact.image ?? '/images/salle-lustres.jpg'} alt={s.contact.alt ?? 'Le Domaine la Dame de Cœur'} fill sizes="(max-width: 900px) 100vw, 380px" />
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
            <blockquote>« {t.quote} »</blockquote>
            <cite>{t.author}{t.event ? ` · ${t.event}` : ''}</cite>
          </div>
        </aside>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
