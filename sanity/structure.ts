import type {StructureResolver} from 'sanity/structure'

// Le menu du studio : réglages en premier, puis les listes de contenu.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu du site')
    .items([
      S.listItem()
        .title('Réglages du site')
        .id('reglages')
        .child(S.document().schemaType('reglages').documentId('reglages')),
      S.divider(),
      S.documentTypeListItem('temoignage').title('Témoignages'),
      S.documentTypeListItem('disponibilite').title('Disponibilités'),
    ])
