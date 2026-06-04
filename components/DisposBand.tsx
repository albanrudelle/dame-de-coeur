import Link from 'next/link'
import { DISPONIBILITES } from '@/lib/constants'

export function DisposBand() {
  return (
    <div className="bg-cream border-y border-border py-4">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center gap-3 flex-wrap">
        <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-mid flex-shrink-0">
          Prochains samedis
        </span>
        <div className="flex gap-2 flex-wrap">
          {DISPONIBILITES.map(({ date, libre }) => (
            <span key={date} className={`font-sans text-[11px] font-light px-3.5 py-1.5 border ${
              libre
                ? 'border-charcoal text-charcoal'
                : 'border-border text-border line-through'
            }`}>
              {date}
            </span>
          ))}
        </div>
        <Link href="/contact" className="ml-auto font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-charcoal inline-flex items-center gap-2.5 hover:gap-4 transition-all group">
          Voir toutes les dates
          <span className="block w-6 h-px bg-charcoal group-hover:w-10 transition-all" />
        </Link>
      </div>
    </div>
  )
}
