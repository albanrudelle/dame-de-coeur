import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Anniversaires, EVJF, EVG & soirées en Corrèze',
  description: "Anniversaires, EVJF, EVG, séminaires et réveillons au Domaine la Dame de Cœur. Discothèque privée, bar lounge, grande salle. Devis gratuit 24h.",
}

const EVENTS = [
  { img: 'piste4',       label: 'Anniversaires',             titre: '30 · 40 · 50 · 60 ans',         desc: "Grande salle jusqu'à 150 personnes ou petite salle pour les célébrations plus intimes. Décoration thématique disponible pour un cadre mémorable.", tags: ["Jusqu'à 150 personnes", 'Décoration thème', 'Bar inclus'] },
  { img: 'petite-salle', label: 'EVJF & EVG',                titre: 'La nuit avant le grand jour',    desc: "La petite salle avec son bar miroir design, l'ambiance lounge et les éclairages tamisés est pensée pour les soirées les plus intimes et les plus festives.", tags: ["Jusqu'à 50 personnes", 'Bar miroir', 'Personnalisation totale'] },
  { img: 'piste-bar',    label: 'Entreprise & Séminaire',    titre: 'Journée de travail, dîner d\'équipe', desc: "Petite salle pour les ateliers, grande salle pour le repas. Les deux espaces s'enchaînent naturellement. Équipement audiovisuel disponible.", tags: ['2 espaces combinables', 'Parking aisé'] },
  { img: 'piste3',       label: 'Réveillons & Soirées thème', titre: 'Noël · Saint-Valentin · Années 80…', desc: "La discothèque se transforme entièrement selon votre univers. Chaque thème réinvente l'espace pour une soirée hors du commun.", tags: ['Décoration immersive', 'Piste LED'] },
]

export default function SoireesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[460px] overflow-hidden">
        <Image src="/images/piste3.jpg" alt="Soirée discothèque Domaine la Dame de Cœur" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 lg:px-16 pb-16 pt-[72px]">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5" style={{ color: '#B8966E' }}>
              <span className="block w-6 h-px bg-gold" />Soirées & Événements
            </p>
            <h1 className="font-serif font-light text-white mb-4" style={{ fontSize: 'clamp(36px,6vw,60px)' }}>
              Des moments<br /><em>qui se racontent</em>
            </h1>
            <p className="font-sans font-light text-white/65 text-sm max-w-xl leading-relaxed">
              Anniversaires, enterrements de vie, séminaires, réveillons — chaque événement devient une expérience à part entière.
            </p>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-[3px] bg-border">
          {EVENTS.map(ev => (
            <div key={ev.label} className="bg-ivory group">
              <div className="relative h-64 overflow-hidden">
                <Image src={`/images/${ev.img}.jpg`} alt={ev.label} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="p-8">
                <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-gold mb-2">{ev.label}</p>
                <h2 className="font-serif font-light text-2xl mb-3">{ev.titre}</h2>
                <p className="font-sans font-light text-sm text-mid leading-[1.75] mb-5">{ev.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {ev.tags.map(t => <span key={t} className="etag">{t}</span>)}
                </div>
                <Link href={`/contact?type=${encodeURIComponent(ev.label)}`} className="link-arrow">
                  Faire une demande
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Temo */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-gold text-base tracking-[4px] mb-6">★★★★★</div>
          <blockquote className="font-serif font-light italic text-2xl md:text-3xl leading-relaxed text-charcoal mb-6">
            &ldquo;EVJF parfait dans la petite salle. Le bar miroir, l&apos;ambiance lounge, la déco sur mesure… c&apos;était exactement ce qu&apos;on cherchait. L&apos;équipe est réactive, le lieu impeccable.&rdquo;
          </blockquote>
          <cite className="not-italic font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-gold">Sophie D.</cite>
          <p className="font-sans text-xs font-light text-mid mt-1">EVJF · 22 personnes · 2024</p>
        </div>
      </section>

      <section className="py-20 px-6 text-center bg-charcoal">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif font-light text-white mb-4" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
            Chaque événement<br /><em>mérite un écrin</em>
          </h2>
          <p className="font-sans font-light text-white/50 text-sm mb-8">Contactez-nous pour vérifier les disponibilités et recevoir un devis sous 24h.</p>
          <Link href="/contact" className="btn-gold">Faire une demande</Link>
        </div>
      </section>
    </>
  )
}
