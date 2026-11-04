import { NextRequest, NextResponse } from 'next/server'
import { contactSchema, type ContactFormData } from '@/lib/schemas'
import { SITE } from '@/lib/constants'

const LABELS: Record<string, string> = {
  prenom: 'Prénom',
  nom: 'Nom',
  email: 'E-mail',
  telephone: 'Téléphone',
  typeEvenement: 'Événement',
  espace: 'Espace',
  date: 'Date souhaitée',
  nombrePersonnes: 'Nombre de personnes',
  message: 'Message',
}

// Limite par visiteur : 5 demandes par heure. Stockée en mémoire du serveur :
// elle freine les envois en rafale mais n'est pas absolue (le serveur peut redémarrer).
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function tooMany(ip: string): boolean {
  const now = Date.now()
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every(t => now - t > WINDOW_MS)) hits.delete(k)
  }
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'inconnu'
  if (tooMany(ip)) {
    return NextResponse.json({ error: 'Trop de demandes, réessayez plus tard' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }

  // Anti-spam : le champ "website" est invisible pour les visiteurs, seuls les robots le remplissent.
  if (typeof body === 'object' && body !== null && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }
  const data = parsed.data

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Sans clé, la demande ne peut pas être transmise : on le dit au visiteur plutôt que de faire croire à un succès.
    console.error('[Contact] RESEND_API_KEY manquante dans Vercel : la demande n\'a pas été transmise.')
    return NextResponse.json({ error: 'Envoi indisponible' }, { status: 503 })
  }

  const to = process.env.CONTACT_EMAIL ?? SITE.email
  const from = process.env.CONTACT_FROM ?? `${SITE.name} <onboarding@resend.dev>`
  const subject = `Nouvelle demande · ${data.typeEvenement} · ${data.date}`.replace(/[\r\n]+/g, ' ')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: data.email, subject, html: emailHtml(data) }),
    })
    if (!res.ok) {
      console.error('[Contact] Resend a refusé l\'envoi', res.status, await res.text())
      return NextResponse.json({ error: 'Envoi impossible' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[Contact] Erreur réseau vers Resend', e)
    return NextResponse.json({ error: 'Envoi impossible' }, { status: 502 })
  }
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function emailHtml(d: ContactFormData) {
  const rows = Object.entries(d)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#73776d;font-size:12px;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;width:160px">${esc(LABELS[k] ?? k)}</td><td style="padding:6px 0;font-weight:500">${esc(String(v)).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')
  return `<html><body style="font-family:Georgia,serif;max-width:580px;margin:0 auto;padding:24px;color:#242923">
    <div style="border-top:2px solid #aa9068;padding-top:20px;margin-bottom:24px">
      <h1 style="font-size:20px;font-weight:400;margin:0 0 4px">${esc(SITE.name)}</h1>
      <p style="color:#73776d;font-size:12px;margin:0;font-style:italic">Nouvelle demande de devis</p>
    </div>
    <table style="width:100%;border-collapse:collapse">${rows}</table>
    <div style="margin-top:24px;padding:14px;background:#f5f2ec;border-left:2px solid #aa9068;font-size:12px;color:#73776d">
      Répondre directement à cet e-mail pour contacter la personne.
    </div>
  </body></html>`
}
