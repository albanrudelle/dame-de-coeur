import Link from 'next/link'
import { SITE } from '@/lib/constants'

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  name: SITE.name,
  description: 'Grande salle de réception, discothèque privée et bar lounge à Ménoire, Corrèze.',
  address: { '@type': 'PostalAddress', addressLocality: 'Ménoire', postalCode: '19190', addressCountry: 'FR' },
  telephone: SITE.phone,
  email: SITE.email,
  maximumAttendeeCapacity: 150,
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/40 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-serif text-[15px] text-white/80 tracking-[0.12em] uppercase mb-1">{SITE.name}</p>
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/30 mb-4">{SITE.location}</p>
            <p className="text-xs font-light leading-relaxed max-w-xs">
              Complexe événementiel à Ménoire, Corrèze. Grande salle de réception, discothèque privée et bar lounge.
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/50 mb-5">Événements</h3>
            <ul className="space-y-2.5">
              {[['Mariages', '/mariages'], ['Anniversaires', '/soirees'], ['EVJF & EVG', '/soirees'], ['Entreprise & séminaire', '/soirees'], ['Réveillons', '/soirees']].map(([l, h]) => (
                <li key={h+l}><Link href={h} className="text-xs font-light hover:text-white/70 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/50 mb-5">Le Domaine</h3>
            <ul className="space-y-2.5">
              {[['Les espaces', '/espaces'], ['Disponibilités & devis', '/contact'], ['Planifier une visite', '/contact'], ['Mentions légales', '/mentions-legales']].map(([l, h]) => (
                <li key={h+l}><Link href={h} className="text-xs font-light hover:text-white/70 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[11px] font-light">© {new Date().getFullYear()} {SITE.name} · {SITE.address}</p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-gold/30">Fait avec soin</p>
        </div>
      </div>
    </footer>
  )
}
