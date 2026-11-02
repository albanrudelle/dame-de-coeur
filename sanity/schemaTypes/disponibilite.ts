import {defineField, defineType} from 'sanity'

export const disponibilite = defineType({
  name: 'disponibilite',
  title: 'Disponibilité',
  type: 'document',
  fields: [
    defineField({name: 'jour', title: 'Date', type: 'date', validation: (Rule) => Rule.required()}),
    defineField({name: 'libre', title: 'Encore disponible', type: 'boolean', initialValue: true, description: 'Décochez quand la date est réservée.'}),
    // Ancien champ texte, conservé caché pour ne pas casser d'éventuelles anciennes entrées
    defineField({name: 'date', title: 'Ancien libellé', type: 'string', hidden: true}),
  ],
  orderings: [{title: 'Date', name: 'jourAsc', by: [{field: 'jour', direction: 'asc'}]}],
  preview: {
    select: {title: 'jour', libre: 'libre'},
    prepare: ({title, libre}) => ({
      title: title ?? 'Sans date',
      subtitle: libre === false ? 'Réservée' : 'Disponible',
    }),
  },
})
