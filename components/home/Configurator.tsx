'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { ESPACES } from '@/lib/constants'

const EVENTS = ['Mariage', 'Anniversaire', 'EVJF / EVG', 'Soirée d\'entreprise', 'Repas de famille', 'Autre événement']
const GUESTS = ['Moins de 50 personnes', '50 à 100 personnes', '100 à 150 personnes']
const CHOICES = [
  { id: 'banquet',  label: 'Banquet assis' },
  { id: 'cocktail', label: 'Cocktail' },
  { id: 'both',     label: 'Pas encore décidé' },
]

export function Configurator() {
  const [eventType, setEventType] = useState(EVENTS[0])
  const [guests, setGuests] = useState(GUESTS[1])
  const [choice, setChoice] = useState('both')
  const [date, setDate] = useState('')
  const [shown, setShown] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const small = guests === GUESTS[0]
  const [grande, disco, petite] = ESPACES
  const cards = small ? [petite, disco] : [grande, disco]
  const comboTitle = small ? 'Petite salle + discothèque' : 'Grande salle + discothèque'
  const comboText = small
    ? 'Le cocktail ou le dîner au bar lounge, puis la soirée sur la piste LED.'
    : 'Le repas sous les lustres, puis la soirée sur la piste LED.'
  const pref = choice === 'banquet' ? 'banquet assis' : choice === 'cocktail' ? 'cocktail' : 'configuration à définir'

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setShown(true)
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50)
  }
  function reset() {
    setShown(false)
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }

  return (
    <div className="config-panel">
      <div className="step-row"><span>Votre recherche</span><span>Étape 1 / 2</span></div>
      <div className="progress"><span /></div>

      <form ref={formRef} onSubmit={submit}>
        <div className="dc-field">
          <label htmlFor="eventType">Quel événement souhaitez-vous organiser ?</label>
          <select id="eventType" value={eventType} onChange={e => setEventType(e.target.value)}>
            {EVENTS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="dc-field">
          <label htmlFor="guestCount">Combien d&apos;invités prévoyez-vous ?</label>
          <select id="guestCount" value={guests} onChange={e => setGuests(e.target.value)}>
            {GUESTS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="dc-field">
          <label id="configLabel">Quelle configuration envisagez-vous ?</label>
          <div className="choice-row" role="group" aria-labelledby="configLabel">
            {CHOICES.map(c => (
              <button
                key={c.id}
                type="button"
                className={`choice${choice === c.id ? ' active' : ''}`}
                aria-pressed={choice === c.id}
                onClick={() => setChoice(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className="dc-field">
          <label htmlFor="eventDate">Date souhaitée <span className="muted" style={{ fontWeight: 400 }}>(facultatif)</span></label>
          <input id="eventDate" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="form-actions">
          <small>Vos critères pourront être modifiés.</small>
          <button type="submit" className="button">Voir les possibilités ↗</button>
        </div>
      </form>

      <div ref={resultsRef} className={`result-area${shown ? ' visible' : ''}`} aria-live="polite">
        <div className="result-title">
          <div><div className="eyebrow">Pistes à explorer</div><h3>Vos espaces possibles</h3></div>
          <button className="text-link" style={{ border: 0, background: 'none', textDecoration: 'underline', fontSize: 10 }} onClick={reset}>
            Modifier la recherche
          </button>
        </div>
        <p className="muted" style={{ fontSize: 11 }}>{eventType} · {guests} · {pref}{date ? ` · ${new Date(date + 'T12:00:00').toLocaleDateString('fr-FR')}` : ''}</p>
        <div className="result-grid">
          {cards.map(c => (
            <article className="result-card" key={c.slug}>
              <Image src={c.img} alt={c.titre} width={600} height={400} sizes="(max-width:680px) 90vw, 280px" />
              <h4>{c.titre}</h4>
              <p>{c.cap}</p>
              <span className="status">{c.tags[0]}</span>
              <div className="micro">{c.tags.slice(1).join(' · ')}</div>
            </article>
          ))}
        </div>
        <div className="combo-result">
          <div className="mini-plan"><span /><span /><span /></div>
          <div>
            <h4>{comboTitle}</h4>
            <p>{comboText}</p>
            <div className="micro">Configuration à confirmer avec notre équipe selon votre date.</div>
          </div>
        </div>
        <div className="notice">
          Ces pistes sont indicatives et ne constituent pas une confirmation de disponibilité. Notre équipe vérifie votre date et vous répond sous 24 heures ouvrées.
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 17 }}>
          <Link href="/contact" className="button">Demander un devis ↗</Link>
          <button className="button button-outline" onClick={reset}>Modifier mes critères</button>
        </div>
      </div>
    </div>
  )
}
