const STEPS: [string, string, string][] = [
  ['1', 'Vous nous écrivez', "Date, type d'événement, nombre d'invités : 2 minutes suffisent, sans engagement."],
  ['2', 'Nous vous répondons', 'Vous recevez les disponibilités de votre date et un devis personnalisé.'],
  ['3', 'Vous visitez le Domaine', 'Visite gratuite sur rendez-vous, 7j/7, pour vous projeter avant de confirmer.'],
]

export function HowItWorks() {
  return (
    <section className="section wrap">
      <div className="section-head">
        <div>
          <div className="eyebrow">Simple et sans surprise</div>
          <h2>Réserver en<br />trois étapes.</h2>
        </div>
        <p className="lead">Pas de formulaire interminable : une demande, une réponse rapide, une visite.</p>
      </div>
      <div className="how">
        {STEPS.map(([n, t, d]) => (
          <div className="how-step" key={n}>
            <b>{n}</b>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
