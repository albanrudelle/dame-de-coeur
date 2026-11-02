import type {StructureResolver} from 'sanity/structure'

const single = (S: Parameters<StructureResolver>[0], id: string, title: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id))

// Le menu du studio : réglages et pages en premier, puis les listes de contenu.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu du site')
    .items([
      single(S, 'reglages', 'Réglages du site & accueil'),
      S.divider(),
      single(S, 'pageMariages', 'Page Mariages'),
      single(S, 'pageSoirees', 'Page Soirées & événements'),
      single(S, 'pageEspaces', 'Page Espaces'),
      S.divider(),
      S.documentTypeListItem('espace').title('Les 3 espaces'),
      S.documentTypeListItem('evenement').title('Cartes Soirées'),
      S.documentTypeListItem('temoignage').title('Témoignages'),
      S.documentTypeListItem('disponibilite').title('Disponibilités'),
    ])
