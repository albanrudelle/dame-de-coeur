import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/schemas'
import { SITE } from '@/lib/constants'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    // ── Option A : Resend (recommandé Vercel) ────────────────────────────
    // npm install resend  →  puis décommentez :
    //
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: `${SITE.name} <noreply@domaine-dame-de-coeur.fr>`,
    //   to:   [process.env.CONTACT_EMAIL ?? SITE.email],
    //   replyTo: data.email,
    //   subject: `Nouvelle demande — ${data.typeEvenement} · ${data.date}`,
    //   html: emailHtml(data),
    // })

    // ── Option B : Nodemailer SMTP ───────────────────────────────────────
    // npm install nodemailer @types/nodemailer  →  puis décommentez :
    //
    // const nodemailer = await import('nodemailer')
    // const t = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT ?? 587), auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } })
    // await t.sendMail({ from: SITE.email, to: process.env.CONTACT_EMAIL ?? SITE.email, replyTo: data.email, subject: `Nouvelle demande — ${data.typeEvenement}`, html: emailHtml(data) })

    if (process.env.NODE_ENV === 'development') {
      console.log('[Contact]', data)
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur' }, { status: 400 })
  }
}

function emailHtml(d: Record<string, unknown>) {
  const rows = Object.entries(d)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 0;color:#6B6860;font-size:12px;text-transform:uppercase;letter-spacing:.08em;width:150px">${k}</td><td style="padding:6px 0;font-weight:500">${v}</td></tr>`)
    .join('')
  return `<html><body style="font-family:Georgia,serif;max-width:580px;margin:0 auto;padding:24px;color:#1C1C1A">
    <div style="border-top:2px solid #B8966E;padding-top:20px;margin-bottom:24px">
      <h1 style="font-size:20px;font-weight:400;margin:0 0 4px">${SITE.name}</h1>
      <p style="color:#6B6860;font-size:12px;margin:0;font-style:italic">Nouvelle demande de devis</p>
    </div>
    <table style="width:100%;border-collapse:collapse">${rows}</table>
    <div style="margin-top:24px;padding:14px;background:#F7F4EF;border-left:2px solid #B8966E;font-size:12px;color:#6B6860">
      Répondre directement à cet email pour contacter le prospect.
    </div>
  </body></html>`
}
