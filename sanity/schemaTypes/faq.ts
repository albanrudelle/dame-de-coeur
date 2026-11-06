import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'Question de la FAQ',
  type: 'document',
  fields: [
    defineField({name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'reponse',
      title: 'Réponse',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      description: 'Écrivez {prix} pour afficher automatiquement la fourchette de prix du site.',
    }),
    defineField({name: 'ordre', title: "Ordre d'affichage (1 = en premier)", type: 'number'}),
    defineField({
      name: 'publie',
      title: 'Afficher sur le site',
      type: 'boolean',
      initialValue: true,
      description: 'Décochez pour masquer la question sans la supprimer.',
    }),
  ],
  orderings: [{title: "Ordre d'affichage", name: 'ordreAsc', by: [{field: 'ordre', direction: 'asc'}]}],
  preview: {select: {title: 'question', subtitle: 'reponse'}},
})
