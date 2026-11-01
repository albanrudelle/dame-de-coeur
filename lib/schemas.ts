import { z } from 'zod'

export const contactSchema = z.object({
  prenom:          z.string().min(2, 'Prénom requis').max(80),
  nom:             z.string().max(80).optional(),
  email:           z.string().email('Email invalide').max(160),
  telephone:       z.string().max(40).optional(),
  typeEvenement:   z.string().min(1, 'Veuillez sélectionner').max(80),
  espace:          z.string().max(80).optional(),
  date:            z.string().min(1, 'Date requise').max(20),
  nombrePersonnes: z.string().min(1, 'Requis').max(6).refine(v => Number(v) > 0, 'Invalide'),
  message:         z.string().max(4000).optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
