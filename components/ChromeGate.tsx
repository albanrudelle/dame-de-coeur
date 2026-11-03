'use client'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

// Masque l'en-tête et le pied de page du site à l'intérieur du studio (/studio).
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio')) return null
  return <>{children}</>
}
