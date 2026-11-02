import {reglages} from './reglages'
import {temoignage} from './temoignage'
import {disponibilite} from './disponibilite'
import {pageMariages, pageSoirees, pageEspaces, espace, evenement} from './contenu'

export const schema = {
  types: [reglages, pageMariages, pageSoirees, pageEspaces, espace, evenement, temoignage, disponibilite],
}
