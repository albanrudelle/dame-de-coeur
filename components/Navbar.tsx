'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { SITE } from '@/lib/constants'

const LINKS = [
  { href: '/',          label: "L'Établissement" },
  { href: '/mariages',  label: 'Mariages' },
  { href: '/soirees',   label: 'Soirées & Événements' },
  { href: '/espaces',   label: 'Les Espaces' },
]

export function Navbar() {
  const pathname  = usePathname()
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={clsx(
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-ivory/95 backdrop-blur-sm border-b border-border shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
        : 'bg-transparent'
    )}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group">
          <span className={clsx(
            'font-serif text-[15px] font-normal tracking-[0.12em] uppercase block leading-none transition-colors',
            scrolled ? 'text-charcoal' : 'text-white'
          )}>
            {SITE.name}
          </span>
          <span className={clsx(
            'font-sans text-[9px] font-light tracking-[0.25em] uppercase block mt-0.5 transition-colors',
            scrolled ? 'text-mid' : 'text-white/50'
          )}>
            {SITE.location}
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center">
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={clsx(
              'relative px-4 h-[72px] flex items-center font-sans text-[11px] font-normal tracking-[0.12em] uppercase transition-colors',
              'after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:transition-transform after:duration-300',
              pathname === href
                ? (scrolled ? 'text-charcoal after:bg-charcoal after:scale-x-100' : 'text-white after:bg-white after:scale-x-100')
                : (scrolled ? 'text-mid after:bg-charcoal after:scale-x-0 hover:text-charcoal hover:after:scale-x-100' : 'text-white/70 after:bg-white after:scale-x-0 hover:text-white hover:after:scale-x-100')
            )}>
              {label}
            </Link>
          ))}
          <Link href="/contact" className={clsx(
            'ml-4 font-sans text-[10px] font-medium tracking-widest2 uppercase px-6 py-3 border transition-all duration-200',
            scrolled
              ? 'border-charcoal text-charcoal hover:bg-charcoal hover:text-white'
              : 'border-white/60 text-white hover:bg-white/10 hover:border-white'
          )}>
            Faire une demande
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className={clsx('lg:hidden p-2 transition-colors', scrolled ? 'text-charcoal' : 'text-white')}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fermer' : 'Menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-ivory border-b border-border px-6 pb-6">
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={clsx(
                'block py-4 font-sans text-sm tracking-wide border-b border-border/50',
                pathname === href ? 'text-charcoal' : 'text-mid'
              )}>
              {label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            className="mt-5 block text-center border border-charcoal text-charcoal font-sans text-[10px] font-medium tracking-widest uppercase py-4 hover:bg-charcoal hover:text-white transition-all">
            Faire une demande
          </Link>
        </div>
      )}
    </header>
  )
}
