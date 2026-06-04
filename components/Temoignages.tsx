import { TEMOIGNAGES } from '@/lib/constants'

export function Temoignages({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const bg   = variant === 'dark'  ? 'bg-charcoal' : 'bg-ivory'
  const head = variant === 'dark'  ? 'text-white'   : 'text-charcoal'
  const body = variant === 'dark'  ? 'text-white/80' : 'text-charcoal'
  const meta = variant === 'dark'  ? 'text-white/40' : 'text-mid'
  const div  = variant === 'dark'  ? 'bg-white/10'   : 'bg-border'

  const [feat, ...rest] = TEMOIGNAGES

  return (
    <section className={`${bg} py-24 px-6 lg:px-10`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-gold text-base tracking-[4px] mb-6">{'★'.repeat(feat.stars)}</div>
          <blockquote className={`font-serif font-light italic text-2xl md:text-3xl lg:text-4xl leading-relaxed ${head} mb-6`}>
            &ldquo;{feat.quote}&rdquo;
          </blockquote>
          <cite className="not-italic font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-gold">{feat.author}</cite>
          <p className={`font-sans text-xs font-light mt-1.5 ${meta}`}>{feat.event}</p>
        </div>

        <div className={`w-10 h-px ${div} mx-auto mb-14`} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {rest.slice(0, 2).map((t, i) => (
            <div key={i}>
              <div className="text-gold text-sm tracking-[3px] mb-4">{'★'.repeat(t.stars)}</div>
              <blockquote className={`font-serif font-light italic text-lg leading-relaxed ${body} mb-4`}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <cite className="not-italic font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-gold">{t.author}</cite>
              <p className={`font-sans text-[11px] font-light mt-1 ${meta}`}>{t.event}</p>
            </div>
          ))}
        </div>

        <div className={`text-center mt-14 font-sans text-xs font-light ${meta}`}>
          <span className="font-serif text-gold text-2xl">87</span>{' '}avis vérifiés · Moyenne{' '}
          <span className="font-serif text-gold text-xl">4.9</span>/5 sur Google
        </div>
      </div>
    </section>
  )
}
