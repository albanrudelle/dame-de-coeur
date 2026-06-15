import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { DisposBand } from '@/components/DisposBand'
import { Temoignages } from '@/components/Temoignages'
import { ESPACES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Domaine la Dame de Cœur — Salle de réception & discothèque en Corrèze',
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO plein écran ── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <Image src="/images/hero.jpg" alt="Domaine la Dame de Cœur — Ménoire, Corrèze"
          fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 to-charcoal/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-[72px]">
          <p className="font-sans text-[10px] font-light tracking-[0.3em] uppercase text-white/70 mb-8">
            Ménoire · Corrèze
          </p>
          <h1 className="font-serif font-light text-white leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(52px,9vw,100px)' }}>
            Domaine<br />la Dame<br /><em>de Cœur</em>
          </h1>
          <p className="font-serif italic font-light text-white/70 mb-10"
            style={{ fontSize: 'clamp(16px,2vw,22px)' }}>
            Un lieu d&apos;exception pour vos plus beaux moments
          </p>
          <Link href="/contact" className="btn-outline-white">
            Faire une demande
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/40">Découvrir</span>
          <span className="block w-px h-10 bg-white/25" />
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="ornament mb-8">✦</div>
          <h2 className="font-serif font-light mb-6" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
            Un écrin unique<br /><em>au cœur de la Corrèze</em>
          </h2>
          <p className="font-sans font-light text-mid leading-[1.9] text-[15px]">
            À Ménoire, le Domaine la Dame de Cœur réunit en un seul lieu tout ce dont vous avez besoin
            pour une célébration inoubliable. Grande salle parée de lustres en cristal, discothèque privée
            avec piste LED encastrée, bar lounge miroir — chaque espace a été pensé pour offrir un cadre
            de prestige, à portée de tous.
          </p>
        </div>
      </section>

      {/* ── GRANDE PHOTO ── */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image src="/images/salle-table.jpg" alt="Grande salle de mariage — Domaine la Dame de Cœur"
          fill className="object-cover" />
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {[['150', 'Convives maximum'], ['+200', 'Événements réussis'], ['3', 'Espaces distincts'], ['4.9', 'Note Google ★']].map(([num, label]) => (
          <div key={label} className="border-r border-border last:border-r-0 py-10 px-6 text-center">
            <div className="font-serif font-light text-5xl md:text-6xl text-charcoal mb-2">{num}</div>
            <div className="font-sans text-[10px] font-light tracking-[0.12em] uppercase text-mid">{label}</div>
          </div>
        ))}
      </div>

      {/* ── INCLUS ── */}
      <div className="bg-cream border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[['◈', 'Bar professionnel inclus', "Tireuse à bière, comptoir rétroéclairé — votre bar est prêt"],
            ['◈', 'Son & lumière complets',  "Régie LED, lasers, boule à facettes — tout est déjà en place"],
            ['◈', 'Décoration sur mesure',   "Packs thématiques disponibles selon vos couleurs et univers"],
            ['◈', 'Accès PMR & parking',     "Rampe d'accès, plain-pied, grand parking privatif sur site"],
          ].map(([icon, title, desc]) => (
            <div key={title} className="py-10 px-8 text-center">
              <div className="text-gold text-lg mb-3 tracking-wider">{icon}</div>
              <h4 className="font-sans font-medium text-sm mb-2">{title}</h4>
              <p className="font-sans font-light text-xs text-mid leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SPLIT: Grande salle ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        <div className="relative h-72 lg:h-auto overflow-hidden">
          <Image src="/images/grande-salle.jpg" alt="Grande salle de réception — lustres en cristal"
            fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center px-10 lg:px-16 py-16 bg-ivory">
          <p className="eyebrow mb-5">La grande salle</p>
          <h2 className="font-serif font-light mb-5" style={{ fontSize: 'clamp(28px,3vw,42px)' }}>
            Lustres en cristal,<br /><em>parquet chaleureux</em>
          </h2>
          <p className="font-sans font-light text-mid text-sm leading-[1.9] mb-7">
            Deux lustres en cristal en cascade, drapés plafond blancs, fresque murale peinte et parquet
            chaleureux. Notre salle principale accueille jusqu&apos;à 150 convives dans un cadre qui rivalise
            avec les plus beaux domaines de la région.
          </p>
          <ul className="space-y-3 mb-10">
            {['Jusqu\'à 150 convives en configuration banquet','Configuration cocktail également disponible','Climatisée · Accessible PMR · Lumière naturelle'].map(t => (
              <li key={t} className="flex items-center gap-4 font-sans font-light text-sm text-mid">
                <span className="block w-5 h-px bg-gold flex-shrink-0" />{t}
              </li>
            ))}
          </ul>
          <Link href="/espaces" className="link-arrow">Découvrir les espaces</Link>
        </div>
      </div>

      {/* ── SPLIT: Discothèque (reversed) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        <div className="flex flex-col justify-center px-10 lg:px-16 py-16 bg-charcoal order-2 lg:order-1">
          <p className="eyebrow mb-5" style={{ color: '#B8966E' }}>
            <span className="block w-6 h-px bg-gold mr-3 inline-block" />
            La discothèque
          </p>
          <h2 className="font-serif font-light text-white mb-5" style={{ fontSize: 'clamp(28px,3vw,42px)' }}>
            Piste LED,<br /><em>unique en Corrèze</em>
          </h2>
          <p className="font-sans font-light text-white/60 text-sm leading-[1.9] mb-7">
            Une discothèque privée dotée d&apos;une piste de danse avec LEDs encastrées dans le sol — rare en
            location privée. Régie lumière complète, canapés lounge, bar panoramique sur mezzanine.
          </p>
          <ul className="space-y-3 mb-10">
            {['Piste LED encastrée dans le sol','Régie lumière · Lasers · Boule à facettes','Bar mezzanine panoramique · Canapés lounge'].map(t => (
              <li key={t} className="flex items-center gap-4 font-sans font-light text-sm text-white/60">
                <span className="block w-5 h-px bg-gold flex-shrink-0" />{t}
              </li>
            ))}
          </ul>
          <Link href="/mariages" className="link-arrow" style={{ color: 'white' }}
            onMouseEnter={e => {(e.currentTarget.querySelector('span') as HTMLElement)?.classList.add('w-12')}}>
            Planifier votre mariage
            <span className="block w-8 h-px bg-white transition-all" />
          </Link>
        </div>
        <div className="relative h-72 lg:h-auto overflow-hidden order-1 lg:order-2">
          <Image src="/images/piste4.jpg" alt="Discothèque privée — piste LED" fill className="object-cover" />
        </div>
      </div>

      {/* ── TÉMOIGNAGES ── */}
      <Temoignages variant="dark" />

      {/* ── GALERIE MOSAÏQUE ── */}
      <div className="grid grid-cols-3 gap-[3px] bg-border">
        <div className="col-span-2 row-span-2 relative h-[540px] overflow-hidden group">
          <Image src="/images/salle-table2.jpg" alt="Salle de réception décorée" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
        <div className="relative h-[267px] overflow-hidden group">
          <Image src="/images/piste-bar.jpg" alt="Piste et bar discothèque" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
        <div className="relative h-[267px] overflow-hidden group">
          <Image src="/images/lounge.jpg" alt="Espace lounge" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
        <div className="relative h-[267px] overflow-hidden group">
          <Image src="/images/table1.jpg" alt="Table décorée" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
        <div className="relative h-[267px] overflow-hidden group">
          <Image src="/images/table3.jpg" alt="Détail décoration" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <section className="bg-charcoal py-32 px-6 text-center">
        <div className="ornament mb-10" style={{ color: '#B8966E' }}>
          <span className="block w-10 h-px bg-gold" />✦<span className="block w-10 h-px bg-gold" />
        </div>
        <h2 className="font-serif font-light text-white mb-4" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
          Votre célébration<br /><em>commence ici</em>
        </h2>
        <p className="font-sans font-light text-white/50 max-w-md mx-auto mb-10 text-sm leading-[1.8]">
          Disponibilités, visites du Domaine, devis personnalisé — notre équipe vous répond sous 24 heures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-gold">Faire une demande</Link>
          <Link href="/espaces" className="btn-outline-white">Découvrir les espaces</Link>
        </div>
      </section>

      <DisposBand />
    </>
  )
}
