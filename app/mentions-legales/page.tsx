import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = { title: 'Mentions légales', robots: { index: false } }

export default function MentionsLegales() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 font-sans">
      <h1 className="font-serif text-3xl font-light mb-10">Mentions légales</h1>
      <div className="space-y-8 text-sm font-light text-mid leading-relaxed">
        <section>
          <h2 className="font-serif text-lg font-light text-charcoal mb-3">Éditeur</h2>
          <p>{SITE.name} · {SITE.address}</p>
          <p>Tél : {SITE.phone} · Email : {SITE.email}</p>
        </section>
        <section id="rgpd">
          <h2 className="font-serif text-lg font-light text-charcoal mb-3">Protection des données (RGPD)</h2>
          <p>Les données collectées via le formulaire de contact sont utilisées uniquement pour traiter votre demande. Elles ne sont ni vendues ni partagées. Conformément au RGPD, vous pouvez exercer vos droits d&apos;accès, de rectification et de suppression en contactant : {SITE.email}</p>
        </section>
        <section>
          <h2 className="font-serif text-lg font-light text-charcoal mb-3">Hébergement</h2>
          <p>Vercel Inc., 340 Pine Street Suite 701, San Francisco CA 94104, USA.</p>
        </section>
      </div>
    </div>
  )
}
