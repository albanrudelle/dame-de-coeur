import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Temoignages } from '@/components/Temoignages'

export const metadata: Metadata = {
  title: 'Salle de mariage en Corrèze — Ménoire',
  description: "Organisez votre mariage au Domaine la Dame de Cœur à Ménoire. Grande salle 150 convives, discothèque avec piste LED, bar lounge. Devis gratuit sous 24h.",
}

const PARCOURS = [
  { step: 'Vin d\'honneur', lieu: 'Petite salle & bar lounge miroir', desc: 'Accueil des invités dans notre espace bar miroir. Ambiance intime, lumières tamisées, cocktails au bar professionnel.' },
  { step: 'Repas',          lieu: 'Grande salle de réception',         desc: 'Sous les lustres en cristal, face à la fresque murale. Tables décorées selon votre thème, jusqu\'à 150 convives.' },
  { step: 'After',          lieu: 'Discothèque privée',                 desc: 'Piste LED au sol, lasers, boule à facettes. Une vraie discothèque privée jusqu\'au bout de la nuit.' },
]

const INCLUS = [
  'Grande salle avec lustres en cristal (jusqu\'à 150 convives)',
  'Discothèque avec piste LED encastrée dans le sol',
  'Bar mezzanine panoramique professionnel',
  'Petite salle lounge pour le vin d\'honneur',
  'Son et lumière complets (régie, lasers, boule)',
  'Tables, chaises et vaisselle incluses',
  'Climatisation · Accès PMR · Parking privatif',
  'Visite préparatoire incluse',
  'Option décoration thématique sur demande',
]

export default function MariagesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image src="/images/salle-table.jpg" alt="Mariage — Domaine la Dame de Cœur" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 lg:px-16 pb-16 pt-[72px]">
          <div className="max-w-3xl">
            <p className="eyebrow mb-5 text-white/60" style={{ color: '#B8966E' }}>
              <span className="block w-6 h-px bg-gold" />Mariages
            </p>
            <h1 className="font-serif font-light text-white mb-4" style={{ fontSize: 'clamp(36px,6vw,64px)' }}>
              Le lieu parfait,<br /><em>pour un jour parfait</em>
            </h1>
            <p className="font-sans font-light text-white/65 text-base max-w-xl leading-relaxed">
              Célébrez votre mariage dans un écrin d&apos;élégance au cœur de la Corrèze. Du vin d&apos;honneur jusqu&apos;au dernier slow, le Domaine orchestre chaque moment de votre journée.
            </p>
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow mb-6">Le parcours d&apos;une soirée</p>
            <h2 className="font-serif font-light mb-10" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
              Trois espaces,<br /><em>une nuit inoubliable</em>
            </h2>
            <div className="relative">
              {PARCOURS.map((p, i) => (
                <div key={i} className="flex gap-6 mb-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full flex-shrink-0 mt-1 ${i === PARCOURS.length - 1 ? 'bg-gold' : 'bg-charcoal'}`} />
                    {i < PARCOURS.length - 1 && <div className="w-px bg-border my-1 flex-1 min-h-[40px]" />}
                  </div>
                  <div className="pb-10">
                    <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-gold mb-0.5">{p.step}</p>
                    <h3 className="font-sans font-medium text-sm mb-2">{p.lieu}</h3>
                    <p className="font-sans font-light text-xs text-mid leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-outline-dark mt-2 inline-flex">Demander un devis</Link>
          </div>
          <div>
            <div className="bg-cream border-t-2 border-gold p-8 mb-4">
              <h3 className="font-serif text-xl font-light mb-6">Formule complète — inclus</h3>
              <ul className="space-y-3">
                {INCLUS.map(item => (
                  <li key={item} className="flex items-start gap-4 font-sans font-light text-sm text-mid">
                    <span className="block w-5 h-px bg-gold flex-shrink-0 mt-2" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gold-light border-l-2 border-gold px-5 py-4 font-sans text-sm font-light text-mid">
              Formule complète : de <strong className="text-charcoal font-medium">1 800 € à 3 500 €</strong> selon la date et les options. Devis personnalisé sous 24h.
            </div>
          </div>
        </div>
      </section>

      {/* Photo */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image src="/images/range-table.jpg" alt="Salle de mariage mise en place" fill className="object-cover" />
      </div>

      {/* Témo mariage */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-gold text-base tracking-[4px] mb-6">★★★★★</div>
          <blockquote className="font-serif font-light italic text-2xl md:text-3xl leading-relaxed text-charcoal mb-6">
            &ldquo;On a fait le repas dans la grande salle et l&apos;after dans la discothèque. Nos invités ont adoré — sans jamais avoir à prendre leur voiture. La piste LED a été le moment préféré de tout le monde.&rdquo;
          </blockquote>
          <cite className="not-italic font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-gold">Marine & Julien</cite>
          <p className="font-sans text-xs font-light text-mid mt-1">Mariage · 140 personnes · Formule complète · 2024</p>
        </div>
      </section>

      {/* Galerie */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[3px] bg-border">
        {[['grande-salle','Grande salle lustre cristal'],['table1','Table décorée mariage'],['piste','Piste discothèque'],['table3','Détail décoration']].map(([img, alt]) => (
          <div key={img} className="relative h-52 md:h-64 overflow-hidden group">
            <Image src={`/images/${img}.jpg`} alt={alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
          </div>
        ))}
      </div>

      <Temoignages variant="dark" />

      {/* CTA */}
      <section className="py-24 px-6 text-center bg-ivory">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif font-light mb-4" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
            Votre date est peut-être<br /><em>encore disponible</em>
          </h2>
          <p className="font-sans font-light text-mid text-sm mb-8">Les samedis de juin à octobre sont les premiers réservés. Vérifiez maintenant.</p>
          <Link href="/contact" className="btn-outline-dark">Vérifier les disponibilités</Link>
          <p className="font-sans text-[11px] font-light text-mid mt-4">Aucun engagement · Réponse sous 24h</p>
        </div>
      </section>
    </>
  )
}
