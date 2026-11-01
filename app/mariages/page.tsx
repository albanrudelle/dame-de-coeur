import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/dc/PageHero'
import { CtaBand } from '@/components/dc/CtaBand'
import { Temoignages } from '@/components/Temoignages'

export const metadata: Metadata = {
  title: 'Salle de mariage en Corrèze — Ménoire',
  description: "Organisez votre mariage au Domaine la Dame de Cœur à Ménoire. Grande salle 150 convives, discothèque avec piste LED, bar lounge. Devis gratuit sous 24h.",
}

const PARCOURS = [
  { step: "Vin d'honneur", lieu: 'Petite salle & bar lounge miroir', desc: "Accueil des invités dans notre espace bar miroir. Ambiance intime, lumières tamisées, cocktails au bar professionnel." },
  { step: 'Repas',          lieu: 'Grande salle de réception',         desc: "Sous les lustres en cristal, face à la fresque murale. Tables décorées selon votre thème, jusqu'à 150 convives." },
  { step: 'After',          lieu: 'Discothèque privée',                 desc: "Piste LED au sol, lasers, boule à facettes. Une vraie discothèque privée jusqu'au bout de la nuit." },
]

const INCLUS = [
  "Grande salle avec lustres en cristal (jusqu'à 150 convives)",
  'Discothèque avec piste LED encastrée dans le sol',
  'Bar mezzanine panoramique professionnel',
  "Petite salle lounge pour le vin d'honneur",
  'Son et lumière complets (régie, lasers, boule)',
  'Tables, chaises et vaisselle incluses',
  'Climatisation · Accès PMR · Parking privatif',
  'Visite préparatoire incluse',
  'Option décoration thématique sur demande',
]

const GALERIE = [
  { img: 'grande-salle', alt: 'Grande salle aux lustres en cristal' },
  { img: 'table1',       alt: 'Table de mariage décorée' },
  { img: 'piste',        alt: 'Piste de la discothèque' },
  { img: 'table3',       alt: 'Détail de décoration' },
]

export default function MariagesPage() {
  return (
    <div className="dc">
      <PageHero
        eyebrow="Mariages"
        title={<>Le lieu parfait,<br /><em>pour un jour parfait.</em></>}
        lead="Célébrez votre mariage dans un écrin d'élégance au cœur de la Corrèze. Du vin d'honneur jusqu'au dernier slow, le Domaine orchestre chaque moment de votre journée."
        img="/images/salle-table.jpg"
        alt="Mariage au Domaine la Dame de Cœur"
        note="Ménoire · Corrèze"
      >
        <div className="hero-actions">
          <Link className="button" href="/contact">Demander un devis <span aria-hidden="true">↗</span></Link>
          <Link className="button button-outline" href="/espaces">Voir les espaces</Link>
        </div>
      </PageHero>

      {/* Parcours + formule */}
      <section className="section">
        <div className="wrap combo combo-top">
          <div>
            <div className="eyebrow">Le parcours d&apos;une soirée</div>
            <h2>Trois espaces,<br /><em>une nuit inoubliable.</em></h2>
            <ol className="steps">
              {PARCOURS.map(p => (
                <li key={p.step}>
                  <small>{p.step}</small>
                  <h3>{p.lieu}</h3>
                  <p>{p.desc}</p>
                </li>
              ))}
            </ol>
            <Link className="button" href="/contact">Demander un devis <span aria-hidden="true">↗</span></Link>
          </div>
          <div>
            <div className="panel">
              <h3>Formule complète : tout est inclus</h3>
              <ul className="check-list">
                {INCLUS.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="price-note">
              Formule complète : de <strong>1 800 € à 3 500 €</strong> selon la date et les options. Devis personnalisé sous 24h.
            </div>
          </div>
        </div>
      </section>

      <div className="photo-band">
        <Image src="/images/range-table.jpg" alt="Salle de mariage mise en place" fill sizes="100vw" />
      </div>

      {/* Témoignage mariage */}
      <section className="testimonial">
        <div className="wrap">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Un mariage au Domaine</div>
          <p className="quote">« On a fait le repas dans la grande salle et l&apos;after dans la discothèque. Nos invités ont adoré, sans jamais avoir à prendre leur voiture. La piste LED a été le moment préféré de tout le monde. »</p>
          <div className="quote-by">Marine &amp; Julien · Mariage · 140 personnes · Formule complète · 2024</div>
        </div>
      </section>

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

      <CtaBand
        eyebrow="Votre date est peut-être encore disponible"
        title="Vérifions ensemble votre date."
        text="Les samedis de juin à octobre sont les premiers réservés. Aucun engagement, réponse sous 24h."
        label="Vérifier les disponibilités"
      />
    </div>
  )
}

export const dynamic = 'force-dynamic'
