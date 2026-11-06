import {defineArrayMember, defineField, defineType} from 'sanity'

export const reglages = defineType({
  name: 'reglages',
  title: 'Réglages du site',
  type: 'document',
  groups: [
    {name: 'logo', title: 'Logo'},
    {name: 'contact', title: 'Coordonnées'},
    {name: 'accueil', title: "Page d'accueil"},
    {name: 'chiffres', title: 'Chiffres clés'},
    {name: 'legal', title: 'Mentions légales'},
  ],
  fields: [
    // ── Logo
    defineField({
      name: 'logo',
      title: 'Logo du site',
      type: 'image',
      group: 'logo',
      description: "Affiché en haut de chaque page. Format SVG ou PNG sur fond transparent, texte foncé (l'en-tête est clair). Laissez vide pour garder le logo actuel.",
    }),
    defineField({
      name: 'logoPied',
      title: 'Logo du pied de page',
      type: 'image',
      group: 'logo',
      description: "Affiché en bas de chaque page, sur fond vert foncé : prévoyez une version claire (blanche ou crème), SVG ou PNG sur fond transparent. Laissez vide pour afficher le nom du domaine en texte.",
    }),

    // ── Coordonnées
    defineField({name: 'telephone', title: 'Téléphone', type: 'string', group: 'contact'}),
    defineField({name: 'email', title: 'E-mail affiché sur le site', type: 'string', group: 'contact', validation: (Rule) => Rule.email()}),
    defineField({name: 'adresse', title: 'Adresse', type: 'string', group: 'contact'}),
    defineField({name: 'horaires', title: 'Horaires de contact', type: 'string', group: 'contact', description: 'Ex : Lun–Sam · 9h–19h'}),

    // ── Accueil
    defineField({name: 'heroTitreHaut', title: 'Titre principal (1re ligne)', type: 'string', group: 'accueil', description: 'Laissez vide pour garder le texte actuel.'}),
    defineField({name: 'heroTitreItalique', title: 'Titre principal (2e ligne, en italique)', type: 'string', group: 'accueil'}),
    defineField({name: 'heroTexte', title: "Texte d'introduction", type: 'text', rows: 3, group: 'accueil'}),
    defineField({
      name: 'heroImage',
      title: 'Photo principale',
      type: 'image',
      group: 'accueil',
      options: {hotspot: true},
      description: 'Laissez vide pour garder la photo actuelle. Format paysage conseillé.',
      fields: [defineField({name: 'alt', title: 'Description de la photo (accessibilité)', type: 'string'})],
    }),
    defineField({
      name: 'galerie',
      title: 'Galerie photos (accueil)',
      type: 'array',
      group: 'accueil',
      description: "Jusqu'à 5 photos. Les photos actuelles complètent s'il y en a moins de 5. La première est la plus grande.",
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Description de la photo (accessibilité)', type: 'string'})],
        }),
      ],
    }),

    defineField({
      name: 'inclus',
      title: '« Ce qui est inclus dans la location » (accueil)',
      type: 'array',
      group: 'accueil',
      of: [defineArrayMember({type: 'string'})],
      description: 'Une ligne par élément inclus. Laissez vide pour garder la liste actuelle.',
    }),

    // ── Chiffres clés
    defineField({name: 'capaciteMax', title: 'Convives maximum', type: 'string', group: 'chiffres', description: 'Ex : 150'}),
    defineField({name: 'evenements', title: 'Événements réussis', type: 'string', group: 'chiffres', description: 'Ex : +200'}),
    defineField({name: 'noteGoogle', title: 'Note Google', type: 'string', group: 'chiffres', description: 'Ex : 4.9'}),
    defineField({name: 'nombreAvis', title: "Nombre d'avis", type: 'string', group: 'chiffres', description: 'Ex : 87'}),

    // ── Mentions légales
    defineField({name: 'raisonSociale', title: 'Raison sociale', type: 'string', group: 'legal'}),
    defineField({name: 'formeJuridique', title: 'Forme juridique', type: 'string', group: 'legal', description: 'Ex : SARL, SAS, EURL, entreprise individuelle. Laisser vide si entreprise individuelle sans forme.'}),
    defineField({name: 'capitalSocial', title: 'Capital social', type: 'string', group: 'legal', description: 'Ex : 5 000 €. Laisser vide si entreprise individuelle.'}),
    defineField({name: 'siret', title: 'SIRET', type: 'string', group: 'legal'}),
    defineField({name: 'directeurPublication', title: 'Directeur de la publication', type: 'string', group: 'legal'}),
    defineField({name: 'adresseSiege', title: 'Adresse du siège', type: 'string', group: 'legal'}),
  ],
  preview: {prepare: () => ({title: 'Réglages du site'})},
})
