import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/dc/PageHero'
import { CtaBand } from '@/components/dc/CtaBand'
import { Temoignages } from '@/components/Temoignages'
import { getEvenements, getPage } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Anniversaires, EVJF, EVG & soirées en Corrèze',
  description: "Anniversaires, EVJF, EVG, séminaires et réveillons au Domaine la Dame de Cœur. Espace festif à piste LED, bar lounge, grande salle. Devis gratuit 24h.",
}

// "type" correspond à une valeur de EVENT_TYPES (préremplit le formulaire de contact)
const EVENTS = [
  { img: 'piste4',       type: 'Anniversaire',             label: 'Anniversaires',              titre: '30 · 40 · 50 · 60 ans',                 desc: "Jusqu'à 150 personnes dans un cadre de prestige, avec décoration thématique disponible pour une soirée mémorable.", tags: ["Jusqu'à 150 personnes", 'Décoration thème', 'Bar inclus'] },
  { img: 'petite-salle', type: 'EVJF / EVG',               label: 'EVJF & EVG',                 titre: 'La nuit avant le grand jour',           desc: "Le bar miroir design, l'ambiance lounge, les éclairages tamisés et la piste LED : une soirée conviviale et festive, à votre image.", tags: ['Bar miroir', 'Piste LED', 'Personnalisation totale'] },
  { img: 'ceremonie',    type: 'Séminaire',                label: 'Entreprise & Séminaire',     titre: "Journée de travail, dîner d'équipe",    desc: "Les ateliers dans un espace, le repas dans un autre, la soirée d'équipe sur la piste : tout s'enchaîne naturellement sur place. Équipement audiovisuel disponible.", tags: ['Plusieurs espaces', 'Parking aisé'] },
  { img: 'piste3',       type: 'Réveillon / Soirée thème', label: 'Réveillons & Soirées thème', titre: 'Noël · Saint-Valentin · Années 80…',    desc: "L'espace festif se transforme entièrement selon votre univers. Chaque thème réinvente l'espace pour une soirée hors du commun.", tags: ['Décoration immersive', 'Piste LED'] },
]

export default async function SoireesPage() {
  const p = await getPage('pageSoirees')
  const events = await getEvenements(EVENTS)
  return (
    <div className="dc">
      <PageHero
        eyebrow="Soirées & Événements"
        title={<>{p.titreHaut ?? 'Des moments'}<br /><em>{p.titreItalique ?? 'qui se racontent.'}</em></>}
        lead={p.intro ?? 'Anniversaires, enterrements de vie, séminaires, réveillons : chaque événement devient une expérience à part entière.'}
        img={p.image ?? '/images/piste2.jpg'}
        alt={p.alt ?? 'Soirée sur la piste LED du Domaine la Dame de Cœur'}
        note="Piste LED · Régie lumière"
      >
        <div className="hero-actions">
          <Link className="button" href="/contact">Obtenir un devis gratuit →</Link>
        </div>
      </PageHero>

      <section className="section wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Tous vos événements</div>
            <h2>Une salle,<br />mille occasions.</h2>
          </div>
          <p className="lead">Quel que soit l&apos;événement, tout le Domaine est à vous : la grande salle pour réunir tout le monde, l&apos;espace festif pour danser, la petite salle et son bar lounge pour les cocktails et les moments conviviaux.</p>
        </div>
        <div className="event-grid">
          {events.map(ev => (
            <article className="event-card" key={ev.label}>
              <div className="event-media">
                <Image src={ev.img} alt={ev.label} fill sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <div className="event-body">
                <div className="eyebrow">{ev.label}</div>
                <h2>{ev.titre}</h2>
                <p>{ev.desc}</p>
                <div className="tags">
                  {ev.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
                <Link className="text-link" href={`/contact?type=${encodeURIComponent(ev.type)}`}>
                  Faire une demande →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Temoignages featured={2} />

      <CtaBand
        eyebrow="Chaque événement mérite un écrin"
        title={p.ctaTitre ?? 'Parlons de votre soirée.'}
        text={p.ctaTexte ?? 'Contactez-nous pour vérifier les disponibilités et recevoir un devis sous 24h.'}
        label="Faire une demande"
      />
    </div>
  )
}

export const dynamic = 'force-dynamic'
