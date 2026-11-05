'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { EVENT_TYPES } from '@/lib/constants'

export function Configurator() {
  const router = useRouter()
  const [eventType, setEventType] = useState(EVENT_TYPES[0])
  const [guests, setGuests] = useState('')
  const [date, setDate] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const q = new URLSearchParams({ type: eventType })
    if (guests && Number(guests) > 0) q.set('n', guests)
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
          <input id="guestCount" type="number" inputMode="numeric" min={1} max={300} placeholder="Ex : 80" value={guests} onChange={e => setGuests(e.target.value)} />
        </div>
        <div className="dc-field">
          <label htmlFor="eventDate">Date souhaitée <span className="muted" style={{ fontWeight: 400 }}>(facultatif)</span></label>
          <input id="eventDate" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="form-actions">
          <small>Sans engagement. Réponse sous 24 heures ouvrées.</small>
          <button type="submit" className="button">Vérifier ma date →</button>
        </div>
      </form>
    </div>
  )
}
