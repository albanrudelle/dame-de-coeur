import {defineField, defineType} from 'sanity'

export const temoignage = defineType({
  name: 'temoignage',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({name: 'auteur', title: 'Auteur', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'evenement', title: 'Événement', type: 'string', description: 'Ex : Mariage · 120 personnes · 2024'}),
    defineField({name: 'texte', title: 'Témoignage', type: 'text', validation: (Rule) => Rule.required()}),
    defineField({name: 'note', title: 'Note (1 à 5)', type: 'number', initialValue: 5, validation: (Rule) => Rule.min(1).max(5)}),
    defineField({name: 'ordre', title: "Ordre d'affichage (1 = en premier)", type: 'number'}),
    defineField({
      name: 'publie',
      title: 'Afficher sur le site',
      type: 'boolean',
      initialValue: true,
      description: 'Ne publiez que de vrais avis de vos clients.',
    }),
  ],
  orderings: [{title: "Ordre d'affichage", name: 'ordreAsc', by: [{field: 'ordre', direction: 'asc'}]}],
  preview: {
    select: {title: 'auteur', subtitle: 'evenement'},
  },
})
