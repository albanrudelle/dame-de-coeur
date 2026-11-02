import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/dc/PageHero'
import { getEspaces, getPage, getPrix } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Nos espaces — Grande salle, discothèque & bar lounge en Corrèze',
  description: "Découvrez les 3 espaces du Domaine la Dame de Cœur : grande salle (150 convives), discothèque privée avec piste LED, petite salle & bar lounge. Ménoire, Corrèze.",
}

export default async function EspacesPage() {
  const [p, espaces, prix] = await Promise.all([getPage('pageEspaces'), getEspaces(), getPrix()])
  return (
    <div className="dc">
      <PageHero
        eyebrow="Les espaces"
        title={<>{p.titreHaut ?? 'Trois univers,'}<br /><em>{p.titreItalique ?? 'une soirée complète.'}</em></>}
        lead={p.intro ?? "Chaque espace peut être loué séparément ou combiné pour une expérience complète, du vin d'honneur au dernier slow."}
        img={p.image ?? '/images/hero.jpg'}
        alt={p.alt ?? 'La grande salle du Domaine la Dame de Cœur'}
        note="3 espaces · 150 convives maximum"
      />

      {espaces.map((e, i) => (
        <div key={e.slug} id={e.slug}>
          <div className={`split${i % 2 === 1 ? ' reverse tone' : ''}`}>
            <div className="split-media">
              <Image src={e.img} alt={e.titre} fill sizes="(max-width: 680px) 100vw, 50vw" />
            </div>
            <div className="split-body">
              <div className="eyebrow">Espace {e.num}</div>
              <h2>{e.titre}</h2>
              <p className="cap">{e.cap}</p>
              <p className="lead">{e.desc}</p>
              <ul className="check-list">
                {e.detail.map(d => <li key={d}>{d}</li>)}
              </ul>
              <div className="tags">
                {e.tags.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
              <Link className="button" href="/contact">Vérifier les disponibilités <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="ideal">
            <b>Idéal pour</b>
            {e.ideal.map(x => <span key={x}>{x}</span>)}
          </div>
        </div>
      ))}

      <section className="dark-band">
        <div className="eyebrow">La formule complète</div>
        <h2>Les trois espaces réunis<br /><em>pour votre mariage.</em></h2>
        <p className="lead">Vin d&apos;honneur · Repas · After discothèque. Vos invités ne quittent jamais le site. La formule la plus demandée.</p>
        <p className="price">Fourchette indicative : <strong>{prix}</strong></p>
        <div className="btn-row">
          <Link className="button button-light" href="/contact">Demander un devis formule complète</Link>
          <Link className="button button-outline-light" href="/mariages">En savoir plus sur les mariages</Link>
        </div>
      </section>

      <div className="split tone">
        <div className="split-media">
          <Image src={p.imageDomaine ?? '/images/exterieur.jpg'} alt={p.altDomaine ?? 'Façade extérieure du Domaine la Dame de Cœur'} fill sizes="(max-width: 680px) 100vw, 50vw" />
        </div>
        <div className="split-body">
          <div className="eyebrow">Le Domaine</div>
          <h2>Ménoire,<br /><em>Corrèze.</em></h2>
          <p className="lead">
            {p.texteDomaine ?? `Situé à Ménoire, le Domaine est accessible depuis Tulle, Brive-la-Gaillarde et Ussel. Façade en pierre de taille, grand parking privatif, accès PMR. Un site d’exception au cœur de la nature corrézienne.`}
          </p>
          <ul className="check-list">
            {['Accessible depuis Tulle, Brive, Ussel', 'Grand parking privatif sur site', 'Accès PMR · Plain-pied · Tout confort'].map(t => <li key={t}>{t}</li>)}
          </ul>
          <Link className="button" href="/contact">Planifier une visite <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
