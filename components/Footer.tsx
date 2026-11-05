import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/lib/constants'
import { getSettings } from '@/lib/content'

const schema = (s: Awaited<ReturnType<typeof getSettings>>) => ({
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  name: SITE.name,
  description: 'Grande salle de réception, espace festif à piste LED et bar lounge à Ménoire, Corrèze.',
  address: { '@type': 'PostalAddress', addressLocality: 'Ménoire', postalCode: '19190', addressCountry: 'FR' },
  ...(s.phoneOk ? { telephone: s.phone } : {}),
  email: s.email,
  maximumAttendeeCapacity: Number(s.stats.capacite) || 150,
})

const EVENEMENTS: [string, string][] = [
  ['Mariages', '/mariages'],
  ['Anniversaires', '/soirees'],
  ['EVJF & EVG', '/soirees'],
  ['Entreprise & séminaire', '/soirees'],
  ['Réveillons', '/soirees'],
]

const DOMAINE: [string, string][] = [
  ['Les espaces', '/espaces'],
  ['Disponibilités & devis', '/contact'],
  ['Organiser une visite', '/contact'],
  ['Mentions légales', '/mentions-legales'],
]

export async function Footer() {
  const s = await getSettings()
  return (
    <div className="dc">
      <footer className="footer">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema(s)) }} />
        <div className="wrap">
          <div className="footer-top">
            <div>
              <Link className="brand" href="/" aria-label={`${SITE.name} — accueil`}>
                <Image className="brand-logo" src="/logo.svg" alt={SITE.name} width={843} height={704} unoptimized />
              </Link>
              <p style={{ maxWidth: 300, marginTop: 18 }}>
                Complexe événementiel à Ménoire, Corrèze. Grande salle de réception, espace festif à piste LED et bar lounge. Le Domaine se loue dans son ensemble.
              </p>
            </div>
            <div>
              <strong style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 400 }}>Événements</strong>
              <ul className="footer-links">
                {EVENEMENTS.map(([l, h]) => (
                  <li key={h + l}><Link href={h}>{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <strong style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 400 }}>Le Domaine</strong>
              <ul className="footer-links">
                {DOMAINE.map(([l, h]) => (
                  <li key={h + l}><Link href={h}>{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} {SITE.name} · {s.address}</span>
            <span>Visites sur rendez-vous, 7j/7</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
