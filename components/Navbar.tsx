'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SITE } from '@/lib/constants'

const LINKS = [
  { href: '/',         label: "L'Établissement" },
  { href: '/mariages', label: 'Mariages' },
  { href: '/soirees',  label: 'Soirées & Événements' },
  { href: '/espaces',  label: 'Les Espaces' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Menu ouvert : on bloque le défilement de la page et Échap le referme
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div className="dc" style={{ display: 'contents' }}>
      <header className="site-header">
        <nav className="nav" aria-label="Navigation principale">
          <Link className="brand" href="/" onClick={() => setOpen(false)} aria-label={`${SITE.name} — accueil`}>
            <Image className="brand-logo" src="/logo.svg" alt={SITE.name} width={843} height={704} priority unoptimized />
          </Link>
          <button
            className="menu-toggle"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="menu-principal"
            onClick={() => setOpen(!open)}
          >
            {open ? '✕' : '☰'}
          </button>
          <div id="menu-principal" className={`nav-links${open ? ' open' : ''}`}>
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link href="/contact" className="button mobile-only" onClick={() => setOpen(false)}>
              Devis gratuit →
            </Link>
          </div>
          <Link href="/contact" className="button">
            Devis gratuit →
          </Link>
        </nav>
      </header>
    </div>
  )
}
