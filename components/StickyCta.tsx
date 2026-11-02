'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// Barre d'action fixe sur mobile : visible après un peu de défilement, masquée sur la page contact.
export function StickyCta({ phone }: { phone?: string }) {
  const pathname = usePathname()
  const [on, setOn] = useState(false)
  useEffect(() => {
    const f = () => setOn(window.scrollY > 500)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  if (pathname.startsWith('/contact') || pathname.startsWith('/studio')) return null
  return (
    <div className="dc" style={{ display: 'contents' }}>
      <div className={`sticky-cta${on ? ' on' : ''}`}>
        {phone ? <a className="button button-outline" href={`tel:${phone.replace(/\s/g, '')}`}>Appeler</a> : null}
        <Link className="button" href="/contact">Demander un devis</Link>
      </div>
    </div>
  )
}
