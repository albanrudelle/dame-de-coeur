import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Configurator } from '@/components/home/Configurator'
import { Temoignages } from '@/components/Temoignages'
import { ESPACES } from '@/lib/constants'
import { getSettings } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Domaine la Dame de Cœur — Salle de réception & discothèque en Corrèze',
}

const INCLUS = [
  'Bar professionnel inclus : tireuse à bière, comptoir rétroéclairé',
  'Son & lumière complets : régie LED, lasers, boule à facettes',
  'Décoration sur mesure : packs thématiques selon vos couleurs',
  'Accès PMR, plain-pied et grand parking privatif sur site',
]

const GALERIE = [
  { src: '/images/salle-table2.jpg', alt: 'Salle de réception décorée' },
  { src: '/images/piste-bar.jpg',    alt: 'Piste et bar de la discothèque' },
  { src: '/images/lounge.jpg',       alt: 'Espace lounge' },
  { src: '/images/table1.jpg',       alt: 'Table décorée' },
  { src: '/images/table3.jpg',       alt: 'Détail de décoration' },
]

const SPACE_LINES = ['01 · L\'espace réception', '02 · L\'espace festif', '03 · L\'espace intime']

export default async function HomePage() {
  const s = await getSettings()
  const h = s.hero
  const galerie = [...s.galerie, ...GALERIE.slice(s.galerie.length)].slice(0, 5)
  return (
    <div className="dc">
      {/* HERO */}
      <section className="hero">
        <div className="hero-wrap">
          <div className="hero-copy">
            <div className="eyebrow">Un lieu d&apos;exception pour vos plus beaux moments</div>
            <h1>{h.titreHaut ?? 'Un écrin au cœur'}<br /><em>{h.titreItalique ?? 'de la Corrèze.'}</em></h1>
            <p className="lead">
              {h.texte ?? "Grande salle aux lustres en cristal, discothèque privée à piste LED encastrée et bar lounge : tout ce qu'il faut pour une célébration inoubliable, au même endroit."}
            </p>
            <div className="hero-actions">
              <Link className="button" href="/espaces">Découvrir nos espaces <span aria-hidden="true">↗</span></Link>
              <a className="button button-outline" href="#configurateur">Vérifier une date</a>
            </div>
            <div className="hero-meta">
              <div><strong>{s.stats.capacite}</strong> convives maximum</div>
              <div><strong>{s.stats.evenements}</strong> événements réussis</div>
              <div><strong>{s.stats.note} ★</strong> note Google</div>
            </div>
          </div>
          <div className="hero-image">
            <Image src={h.image ?? '/images/hero.jpg'} alt={h.alt ?? 'Domaine la Dame de Cœur — Ménoire, Corrèze'} fill priority sizes="(max-width: 680px) 100vw, 60vw" />
            <div className="image-note">Ménoire · Corrèze</div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="intro wrap" id="lieu">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>Le Domaine</div>
        <div className="intro-mark" aria-hidden="true">✳</div>
        <h2>Un lieu, trois espaces,<br />votre histoire.</h2>
        <p className="lead">
          À Ménoire, le Domaine la Dame de Cœur réunit en un seul lieu tout ce dont vous avez besoin pour une célébration inoubliable : une grande salle parée de lustres en cristal, une discothèque privée avec piste LED encastrée et un bar lounge miroir. Chaque espace a été pensé pour offrir un cadre de prestige, à portée de tous.
        </p>
      </section>

      {/* ESPACES */}
      <section className="section wrap" id="espaces">
        <div className="section-head">
          <div>
            <div className="eyebrow">Découvrir les lieux</div>
            <h2>Trois espaces<br />pour une seule soirée.</h2>
          </div>
          <p className="lead">Du dîner sous les lustres à la dernière danse sur la piste LED, vos invités profitent de chaque ambiance sans quitter le Domaine.</p>
        </div>
        <div className="spaces-grid">
          {ESPACES.map((e, i) => (
            <Link className="space-card" href={`/espaces#${e.slug}`} key={e.slug}>
              <Image src={e.img} alt={e.titre} fill sizes="(max-width: 680px) 100vw, 50vw" />
              <div className="space-content">
                <div className="space-topline">{SPACE_LINES[i]}</div>
                <h3>{e.titre}</h3>
                <p>{e.cap}</p>
                <span className="arrow-link">Explorer l&apos;espace ↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CLÉ EN MAIN */}
      <section className="section section-tone">
        <div className="wrap combo">
          <div className="combo-visual">
            <Image src="/images/piste-bar.jpg" alt="Piste de danse et bar de la discothèque" width={1200} height={900} sizes="(max-width: 680px) 100vw, 50vw" />
            <div className="plan-caption"><span>La piste et le bar de la discothèque</span><span>Tout est déjà en place</span></div>
          </div>
          <div>
            <div className="eyebrow">Une réception clé en main</div>
            <h2>Vous apportez l&apos;envie,<br />on s&apos;occupe du reste.</h2>
            <p className="lead">Bar, son, lumière, accessibilité : l&apos;essentiel est déjà installé, pour que vous puissiez vous concentrer sur vos invités.</p>
            <ul className="check-list">
              {INCLUS.map(l => <li key={l}>{l}</li>)}
            </ul>
            <a href="#configurateur" className="button">Vérifier ma date ↗</a>
          </div>
        </div>
      </section>

      {/* CONFIGURATEUR */}
      <section className="configurator" id="configurateur">
        <div className="wrap config-wrap">
          <div>
            <div className="eyebrow" style={{ color: '#c8b18d' }}>Votre projet, notre Domaine</div>
            <h2>Trouvez la formule<br />qui vous ressemble.</h2>
            <p className="lead">Quelques informations suffisent pour explorer les possibilités. Vous pourrez ensuite nous transmettre votre demande et affiner votre projet avec notre équipe.</p>
            <div style={{ marginTop: 32, borderTop: '1px solid rgba(255,255,255,.2)', paddingTop: 18, color: '#c4c9bd', fontSize: 11, maxWidth: 340 }}>
              Pas de réservation immédiate : votre demande permet de vérifier la disponibilité de votre date. Réponse sous 24 heures ouvrées.
            </div>
          </div>
          <Configurator />
        </div>
      </section>

      {/* GALERIE */}
      <section className="section wrap" id="galerie">
        <div className="section-head">
          <div>
            <div className="eyebrow">L&apos;esprit du lieu</div>
            <h2>Imaginez l&apos;instant.</h2>
          </div>
          <p className="lead">Une salle dressée, un toast partagé, les lumières qui s&apos;allument. Projetez-vous dans votre prochaine célébration.</p>
        </div>
        <div className="gallery">
          {galerie.map(g => (
            <div key={g.src}>
              <Image src={g.src} alt={g.alt} fill sizes="(max-width: 680px) 50vw, 33vw" />
            </div>
          ))}
        </div>
      </section>

      <Temoignages />

      {/* CONTACT */}
      <section className="contact-band">
        <div className="wrap contact-inner">
          <div>
            <div className="eyebrow">Votre célébration commence ici</div>
            <h2>Parlons de votre événement.</h2>
            <p className="muted" style={{ margin: 0 }}>Disponibilités, visite du Domaine, devis personnalisé : notre équipe vous répond sous 24 heures.</p>
          </div>
          <Link className="button" href="/contact">Demander un devis ↗</Link>
        </div>
      </section>
    </div>
  )
}

export const dynamic = 'force-dynamic'
