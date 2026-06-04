'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { contactSchema, type ContactFormData } from '@/lib/schemas'
import { EVENT_TYPES, ESPACE_OPTIONS } from '@/lib/constants'
import clsx from 'clsx'

export function ContactForm() {
  const params = useSearchParams()
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  useEffect(() => {
    const t = params.get('type')
    if (t) setValue('typeEvenement', t)
  }, [params, setValue])

  async function onSubmit(data: ContactFormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch { setStatus('error') }
  }

  if (status === 'success') {
    return (
      <div className="py-16 text-center">
        <div className="font-serif text-5xl text-gold mb-6">✦</div>
        <h3 className="font-serif text-3xl font-light mb-3">Demande envoyée</h3>
        <p className="font-sans text-sm font-light text-mid leading-relaxed">Nous reviendrons vers vous sous 24 heures ouvrées.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="field-label">Prénom *</label>
          <input {...register('prenom')} type="text" placeholder="Marie" className={clsx('field', errors.prenom && 'border-b-red-500')} />
          {errors.prenom && <p className="field-error">{errors.prenom.message}</p>}
        </div>
        <div>
          <label className="field-label">Nom</label>
          <input {...register('nom')} type="text" placeholder="Dupont" className="field" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="field-label">Email *</label>
          <input {...register('email')} type="email" placeholder="marie@email.fr" className={clsx('field', errors.email && 'border-b-red-500')} />
          {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>
        <div>
          <label className="field-label">Téléphone</label>
          <input {...register('telephone')} type="tel" placeholder="06 XX XX XX XX" className="field" />
        </div>
      </div>

      <div>
        <label className="field-label">Type d&apos;événement *</label>
        <select {...register('typeEvenement')} className={clsx('field cursor-pointer', errors.typeEvenement && 'border-b-red-500')}
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%236B6860'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center', appearance: 'none' }}>
          <option value="">Sélectionner</option>
          {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.typeEvenement && <p className="field-error">{errors.typeEvenement.message}</p>}
      </div>

      <div>
        <label className="field-label">Espace souhaité</label>
        <select {...register('espace')} className="field cursor-pointer"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%236B6860'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center', appearance: 'none' }}>
          <option value="">Sélectionner</option>
          {ESPACE_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="field-label">Date souhaitée *</label>
          <input {...register('date')} type="date" className={clsx('field', errors.date && 'border-b-red-500')} />
          {errors.date && <p className="field-error">{errors.date.message}</p>}
        </div>
        <div>
          <label className="field-label">Nombre de convives *</label>
          <input {...register('nombrePersonnes')} type="number" placeholder="80" min={1} max={150} className={clsx('field', errors.nombrePersonnes && 'border-b-red-500')} />
          {errors.nombrePersonnes && <p className="field-error">{errors.nombrePersonnes.message}</p>}
        </div>
      </div>

      <div>
        <label className="field-label">Message</label>
        <textarea {...register('message')} rows={3} placeholder="Décrivez votre projet…" className="field resize-none" />
      </div>

      <div className="border-y border-border py-5 font-sans text-xs font-light text-mid leading-relaxed">
        Vos données sont utilisées uniquement pour traiter votre demande. Aucun démarchage. Réponse sous 24h ouvrées.
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 font-light">Une erreur est survenue. Veuillez réessayer ou nous appeler directement.</p>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-charcoal text-white font-sans text-[10px] font-medium tracking-widest2 uppercase py-5 transition-all hover:bg-charcoal/80 disabled:opacity-50">
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer la demande'}
      </button>
      <p className="text-center font-sans text-[11px] font-light text-mid">Champs * obligatoires</p>
    </form>
  )
}
