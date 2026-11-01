import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = { title: 'Mentions légales', robots: { index: false } }

export default function MentionsLegales() {
  const phoneOk = !/x/i.test(SITE.phone)
  return (
    <div className="dc">
      <div className="legal">
        <div className="eyebrow">Informations légales</div>
        <h1>Mentions légales</h1>

        <section>
          <h2>Éditeur</h2>
          <p>{SITE.name} · {SITE.address}</p>
          <p>{phoneOk ? `Tél : ${SITE.phone} · ` : ''}E-mail : {SITE.email}</p>
        </section>

        <section id="rgpd">
          <h2>Protection des données (RGPD)</h2>
          <p>Les données collectées via le formulaire de contact sont utilisées uniquement pour traiter votre demande. Elles ne sont ni vendues ni partagées. Conformément au RGPD, vous pouvez exercer vos droits d&apos;accès, de rectification et de suppression en contactant : {SITE.email}</p>
        </section>

        <section>
          <h2>Hébergement</h2>
          <p>Vercel Inc., 340 Pine Street Suite 701, San Francisco CA 94104, USA.</p>
        </section>
      </div>
    </div>
  )
}
