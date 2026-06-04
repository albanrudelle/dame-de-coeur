import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ESPACES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Nos espaces — Grande salle, discothèque & bar lounge en Corrèze',
  description: "Découvrez les 3 espaces du Domaine la Dame de Cœur : grande salle (150 convives), discothèque privée avec piste LED, petite salle & bar lounge. Ménoire, Corrèze.",
}

export default function EspacesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <Image src="/images/grande-salle.jpg" alt="Les espaces — Domaine la Dame de Cœur" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 lg:px-16 pb-16 pt-[72px]">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5" style={{ color: '#B8966E' }}>
              <span className="block w-6 h-px bg-gold" />Les Espaces
            </p>
            <h1 className="font-serif font-light text-white mb-3" style={{ fontSize: 'clamp(36px,6vw,60px)' }}>
              Trois univers,<br /><em>une soirée complète</em>
            </h1>
            <p className="font-sans font-light text-white/60 text-sm max-w-xl leading-relaxed">
              Chaque espace peut être loué séparément ou combiné pour une expérience complète, du vin d&apos;honneur au dernier slow.
            </p>
          </div>
        </div>
      </section>

      {/* Espaces alternés */}
      {ESPACES.map((esp, i) => (
        <div key={esp.slug}>
          <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[560px] ${i % 2 === 1 ? '' : ''}`}>
            <div className={`relative h-64 lg:h-auto overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <Image src={esp.img} alt={esp.titre} fill className="object-cover" />
            </div>
            <div className={`flex flex-col justify-center px-10 lg:px-16 py-16 ${i % 2 === 1 ? 'bg-cream lg:order-1' : 'bg-ivory'}`}>
              <p className="eyebrow mb-5">Espace {esp.num}</p>
              <h2 className="font-serif font-light mb-2" style={{ fontSize: 'clamp(26px,3vw,40px)' }}>{esp.titre}</h2>
              <p className="font-sans text-[11px] font-medium tracking-wider text-gold mb-6 uppercase">{esp.cap}</p>
              <p className="font-sans font-light text-sm text-mid leading-[1.9] mb-6">{esp.desc}</p>
              <ul className="space-y-2.5 mb-8">
                {esp.detail.map(d => (
                  <li key={d} className="flex items-start gap-4 font-sans font-light text-sm text-mid">
                    <span className="block w-5 h-px bg-gold flex-shrink-0 mt-2" />{d}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-8">
                {esp.tags.map(t => <span key={t} className="etag">{t}</span>)}
              </div>
              <Link href="/contact" className="link-arrow">Vérifier les disponibilités</Link>
            </div>
          </div>

          {/* Idéal pour */}
          <div className={`border-t border-border py-6 px-10 lg:px-16 ${i % 2 === 1 ? 'bg-cream' : 'bg-ivory'}`}>
            <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-8 gap-y-2">
              <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-mid">Idéal pour</span>
              {esp.ideal.map(item => (
                <span key={item} className="font-sans text-[11px] font-light text-charcoal flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold inline-block" />{item}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Formule complète */}
      <section className="bg-charcoal py-24 px-6 text-center">
        <div className="ornament mb-10" style={{ color: '#B8966E' }}>
          <span className="block w-10 h-px bg-gold" />✦<span className="block w-10 h-px bg-gold" />
        </div>
        <h2 className="font-serif font-light text-white mb-4" style={{ fontSize: 'clamp(30px,4vw,50px)' }}>
          Les trois espaces réunis<br /><em>pour votre mariage</em>
        </h2>
        <p className="font-sans font-light text-white/50 max-w-lg mx-auto text-sm leading-[1.8] mb-3">
          Vin d&apos;honneur · Repas · After discothèque. Vos invités ne quittent jamais le site. La formule la plus demandée.
        </p>
        <p className="font-sans text-sm text-white/35 mb-10">
          Fourchette indicative : <span className="text-gold-light font-medium">1 800 € à 3 500 €</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn-gold">Demander un devis formule complète</Link>
          <Link href="/mariages" className="btn-outline-white">En savoir plus sur les mariages</Link>
        </div>
      </section>

      {/* Extérieur */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        <div className="relative h-64 lg:h-auto overflow-hidden">
          <Image src="/images/exterieur.jpg" alt="Façade extérieure Domaine la Dame de Cœur" fill className="object-cover" />
        </div>
        <div className="flex flex-col justify-center px-10 lg:px-16 py-16 bg-cream">
          <p className="eyebrow mb-5">Le Domaine</p>
          <h2 className="font-serif font-light mb-5" style={{ fontSize: 'clamp(26px,3vw,40px)' }}>
            Ménoire,<br /><em>Corrèze</em>
          </h2>
          <p className="font-sans font-light text-sm text-mid leading-[1.9] mb-7">
            Situé à Ménoire, le Domaine est accessible depuis Tulle, Brive-la-Gaillarde et Ussel.
            Façade en pierre de taille, grand parking privatif, accès PMR. Un site d&apos;exception au cœur de la nature corrézienne.
          </p>
          <ul className="space-y-2.5 mb-8">
            {['Accessible depuis Tulle, Brive, Ussel','Grand parking privatif sur site','Accès PMR · Plain-pied · Tout confort'].map(t => (
              <li key={t} className="flex items-center gap-4 font-sans font-light text-sm text-mid">
                <span className="block w-5 h-px bg-gold flex-shrink-0" />{t}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="link-arrow">Planifier une visite</Link>
        </div>
      </div>
    </>
  )
}
