'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
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

  return (
    <div className="dc" style={{ display: 'contents' }}>
      <header className="site-header">
        <nav className="nav" aria-label="Navigation principale">
          <Link className="brand" href="/" onClick={() => setOpen(false)}>
            {SITE.name}
            <small>{SITE.location}</small>
          </Link>
          <button
            className="menu-toggle"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? '✕' : '☰'}
          </button>
          <div className={`nav-links${open ? ' open' : ''}`}>
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
              Demander un devis <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <Link href="/contact" className="button">
            Demander un devis <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </header>
    </div>
  )
}
