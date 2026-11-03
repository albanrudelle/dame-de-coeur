import {defineArrayMember, defineField, defineType} from 'sanity'

const image = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: 'image',
    options: {hotspot: true},
    description: description ?? 'Laissez vide pour garder la photo actuelle.',
    fields: [defineField({name: 'alt', title: 'Description de la photo (accessibilité)', type: 'string'})],
  })

const liste = (name: string, title: string, description?: string) =>
  defineField({name, title, type: 'array', of: [defineArrayMember({type: 'string'})], description})

const VIDE = 'Laissez vide pour garder le texte actuel.'

// Un document « page » par page du site (mariages, soirées, espaces)
const pageFields = [
  defineField({name: 'titreHaut', title: 'Titre (1re ligne)', type: 'string', description: VIDE}),
  defineField({name: 'titreItalique', title: 'Titre (2e ligne, en italique)', type: 'string'}),
  defineField({name: 'intro', title: "Texte d'introduction", type: 'text', rows: 3}),
  image('image', 'Photo principale'),
  defineField({name: 'ctaTitre', title: 'Bandeau de fin : titre', type: 'string', description: VIDE}),
  defineField({name: 'ctaTexte', title: 'Bandeau de fin : texte', type: 'text', rows: 2}),
]

const page = (name: string, title: string, extra: ReturnType<typeof defineField>[] = []) =>
  defineType({name, title, type: 'document', fields: [...pageFields, ...extra], preview: {prepare: () => ({title})}})

export const pageMariages = page('pageMariages', 'Page Mariages', [
  liste('inclus', 'Liste « tout est inclus »', 'Une ligne par élément. Laissez vide pour garder la liste actuelle.'),
  defineField({name: 'prix', title: 'Fourchette de prix', type: 'string', description: 'Ex : 1 800 € à 3 500 €. Utilisée aussi sur la page Espaces.'}),
])
export const pageSoirees = page('pageSoirees', 'Page Soirées & événements')
export const pageEspaces = page('pageEspaces', 'Page Espaces', [
  defineField({name: 'texteDomaine', title: 'Texte « Ménoire, Corrèze »', type: 'text', rows: 4}),
  image('imageDomaine', 'Photo « Ménoire, Corrèze » (façade)'),
])

// Les 3 espaces (accueil + page Espaces)
export const espace = defineType({
  name: 'espace',
  title: 'Espace',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Espace concerné',
      type: 'string',
      options: {
        list: [
          {title: 'Grande salle de réception', value: 'grande-salle'},
          {title: 'Espace festif & piste LED', value: 'espace-festif'},
          {title: 'Petite salle & bar lounge', value: 'petite-salle'},
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'Choisissez l’espace à modifier. Un seul document par espace. Le Domaine se loue dans son ensemble.',
    }),
    defineField({name: 'titre', title: 'Nom', type: 'string'}),
    defineField({name: 'cap', title: 'Sous-titre / capacité', type: 'string', description: "Ex : Jusqu'à 150 convives"}),
    defineField({name: 'desc', title: 'Description', type: 'text', rows: 4}),
    liste('detail', 'Points forts (liste)'),
    liste('ideal', 'Idéal pour (liste)'),
    liste('tags', 'Étiquettes'),
    image('image', 'Photo'),
  ],
  preview: {select: {title: 'titre', subtitle: 'slug'}},
})

// Les 4 cartes de la page Soirées
export const evenement = defineType({
  name: 'evenement',
  title: 'Événement (page Soirées)',
  type: 'document',
  fields: [
    defineField({name: 'label', title: 'Catégorie', type: 'string', validation: (Rule) => Rule.required(), description: 'Ex : Anniversaires'}),
    defineField({name: 'titre', title: 'Titre', type: 'string'}),
    defineField({name: 'desc', title: 'Description', type: 'text', rows: 4}),
    liste('tags', 'Étiquettes'),
    defineField({
      name: 'type',
      title: 'Type pré-rempli dans le formulaire',
      type: 'string',
      options: {
        list: ['Mariage', 'Anniversaire', 'EVJF / EVG', "Soirée d'entreprise", 'Séminaire', 'Repas de famille', 'Réveillon / Soirée thème', 'Autre'],
      },
    }),
    image('image', 'Photo'),
    defineField({name: 'ordre', title: "Ordre d'affichage", type: 'number'}),
  ],
  orderings: [{title: 'Ordre', name: 'ordreAsc', by: [{field: 'ordre', direction: 'asc'}]}],
  preview: {select: {title: 'label', subtitle: 'titre'}},
})
