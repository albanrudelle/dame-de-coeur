const ITEMS: [string, string][] = [
  ['Combien de personnes pouvez-vous accueillir ?', "La grande salle reçoit jusqu'à 150 convives en banquet, la petite salle jusqu'à 50. Les espaces peuvent être loués séparément ou combinés pour une soirée complète."],
  ['Que comprend la location ?', "Le bar professionnel, le son et la lumière (régie LED, lasers, boule à facettes), les tables, chaises et vaisselle, la climatisation, l'accès PMR et le parking privatif sont inclus. Une décoration thématique est possible en option."],
  ['Peut-on visiter le Domaine avant de réserver ?', "Oui, les visites se font sur rendez-vous, 7j/7, gratuitement et sans engagement. Faites une demande et nous vous proposons un créneau."],
  ["Sous quel délai reçoit-on un devis ?", "Notre équipe vous répond sous 24 heures ouvrées avec les disponibilités de votre date et un devis personnalisé."],
  ['Peut-on louer uniquement la discothèque ?', "Oui. La discothèque, la grande salle et la petite salle se louent séparément ou ensemble, selon votre événement."],
  ['Quel est le budget à prévoir ?', "La formule complète démarre autour de {prix} selon la date et les options. Le devis est gratuit et sans engagement."],
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
