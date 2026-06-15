import {defineField, defineType} from 'sanity'

export const disponibilite = defineType({
  name: 'disponibilite',
  title: 'Disponibilite',
  type: 'document',
  fields: [
    defineField({ name: 'date', title: 'Date', type: 'string' }),
    defineField({ name: 'libre', title: 'Disponible', type: 'boolean' }),
    defineField({ name: 'ordre', title: 'Ordre', type: 'number' }),
  ],
})
