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
  description: "Organisez votre mariage au Domaine la Dame de Cœur à Ménoire. Grande salle 150 convives, espace festif avec piste LED, bar lounge. Devis gratuit sous 24h.",
}

const PARCOURS = [
  { step: "Vin d'honneur", lieu: 'Petite salle & bar lounge miroir', desc: "Accueil des invités dans notre espace bar miroir. Ambiance chaleureuse, lumières tamisées, cocktails au bar professionnel." },
  { step: 'Repas',          lieu: 'Grande salle de réception',         desc: "Sous les lustres en cristal, face à la fresque murale. Tables décorées selon votre thème, jusqu'à 150 convives." },
  { step: 'After',          lieu: 'Espace festif et piste LED',          desc: "Piste LED au sol, lasers, boule à facettes. Une vraie soirée dansante jusqu'au bout de la nuit." },
]

const INCLUS = [
  "Grande salle avec lustres en cristal (jusqu'à 150 convives)",
  'Espace festif avec piste LED encastrée dans le sol',
  'Bar mezzanine panoramique professionnel',
  "Petite salle lounge pour le vin d'honneur",
  'Son et lumière complets (régie, lasers, boule)',
  'Tables, chaises et vaisselle incluses',
  'Climatisation · Accès PMR · Parking privatif',
  'Visite préparatoire incluse',
  'Option décoration thématique sur demande',
]

const GALERIE = [
  { img: 'fresque-banc', alt: 'Fresque murale et banc en bois de la grande salle' },
  { img: 'table-ronde',  alt: 'Table ronde dressée pour un mariage' },
  { img: 'champagne',    alt: 'Service du champagne pour le vin d\'honneur' },
  { img: 'bouquet',      alt: 'Bouquet de mariage' },
]

export default async function MariagesPage() {
  const p = await getPage('pageMariages')
  const prix = await getPrix()
  const inclus = p.inclus ?? INCLUS
  return (
    <div className="dc">
      <PageHero
        eyebrow="Mariages"
        title={<>{p.titreHaut ?? 'Le lieu parfait,'}<br /><em>{p.titreItalique ?? 'pour un jour parfait.'}</em></>}
        lead={p.intro ?? "Célébrez votre mariage dans un écrin d'élégance au cœur de la Corrèze. Du vin d'honneur jusqu'au dernier slow, le Domaine orchestre chaque moment de votre journée."}
        img={p.image ?? '/images/salle-reception.jpg'}
        alt={p.alt ?? 'Mariage au Domaine la Dame de Cœur'}
        note="Ménoire · Corrèze"
      >
        <div className="hero-actions">
          <Link className="button" href="/contact">Obtenir un devis gratuit →</Link>
          <Link className="button button-outline" href="/espaces">Voir les espaces</Link>
        </div>
      </PageHero>

      {/* Parcours + formule */}
      <section className="section">
        <div className="wrap combo combo-top">
          <div>
            <div className="eyebrow">Le parcours d&apos;une soirée</div>
            <h2>Trois espaces,<br /><em>du repas à la dernière danse.</em></h2>
            <ol className="steps">
              {PARCOURS.map(p => (
                <li key={p.step}>
                  <small>{p.step}</small>
                  <h3>{p.lieu}</h3>
                  <p>{p.desc}</p>
                </li>
              ))}
            </ol>
            <Link className="button" href="/contact">Obtenir un devis gratuit →</Link>
          </div>
          <div>
            <div className="panel">
              <h3>Le Domaine en exclusivité : tout est inclus</h3>
              <ul className="check-list">
                {inclus.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="price-note">
              Location du Domaine : de <strong>{prix}</strong> selon la date et les options. Devis personnalisé sous 24h.
            </div>
          </div>
        </div>
      </section>

      <div className="photo-band">
        <Image src="/images/table-longue.jpg" alt="Longue table de banquet dressée pour un mariage" fill sizes="100vw" />
      </div>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="strip">
          {GALERIE.map(g => (
            <div key={g.img}>
              <Image src={`/images/${g.img}.jpg`} alt={g.alt} fill sizes="(max-width: 900px) 50vw, 25vw" />
            </div>
          ))}
        </div>
      </section>

      <Temoignages featured={0} />

      <Faq prix={prix} />

      <CtaBand
        eyebrow="Votre date est peut-être encore disponible"
        title={p.ctaTitre ?? 'Vérifions ensemble votre date.'}
        text={p.ctaTexte ?? 'Les samedis de juin à octobre sont les premiers réservés. Aucun engagement, réponse sous 24h.'}
        label="Vérifier les disponibilités"
      />
    </div>
  )
}

export const dynamic = 'force-dynamic'
