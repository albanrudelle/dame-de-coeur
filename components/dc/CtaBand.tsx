import Link from 'next/link'

type Props = {
  eyebrow: string
  title: string
  text: string
  label?: string
}

export function CtaBand({ eyebrow, title, text, label = 'Obtenir un devis gratuit' }: Props) {
  return (
    <section className="contact-band">
      <div className="wrap contact-inner">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h2>{title}</h2>
          <p className="muted" style={{ margin: 0 }}>{text}</p>
        </div>
        <Link className="button" href="/contact">{label} →</Link>
      </div>
    </section>
  )
}
