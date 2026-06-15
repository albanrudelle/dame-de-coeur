import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Page', type: 'string' }),
    defineField({ name: 'titrePrincipal', title: 'Titre', type: 'string' }),
    defineField({ name: 'sousTitre', title: 'Sous-titre', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
  ],
})
