export const SITE = {
  name:     'Domaine la Dame de Cœur',
  location: 'Ménoire · Corrèze',
  address:  'Ménoire, 19190 Corrèze',
  phone:    '05 XX XX XX XX',
  email:    'domaineladamedecoeur@gmail.com',
  url:      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://domaineladamedecoeur.fr',
}

export const TEMOIGNAGES = [
  {
    stars: 5,
    quote: "Les lustres en cristal, la piste LED au sol… nos invités n'en revenaient pas. On avait l'impression d'être dans une salle parisienne, en pleine Corrèze, pour un tarif bien en dessous de ce qu'on imaginait.",
    author: 'Aurélie & Maxime',
    event:  'Mariage · 127 personnes · Tous les espaces · 2024',
    platform: 'Google',
  },
  {
    stars: 5,
    quote: "La piste LED dans le sol, les lasers, les canapés rouges… c'était une soirée dansante rien que pour nous. Toutes nos photos de nuit sont incroyables. Un lieu comme on n'en trouve pas en Corrèze.",
    author: 'Laëtitia & Damien',
    event:  'Mariage · Tous les espaces · 2024',
    platform: 'Mariages.net',
  },
  {
    stars: 5,
    quote: "EVJF parfait dans la petite salle. Le bar miroir, l'ambiance lounge, la déco sur mesure… c'était exactement ce qu'on cherchait. L'équipe est réactive, le lieu impeccable.",
    author: 'Sophie D.',
    event:  'EVJF · 22 personnes · Petite salle & bar · 2024',
    platform: 'Google',
  },
  {
    stars: 5,
    quote: "Séminaire + dîner d'équipe, tout était parfait. La petite salle pour les ateliers, la grande salle pour le repas. Logistique zéro stress. Le rapport qualité-prix est imbattable en Corrèze.",
    author: 'Christine P., DRH',
    event:  'Séminaire · 35 personnes · 2 espaces · 2023',
    platform: 'Google',
  },
]

export const ESPACES = [
  {
    num:    '01',
    slug:   'grande-salle',
    titre:  'Grande salle de réception',
    cap:    'Jusqu\'à 150 convives',
    desc:   'Deux lustres en cristal en cascade, drapés plafond blancs, fresque murale peinte et parquet chaleureux. Notre salle principale accueille jusqu\'à 150 convives dans un cadre qui rivalise avec les plus beaux domaines de la région.',
    detail: [
      'Deux lustres en cristal en cascade',
      'Plafond habillé de drapés blancs',
      'Fresque murale peinte en tête de salle',
      'Parquet chaleureux · Grandes fenêtres',
      'Climatisation · Accessible PMR',
    ],
    ideal:  ['Mariage : repas et vin d\'honneur', 'Anniversaire 30 · 40 · 50 · 60 ans', 'Communion · Baptême · Repas de famille', 'Séminaire · Repas d\'entreprise', 'Réveillon · Soirée de gala'],
    tags:   ['150 convives', 'Banquet · Cocktail', 'Climatisée', 'PMR'],
    img:    '/images/salle-lustres.jpg',
  },
  {
    num:    '02',
    slug:   'espace-festif',
    titre:  'Espace festif & piste LED',
    cap:    'Piste LED encastrée, unique en Corrèze',
    desc:   'Un espace festif doté d\'une piste de danse avec LEDs encastrées dans le sol. Rare en location privée. Régie lumière complète, canapés lounge, bar panoramique sur mezzanine.',
    detail: [
      'Piste LED encastrée dans le sol',
      'Régie lumière : boule · lasers · stroboscopes',
      'Canapés lounge · Tables lumineuses',
      'Bar panoramique sur mezzanine',
      'Écran de projection · Sono professionnelle',
    ],
    ideal:  ['Soirée dansante', 'After', 'Bar et canapés lounge'],
    tags:   ['Piste LED sol', 'Régie complète', 'Bar mezzanine'],
    img:    '/images/piste4.jpg',
  },
  {
    num:    '03',
    slug:   'petite-salle',
    titre:  'Petite salle & bar lounge',
    cap:    'Jusqu\'à 50 convives',
    desc:   'Bar miroir central design avec comptoir rétroéclairé, parquet chaleureux, éclairages d\'ambiance colorés. L\'espace idéal pour les cocktails et les soirées conviviales.',
    detail: [
      'Bar miroir design rétroéclairé',
      'Tireuse à bière professionnelle',
      'Éclairages d\'ambiance colorés',
      'Configuration cocktail ou dîner',
      'Complète la grande salle et l\'espace festif',
    ],
    ideal:  ['Vin d\'honneur', 'Cocktail', 'Accueil des invités'],
    tags:   ['50 convives', 'Bar miroir', 'EVJF · EVG', 'Lounge'],
    img:    '/images/petite-salle2.jpg',
  },
]

export const EVENT_TYPES = [
  'Mariage',
  'Anniversaire',
  'EVJF / EVG',
  'Soirée d\'entreprise',
  'Séminaire',
  'Repas de famille',
  'Réveillon / Soirée thème',
  'Autre',
]

