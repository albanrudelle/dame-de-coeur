import { createClient } from 'next-sanity'
import { SITE, TEMOIGNAGES } from '@/lib/constants'
import { urlFor } from '@/sanity/lib/image'

// Contenu éditable depuis le studio (/studio). Si Sanity est vide ou injoignable,
// le site retombe sur les valeurs de lib/constants.ts et les photos locales.

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

const client =
  projectId && dataset
    ? createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false })
    : null

async function safeFetch<T>(query: string): Promise<T | null> {
  if (!client) return null
  try {
    return await client.fetch<T>(query, {}, { cache: 'no-store' })
  } catch (e) {
    console.error('Sanity fetch failed', e)
    return null
  }
}

const clean = (v?: string | null) => (v && v.trim() ? v.trim() : undefined)

type SanityImg = { asset?: { _ref?: string }; alt?: string } | null | undefined
const img = (i: SanityImg, w: number) => (i?.asset ? urlFor(i as never).width(w).auto('format').url() : undefined)

type RawSettings = {
  telephone?: string; email?: string; adresse?: string; horaires?: string
  heroTitreHaut?: string; heroTitreItalique?: string; heroTexte?: string; heroImage?: SanityImg
  galerie?: SanityImg[]
  capaciteMax?: string; evenements?: string; noteGoogle?: string; nombreAvis?: string
  raisonSociale?: string; siret?: string; directeurPublication?: string; adresseSiege?: string
}

export async function getSettings() {
  const s = (await safeFetch<RawSettings>(`*[_id == "reglages"][0]`)) ?? {}
  const phone = clean(s.telephone) ?? SITE.phone
  return {
    phone,
    phoneOk: !/x/i.test(phone),
    email: clean(s.email) ?? SITE.email,
    address: clean(s.adresse) ?? SITE.address,
    horaires: clean(s.horaires) ?? 'Lun–Sam · 9h–19h',
    hero: {
      titreHaut: clean(s.heroTitreHaut),
      titreItalique: clean(s.heroTitreItalique),
      texte: clean(s.heroTexte),
      image: img(s.heroImage, 1600),
      alt: clean(s.heroImage?.alt),
    },
    galerie: (s.galerie ?? [])
      .map(g => ({ src: img(g, 1200), alt: clean(g?.alt) ?? 'Photo du Domaine' }))
      .filter((g): g is { src: string; alt: string } => !!g.src),
    stats: {
      capacite: clean(s.capaciteMax) ?? '150',
      evenements: clean(s.evenements) ?? '+200',
      note: clean(s.noteGoogle) ?? '4.9',
      avis: clean(s.nombreAvis) ?? '87',
    },
    legal: {
      raisonSociale: clean(s.raisonSociale),
      siret: clean(s.siret),
      directeur: clean(s.directeurPublication),
      siege: clean(s.adresseSiege),
    },
  }
}

export type Testimonial = { stars: number; quote: string; author: string; event: string }

export async function getTemoignages(): Promise<Testimonial[]> {
  const rows = await safeFetch<
    { auteur?: string; evenement?: string; texte?: string; note?: number; publie?: boolean }[]
  >(`*[_type == "temoignage" && publie != false] | order(ordre asc, _createdAt asc)`)
  const list = (rows ?? [])
    .filter(r => r.auteur && r.texte)
    .map(r => ({
      stars: Math.min(5, Math.max(1, Math.round(r.note ?? 5))),
      quote: r.texte as string,
      author: r.auteur as string,
      event: r.evenement ?? '',
    }))
  return list.length ? list : TEMOIGNAGES.map(({ stars, quote, author, event }) => ({ stars, quote, author, event }))
}

export async function getDisponibilites(): Promise<string[]> {
  const today = new Date().toISOString().slice(0, 10)
  const rows = await safeFetch<{ jour?: string }[]>(
    `*[_type == "disponibilite" && libre != false && defined(jour) && jour >= "${today}"] | order(jour asc)[0...12]`,
  )
  return (rows ?? []).map(r => r.jour as string).filter(Boolean)
}

export function formatJour(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}
