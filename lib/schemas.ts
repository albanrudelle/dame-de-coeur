import { z } from 'zod'

export const contactSchema = z.object({
  prenom:          z.string().min(2, 'Prénom requis'),
  nom:             z.string().optional(),
  email:           z.string().email('Email invalide'),
  telephone:       z.string().optional(),
  typeEvenement:   z.string().min(1, 'Veuillez sélectionner'),
  espace:          z.string().optional(),
  date:            z.string().min(1, 'Date requise'),
  nombrePersonnes: z.string().min(1, 'Requis').refine(v => Number(v) > 0, 'Invalide'),
  message:         z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
