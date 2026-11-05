'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { EVENT_TYPES, GUEST_RANGES } from '@/lib/constants'

export function Configurator() {
  const router = useRouter()
  const [eventType, setEventType] = useState(EVENT_TYPES[0])
  const [guests, setGuests] = useState('')
  const [date, setDate] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const q = new URLSearchParams({ type: eventType })
    if (guests) q.set('n', guests)
    if (date) q.set('date', date)
    router.push(`/contact?${q.toString()}`)
  }

  return (
    <div className="config-panel">
      <form onSubmit={submit}>
        <div className="dc-field">
          <label htmlFor="eventType">Quel événement souhaitez-vous organiser ?</label>
          <select id="eventType" value={eventType} onChange={e => setEventType(e.target.value)}>
            {EVENT_TYPES.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="dc-field">
          <label htmlFor="guestCount">Nombre d&apos;invités <span className="muted" style={{ fontWeight: 400 }}>(approximatif)</span></label>
          <select id="guestCount" value={guests} onChange={e => setGuests(e.target.value)}>
            <option value="">Sélectionner</option>
            {GUEST_RANGES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="dc-field">
          <label htmlFor="eventDate">Date souhaitée <span className="muted" style={{ fontWeight: 400 }}>(facultatif)</span></label>
          <input id="eventDate" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="form-actions">
          <small>Sans engagement. Devis gratuit.</small>
          <button type="submit" className="button">Vérifier ma date →</button>
        </div>
      </form>
    </div>
  )
}
