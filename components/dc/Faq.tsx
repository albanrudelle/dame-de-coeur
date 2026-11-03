const ITEMS: [string, string][] = [
  ['Combien de personnes pouvez-vous accueillir ?', "La grande salle reçoit jusqu'à 150 convives en banquet. Le Domaine est loué dans son ensemble : grande salle, espace festif et petite salle avec bar lounge sont à vous pour toute la durée de votre événement."],
  ['Que comprend la location ?', "Le bar professionnel, le son et la lumière (régie LED, lasers, boule à facettes), les tables, chaises et vaisselle, la climatisation, l'accès PMR et le parking privatif sont inclus. Une décoration thématique est possible en option."],
  ['Peut-on visiter le Domaine avant de réserver ?', "Oui, les visites se font sur rendez-vous, 7j/7, gratuitement et sans engagement. Faites une demande et nous vous proposons un créneau."],
  ["Sous quel délai reçoit-on un devis ?", "Notre équipe vous répond sous 24 heures ouvrées avec les disponibilités de votre date et un devis personnalisé."],
  ['Peut-on louer une seule salle ?', "Non, le Domaine se loue dans son ensemble : vos invités profitent des trois espaces sans se déplacer, ce qui permet d'enchaîner vin d'honneur, repas et soirée sur place."],
  ['Quel est le budget à prévoir ?', "La location du Domaine démarre autour de {prix} selon la date et les options. Le devis est gratuit et sans engagement."],
]

export function Faq({ prix }: { prix: string }) {
  const items = ITEMS.map(([q, a]) => [q, a.replace('{prix}', prix)] as [string, string])
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }
  return (
    <section className="section wrap">
      <div className="section-head" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Questions fréquentes</div>
          <h2>Avant de nous contacter</h2>
        </div>
      </div>
      <div className="faq">
        {items.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  )
}
