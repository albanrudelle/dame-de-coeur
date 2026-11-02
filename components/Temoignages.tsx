import { getSettings, getTemoignages } from '@/lib/content'

export async function Temoignages({ featured = 0 }: { featured?: number }) {
  const [list, { stats }] = await Promise.all([getTemoignages(), getSettings()])
  const feat = list[featured] ?? list[0]
  const others = list.filter(t => t !== feat).slice(0, 3)

  return (
    <section className="testimonial section-tone">
      <div className="wrap">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>Ils nous ont fait confiance</div>
        <p className="quote">« {feat.quote} »</p>
        <div className="quote-by">{feat.author} · {feat.event}</div>

        <div className="t-grid">
          {others.map(t => (
            <figure className="t-card" key={t.author}>
              <div className="stars" role="img" aria-label={`${t.stars} étoiles sur 5`}>{'★'.repeat(t.stars)}</div>
              <blockquote>« {t.quote} »</blockquote>
              <figcaption><strong>{t.author}</strong><span>{t.event}</span></figcaption>
            </figure>
          ))}
        </div>

        <div className="t-meta">
          <b>{stats.avis}</b> avis vérifiés · Moyenne <b>{stats.note}</b>/5 sur Google
        </div>
      </div>
    </section>
  )
}
