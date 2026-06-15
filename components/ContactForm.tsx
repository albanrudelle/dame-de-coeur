'use client';

import { useState } from 'react';

type FormData = {
  nom: string;
  email: string;
  telephone: string;
  date: string;
  invites: string;
  message: string;
};

const initialFormData: FormData = {
  nom: '',
  email: '',
  telephone: '',
  date: '',
  invites: '',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData(initialFormData);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nom */}
      <div>
        <label htmlFor="nom" className="block text-sm tracking-widest uppercase text-charcoal/70 mb-2">
          Nom complet *
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
          value={formData.nom}
          onChange={handleChange}
          className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold transition-colors"
          placeholder="Votre nom"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm tracking-widest uppercase text-charcoal/70 mb-2">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold transition-colors"
          placeholder="votre@email.com"
        />
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="telephone" className="block text-sm tracking-widest uppercase text-charcoal/70 mb-2">
          Téléphone
        </label>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          value={formData.telephone}
          onChange={handleChange}
          className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold transition-colors"
          placeholder="+33 6 00 00 00 00"
        />
      </div>

      {/* Date souhaitée */}
      <div>
        <label htmlFor="date" className="block text-sm tracking-widest uppercase text-charcoal/70 mb-2">
          Date souhaitée
        </label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      {/* Nombre d'invités */}
      <div>
        <label htmlFor="invites" className="block text-sm tracking-widest uppercase text-charcoal/70 mb-2">
          Nombre d&apos;invités
        </label>
        <select
          id="invites"
          name="invites"
          value={formData.invites}
          onChange={handleChange}
          className="w-full border border-charcoal/20 bg-cream px-4 py-3 text-charcoal focus:outline-none focus:border-gold transition-colors"
        >
          <option value="">Sélectionner</option>
          <option value="moins-50">Moins de 50</option>
          <option value="50-100">50 – 100</option>
          <option value="100-150">100 – 150</option>
          <option value="150-200">150 – 200</option>
          <option value="plus-200">Plus de 200</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm tracking-widest uppercase text-charcoal/70 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold transition-colors resize-none"
          placeholder="Décrivez votre projet..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-charcoal text-cream py-4 text-sm tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer la demande'}
      </button>

      {/* Feedback */}
      {status === 'success' && (
        <p className="text-center text-sm tracking-wide text-green-700">
          Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-sm tracking-wide text-red-700">
          Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
        </p>
      )}
    </form>
  );
}
