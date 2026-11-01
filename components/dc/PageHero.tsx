import Image from 'next/image'
import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: ReactNode
  lead: string
  img: string
  alt: string
  note?: string
  children?: ReactNode
}

export function PageHero({ eyebrow, title, lead, img, alt, note, children }: Props) {
  return (
    <section className="hero hero-sm">
      <div className="hero-wrap">
        <div className="hero-copy">
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          {children}
        </div>
        <div className="hero-image">
          <Image src={img} alt={alt} fill priority sizes="(max-width: 680px) 100vw, 60vw" />
          {note ? <div className="image-note">{note}</div> : null}
        </div>
      </div>
    </section>
  )
}
