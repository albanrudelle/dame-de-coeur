import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/dc/PageHero'
import { CtaBand } from '@/components/dc/CtaBand'
import { Temoignages } from '@/components/Temoignages'
import { getPage, getPrix } from '@/lib/content'
import { Faq } from '@/components/dc/Faq'

export const metadata: Metadata = {
  title: 'Salle de mariage en Corrèze — Ménoire',
  description: "Organisez votre mariage au Domaine la Dame de Cœur à Ménoire. Grande salle 150 convives, espace festif avec piste LED, bar lounge. Devis gratuit.",
}

const PARCOURS = [
  { step: "Vin d'honneur", lieu: 'Petite salle & bar lounge miroir', desc: "Accueil des invités dans notre espace bar miroir. Ambiance chaleureuse, lumières tamisées, cocktails au bar professionnel." },
  { step: 'Repas',          lieu: 'Grande salle de réception',         desc: "Sous les lustres en cristal, face à la fresque murale. Tables décorées selon votre thème, jusqu'à 150 convives." },
  { step: 'After',          lieu: 'Espace festif et piste LED',          desc: "Piste LED au sol, lasers, boule à facettes. Une vraie soirée dansante jusqu'au bout de la nuit." },
]

const INCLUS = [
  'Les trois espaces, privatisés pour vous',
  'Bar professionnel',
  'Son et lumière complets (régie, lasers, boule)',
  'Tables, chaises et vaisselle incluses',
  'Climatisation · Accès PMR · Parking privatif',
  'Visite préparatoire incluse',
  'Option décoration thématique sur demande',
]

const GALERIE = [
  { img: 'fresque-banc', alt: 'Fresque murale et banc en bois de la grande salle' },
  { img: 'table-exterieur', alt: 'Longue table dressée en extérieur, sous un grand arbre' },
  { img: 'champagne',    alt: 'Service du champagne pour le vin d\'honneur' },
  { img: 'bouquet',      alt: 'Bouquet de mariage' },
]

export default async function MariagesPage() {
  const p = await getPage('pageMariages')
  const prix = await getPrix()
  const inclus = p.inclus ?? INCLUS
  const galerie = [...p.galerie, ...GALERIE.slice(p.galerie.length).map(g => ({ src: `/images/${g.img}.jpg`, alt: g.alt }))].slice(0, 4)
  return (
    <div className="dc">
      <PageHero
        eyebrow="Mariages"
        title={<>{p.titreHaut ?? 'Le lieu parfait,'}<br /><em>{p.titreItalique ?? 'pour un jour parfait.'}</em></>}
        lead={p.intro ?? "Célébrez votre mariage au cœur de la Corrèze. Du vin d'honneur jusqu'au dernier slow, le Domaine accueille chaque moment de votre journée, sans déplacer vos invités."}
        img={p.image ?? '/images/salle-reception.jpg'}
        alt={p.alt ?? 'Mariage au Domaine la Dame de Cœur'}
        note="Ménoire · Corrèze"
      >
        <div className="hero-actions">
          <Link className="button" href="/contact">Obtenir un devis gratuit →</Link>
          <Link className="button button-outline" href="/espaces">Découvrir les espaces</Link>
        </div>
      </PageHero>

      {/* Parcours + formule */}
      <section className="section">
        <div className="wrap combo combo-top">
          <div>
            <div className="eyebrow">Le parcours d&apos;une soirée</div>
            <h2>Votre journée,<br /><em>du vin d&apos;honneur à la dernière danse.</em></h2>
            <ol className="steps">
              {PARCOURS.map(p => (
                <li key={p.step}>
                  <small>{p.step}</small>
                  <h3>{p.lieu}</h3>
                  <p>{p.desc}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="panel">
              <h3>Le Domaine en exclusivité : tout est inclus</h3>
              <ul className="check-list">
                {inclus.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="price-note">
              Location du Domaine : de <strong>{prix}</strong> selon la date et les options. Devis personnalisé.
            </div>
          </div>
        </div>
      </section>

      <div className="photo-band">
        <Image src={p.imageBandeau ?? '/images/table-longue.jpg'} alt={p.altBandeau ?? 'Longue table de banquet dressée pour un mariage'} fill sizes="100vw" />
      </div>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="strip">
          {galerie.map(g => (
            <div key={g.src}>
              <Image src={g.src} alt={g.alt} fill sizes="(max-width: 900px) 50vw, 25vw" />
            </div>
          ))}
        </div>
      </section>

      <Temoignages featured={0} showOthers={false} />

      <Faq prix={prix} limit={4} />

      <CtaBand
        eyebrow="Une date en tête ?"
        title={p.ctaTitre ?? 'Vérifions ensemble votre date.'}
        text={p.ctaTexte ?? 'Aucun engagement : nous vous répondons avec les disponibilités et un devis personnalisé.'}
        label="Vérifier une disponibilité"
      />
    </div>
  )
}

export const dynamic = 'force-dynamic'
