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
  ['Planifier une visite', '/contact'],
  ['Mentions légales', '/mentions-legales'],
]

export function Footer() {
  return (
    <div className="dc">
      <footer className="footer">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <div className="wrap">
          <div className="footer-top">
            <div>
              <Link className="brand" href="/">
                {SITE.name}
                <small>{SITE.location}</small>
              </Link>
              <p style={{ maxWidth: 300, marginTop: 18 }}>
                Complexe événementiel à Ménoire, Corrèze. Grande salle de réception, discothèque privée et bar lounge.
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
            <span>© {new Date().getFullYear()} {SITE.name} · {SITE.address}</span>
            <span>Visites sur rendez-vous, 7j/7</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
