'use client'

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { contactSchema } from '@/lib/schemas'
import { EVENT_TYPES } from '@/lib/constants'

type Values = {
  prenom: string
  nom: string
  email: string
  telephone: string
  typeEvenement: string
  date: string
  nombrePersonnes: string
  message: string
  website: string // champ piège anti-spam : doit rester vide
}
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'loading' | 'success' | 'error'

function localToday() {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

function Field({ id, label, error, optional, children }: {
  id: string
  label: string
  error?: string
  optional?: boolean
  children: ReactNode
}) {
  return (
    <div className="dc-field">
      <label htmlFor={id}>
        {label}
        {optional ? <span className="muted" style={{ fontWeight: 400 }}> (facultatif)</span> : null}
      </label>
      {children}
      {error ? <p className="field-error" id={`${id}-error`} role="alert">{error}</p> : null}
    </div>
  )
}

export default function ContactForm({ defaultType = '', defaultDate = '' }: {
  defaultType?: string
  defaultDate?: string
}) {
  const [values, setValues] = useState<Values>({
    prenom: '', nom: '', email: '', telephone: '',
    typeEvenement: defaultType, date: defaultDate, nombrePersonnes: '',
    message: '', website: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [sentName, setSentName] = useState('')

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const a11y = (k: keyof Values) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return

    const next: Errors = {}
    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]) as keyof Values
        if (!next[key]) next[key] = issue.message
      }
    }
    if (!next.date && values.date && values.date < localToday()) {
      next.date = 'Cette date est déjà passée'
    }
    if (Object.keys(next).length > 0) {
      setErrors(next)
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(String(res.status))
      setSentName(values.prenom)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="success" role="status">
        <div className="intro-mark" aria-hidden="true"></div>
        <h2>Merci {sentName}, votre demande est bien partie.</h2>
        <p className="lead">Notre équipe vérifie votre date et vous répond sous 24 heures ouvrées.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <Field id="prenom" label="Prénom" error={errors.prenom}>
          <input id="prenom" name="prenom" autoComplete="given-name" value={values.prenom} onChange={onChange} {...a11y('prenom')} />
        </Field>
        <Field id="nom" label="Nom" optional error={errors.nom}>
          <input id="nom" name="nom" autoComplete="family-name" value={values.nom} onChange={onChange} {...a11y('nom')} />
        </Field>
      </div>

      <div className="field-row">
        <Field id="email" label="Adresse e-mail" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="vous@exemple.fr" value={values.email} onChange={onChange} {...a11y('email')} />
        </Field>
        <Field id="telephone" label="Téléphone" optional error={errors.telephone}>
          <input id="telephone" name="telephone" type="tel" autoComplete="tel" placeholder="06 00 00 00 00" value={values.telephone} onChange={onChange} {...a11y('telephone')} />
        </Field>
      </div>

      <div className="field-row">
        <Field id="typeEvenement" label="Type d'événement" error={errors.typeEvenement}>
          <select id="typeEvenement" name="typeEvenement" value={values.typeEvenement} onChange={onChange} {...a11y('typeEvenement')}>
            <option value="">Sélectionner</option>
            {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field id="date" label="Date souhaitée" error={errors.date}>
          <input id="date" name="date" type="date" value={values.date} onChange={onChange} {...a11y('date')} />
        </Field>
      </div>

      <div className="field-row">
        <Field id="nombrePersonnes" label="Nombre de personnes" error={errors.nombrePersonnes}>
          <input id="nombrePersonnes" name="nombrePersonnes" type="number" inputMode="numeric" min={1} max={300} placeholder="Ex : 80" value={values.nombrePersonnes} onChange={onChange} {...a11y('nombrePersonnes')} />
        </Field>
      </div>

      <Field id="message" label="Votre projet" optional error={errors.message}>
        <textarea id="message" name="message" rows={4} placeholder="Décrivez-nous votre événement, vos envies, vos questions…" value={values.message} onChange={onChange} {...a11y('message')} />
      </Field>

      {/* Champ piège pour les robots : invisible, ne pas remplir */}
      <div className="hp" aria-hidden="true">
        <label>Ne pas remplir
          <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
        </label>
      </div>

      <button type="submit" className="button" style={{ width: '100%' }} disabled={status === 'loading'}>
        {status === 'loading' ? 'Envoi en cours…' : <>Envoyer ma demande →</>}
      </button>

      <div aria-live="polite">
        {status === 'error' && (
          <p className="form-status error">
            Votre demande n&apos;a pas pu être envoyée. Merci de réessayer dans un instant ou de nous contacter directement.
          </p>
        )}
      </div>

      <p className="fineprint">
        Sans engagement. Vos informations servent uniquement à répondre à votre demande (<a href="/mentions-legales#rgpd">en savoir plus</a>).
      </p>
    </form>
  )
}
