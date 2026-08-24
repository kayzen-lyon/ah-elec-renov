/**
 * Zone d'intervention AH ELEC RENOV — Paris et région parisienne.
 *
 * Deux niveaux de maillage :
 *  - `zones`  : les secteurs (Paris + 7 départements franciliens) ;
 *  - `parisArrondissements` : les 20 arrondissements, pour le SEO local fin.
 *
 * Chaque blurb reste informatif (2 phrases max), sans bourrage de mots-clés.
 */

export interface ZoneSecteur {
  name: string;
  slug: string;
  /** Code département affiché sur la pastille. */
  code: string;
  /** Codes postaux couverts, en clair. */
  postalCode: string;
  /** Délai d'intervention réaliste annoncé pour ce secteur. */
  delai: string;
  /** Taux de couverture affiché sur la barre de progression (0-100). */
  coverage: number;
  /** Villes principales couvertes dans le secteur. */
  communes: string[];
  blurb: string;
}

export const zones: ZoneSecteur[] = [
  {
    name: "Paris",
    slug: "paris",
    code: "75",
    postalCode: "75001 – 75020",
    delai: "30 min",
    coverage: 98,
    communes: [
      "Paris 1er",
      "Paris 8e",
      "Paris 11e",
      "Paris 15e",
      "Paris 16e",
      "Paris 17e",
      "Paris 18e",
      "Paris 20e",
    ],
    blurb:
      "Nos électriciens couvrent les vingt arrondissements, avec des équipes prépositionnées pour tenir le délai de 30 minutes. Immeubles haussmanniens, copropriétés et locaux commerciaux : nous connaissons les installations parisiennes anciennes et leurs contraintes.",
  },
  {
    name: "Hauts-de-Seine",
    slug: "hauts-de-seine",
    code: "92",
    postalCode: "92000 – 92700",
    delai: "30 min",
    coverage: 95,
    communes: [
      "Boulogne-Billancourt",
      "Neuilly-sur-Seine",
      "Levallois-Perret",
      "Courbevoie",
      "Nanterre",
      "Issy-les-Moulineaux",
      "Asnières-sur-Seine",
      "Clichy",
    ],
    blurb:
      "De La Défense aux communes résidentielles de l'ouest, le 92 fait partie de notre périmètre d'intervention immédiate. Dépannage de tableau, recherche de panne et remise en sécurité, en logement comme en bureaux.",
  },
  {
    name: "Seine-Saint-Denis",
    slug: "seine-saint-denis",
    code: "93",
    postalCode: "93000 – 93600",
    delai: "30 min",
    coverage: 92,
    communes: [
      "Saint-Denis",
      "Montreuil",
      "Aubervilliers",
      "Bobigny",
      "Pantin",
      "Noisy-le-Grand",
      "Aulnay-sous-Bois",
      "Saint-Ouen",
    ],
    blurb:
      "Le 93 concentre un parc immobilier varié où les installations vieillissantes provoquent des coupures fréquentes. Interventions d'urgence 24h/24 et mises aux normes NF C 15-100 sur l'ensemble du département.",
  },
  {
    name: "Val-de-Marne",
    slug: "val-de-marne",
    code: "94",
    postalCode: "94000 – 94800",
    delai: "30 min",
    coverage: 92,
    communes: [
      "Créteil",
      "Vincennes",
      "Ivry-sur-Seine",
      "Saint-Maur-des-Fossés",
      "Vitry-sur-Seine",
      "Champigny-sur-Marne",
      "Maisons-Alfort",
      "Nogent-sur-Marne",
    ],
    blurb:
      "Pavillons, résidences et copropriétés du Val-de-Marne sont couverts en dépannage express. Panne de courant, disjoncteur qui saute, ballon d'eau chaude : diagnostic sur place et devis avant travaux.",
  },
  {
    name: "Val-d'Oise",
    slug: "val-d-oise",
    code: "95",
    postalCode: "95000 – 95800",
    delai: "1 h",
    coverage: 80,
    communes: [
      "Argenteuil",
      "Cergy",
      "Sarcelles",
      "Franconville",
      "Garges-lès-Gonesse",
      "Ermont",
    ],
    blurb:
      "Le nord de la région parisienne est desservi avec un délai d'intervention généralement compris entre 45 minutes et 1 heure. Dépannage électrique d'urgence comme travaux de mise en conformité.",
  },
  {
    name: "Yvelines",
    slug: "yvelines",
    code: "78",
    postalCode: "78000 – 78990",
    delai: "1 h",
    coverage: 78,
    communes: [
      "Versailles",
      "Saint-Germain-en-Laye",
      "Sartrouville",
      "Mantes-la-Jolie",
      "Poissy",
      "Le Chesnay",
    ],
    blurb:
      "Maisons individuelles et bâti ancien des Yvelines demandent souvent une reprise complète du tableau électrique. Nos électriciens interviennent en urgence comme sur rendez-vous planifié.",
  },
  {
    name: "Essonne",
    slug: "essonne",
    code: "91",
    postalCode: "91000 – 91900",
    delai: "1 h",
    coverage: 75,
    communes: [
      "Évry-Courcouronnes",
      "Massy",
      "Palaiseau",
      "Savigny-sur-Orge",
      "Sainte-Geneviève-des-Bois",
      "Corbeil-Essonnes",
    ],
    blurb:
      "Le sud francilien est couvert avec un délai d'environ une heure selon la commune et l'heure d'appel. Recherche de panne, remise en sécurité et installation électrique complète.",
  },
  {
    name: "Seine-et-Marne",
    slug: "seine-et-marne",
    code: "77",
    postalCode: "77000 – 77990",
    delai: "1 h 30",
    coverage: 65,
    communes: [
      "Meaux",
      "Chelles",
      "Melun",
      "Torcy",
      "Pontault-Combault",
      "Marne-la-Vallée",
    ],
    blurb:
      "L'ouest de la Seine-et-Marne, le plus proche de Paris, est desservi en priorité. Pour les communes les plus éloignées, le délai exact vous est confirmé au téléphone avant le départ de l'électricien.",
  },
];

/* ------------------------------------------------------------------ */
/*  Paris — maillage par arrondissement                                */
/* ------------------------------------------------------------------ */

export interface ParisArrondissement {
  name: string;
  slug: string;
  postalCode: string;
  quartier: string;
}

export const parisArrondissements: ParisArrondissement[] = [
  { name: "Paris 1er", slug: "paris-1", postalCode: "75001", quartier: "Louvre · Châtelet" },
  { name: "Paris 2e", slug: "paris-2", postalCode: "75002", quartier: "Bourse · Sentier" },
  { name: "Paris 3e", slug: "paris-3", postalCode: "75003", quartier: "Temple · Haut-Marais" },
  { name: "Paris 4e", slug: "paris-4", postalCode: "75004", quartier: "Marais · Hôtel de Ville" },
  { name: "Paris 5e", slug: "paris-5", postalCode: "75005", quartier: "Quartier latin" },
  { name: "Paris 6e", slug: "paris-6", postalCode: "75006", quartier: "Saint-Germain-des-Prés" },
  { name: "Paris 7e", slug: "paris-7", postalCode: "75007", quartier: "Invalides · Tour Eiffel" },
  { name: "Paris 8e", slug: "paris-8", postalCode: "75008", quartier: "Champs-Élysées" },
  { name: "Paris 9e", slug: "paris-9", postalCode: "75009", quartier: "Opéra · Grands Boulevards" },
  { name: "Paris 10e", slug: "paris-10", postalCode: "75010", quartier: "Gare du Nord · Canal" },
  { name: "Paris 11e", slug: "paris-11", postalCode: "75011", quartier: "Bastille · Oberkampf" },
  { name: "Paris 12e", slug: "paris-12", postalCode: "75012", quartier: "Bercy · Nation" },
  { name: "Paris 13e", slug: "paris-13", postalCode: "75013", quartier: "Place d'Italie" },
  { name: "Paris 14e", slug: "paris-14", postalCode: "75014", quartier: "Montparnasse · Alésia" },
  { name: "Paris 15e", slug: "paris-15", postalCode: "75015", quartier: "Vaugirard · Convention" },
  { name: "Paris 16e", slug: "paris-16", postalCode: "75016", quartier: "Passy · Trocadéro" },
  { name: "Paris 17e", slug: "paris-17", postalCode: "75017", quartier: "Batignolles · Ternes" },
  { name: "Paris 18e", slug: "paris-18", postalCode: "75018", quartier: "Montmartre · Barbès" },
  { name: "Paris 19e", slug: "paris-19", postalCode: "75019", quartier: "Buttes-Chaumont · Villette" },
  { name: "Paris 20e", slug: "paris-20", postalCode: "75020", quartier: "Belleville · Père-Lachaise" },
];

/** Villes phares affichées en nuage sur la page zone et dans le footer. */
export const villesPhares: string[] = zones
  .filter((z) => z.slug !== "paris")
  .flatMap((z) => z.communes.slice(0, 3));

/** Toutes les communes citées, pour le JSON-LD `areaServed`. */
export const communesCouvertes: string[] = [
  "Paris",
  ...zones.filter((z) => z.slug !== "paris").flatMap((z) => z.communes),
];
