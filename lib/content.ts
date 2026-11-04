import { createClient } from 'next-sanity'
import { ESPACES, SITE, TEMOIGNAGES } from '@/lib/constants'
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
  raisonSociale?: string; formeJuridique?: string; capitalSocial?: string; siret?: string; directeurPublication?: string; adresseSiege?: string
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
      formeJuridique: clean(s.formeJuridique),
      capital: clean(s.capitalSocial),
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

// ── Pages, espaces, événements ──────────────────────────────────────────────

type RawPage = {
  titreHaut?: string; titreItalique?: string; intro?: string; image?: SanityImg
  ctaTitre?: string; ctaTexte?: string
  inclus?: string[]; prix?: string; texteDomaine?: string; imageDomaine?: SanityImg
}

export async function getPage(id: 'pageMariages' | 'pageSoirees' | 'pageEspaces') {
  const p = (await safeFetch<RawPage>(`*[_id == "${id}"][0]`)) ?? {}
  const list = (p.inclus ?? []).map(x => x?.trim()).filter(Boolean)
  return {
    titreHaut: clean(p.titreHaut),
    titreItalique: clean(p.titreItalique),
    intro: clean(p.intro),
    image: img(p.image, 1600),
    alt: clean(p.image?.alt),
    ctaTitre: clean(p.ctaTitre),
    ctaTexte: clean(p.ctaTexte),
    inclus: list.length ? list : undefined,
    prix: clean(p.prix),
    texteDomaine: clean(p.texteDomaine),
    imageDomaine: img(p.imageDomaine, 1400),
    altDomaine: clean(p.imageDomaine?.alt),
  }
}

const strs = (a?: string[]) => {
  const l = (a ?? []).map(x => x?.trim()).filter(Boolean)
  return l.length ? l : undefined
}

export async function getPrix() {
  const p = await getPage('pageMariages')
  return p.prix ?? '1 800 € à 3 500 €'
}

type RawEspace = {
  slug?: string; titre?: string; cap?: string; desc?: string
  detail?: string[]; ideal?: string[]; tags?: string[]; image?: SanityImg
}

export async function getEspaces() {
  const rows = (await safeFetch<RawEspace[]>(`*[_type == "espace"]`)) ?? []
  return ESPACES.map(e => {
    const r = rows.find(x => x.slug === e.slug || (e.slug === 'espace-festif' && x.slug === 'discotheque'))
    if (!r) return e
    return {
      ...e,
      titre: clean(r.titre) ?? e.titre,
      cap: clean(r.cap) ?? e.cap,
      desc: clean(r.desc) ?? e.desc,
      detail: strs(r.detail) ?? e.detail,
      ideal: strs(r.ideal) ?? e.ideal,
      tags: strs(r.tags) ?? e.tags,
      img: img(r.image, 1400) ?? e.img,
    }
  })
}

type RawEvent = { label?: string; titre?: string; desc?: string; tags?: string[]; type?: string; image?: SanityImg }

export async function getEvenements(fallback: { img: string; type: string; label: string; titre: string; desc: string; tags: string[] }[]) {
  const rows = await safeFetch<RawEvent[]>(`*[_type == "evenement"] | order(ordre asc, _createdAt asc)`)
  const list = (rows ?? []).filter(r => r.label)
  if (!list.length) return fallback.map(f => ({ ...f, img: `/images/${f.img}.jpg` }))
  return list.map(r => ({
    img: img(r.image, 1200) ?? '/images/piste4.jpg',
    type: r.type ?? 'Autre',
    label: r.label as string,
    titre: r.titre ?? '',
    desc: r.desc ?? '',
    tags: strs(r.tags) ?? [],
  }))
}
