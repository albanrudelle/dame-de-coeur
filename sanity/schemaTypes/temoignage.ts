import {defineField, defineType} from 'sanity'

export const temoignage = defineType({
  name: 'temoignage',
  title: 'Temoignage',
  type: 'document',
  fields: [
    defineField({ name: 'auteur', title: 'Auteur', type: 'string' }),
    defineField({ name: 'evenement', title: 'Evenement', type: 'string' }),
    defineField({ name: 'texte', title: 'Texte', type: 'text' }),
    defineField({ name: 'note', title: 'Note', type: 'number' }),
    defineField({ name: 'ordre', title: 'Ordre', type: 'number' }),
  ],
})
