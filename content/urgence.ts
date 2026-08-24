/**
 * Cœur du modèle « centralisation des demandes ».
 *
 * Toutes les demandes du site (home, page urgence, page devis, FAB mobile)
 * convergent vers UN SEUL formulaire alimenté par ce fichier. Modifier ici
 * met à jour le funnel entier.
 *
 * Périmètre métier : ÉLECTRICITÉ uniquement.
 * Zone : Paris et région parisienne (Île-de-France).
 */

/* ------------------------------------------------------------------ */
/*  La promesse                                                        */
/* ------------------------------------------------------------------ */

/**
 * ⚠️ Engagement commercial opposable (art. L121-2 du Code de la consommation).
 * Ne pas gonfler ces valeurs : une promesse non tenue est une pratique
 * commerciale trompeuse. Le délai de 30 min vaut pour Paris et la petite
 * couronne, aux heures où une équipe est effectivement prépositionnée.
 */
export const promesse = {
  /** Délai d'intervention affiché en héros. */
  delai: "30 minutes",
  delaiCourt: "30 min",
  /** Périmètre exact du délai annoncé — affiché en mention sous la promesse. */
  delaiPerimetre:
    "Paris et petite couronne (92, 93, 94), sous réserve de disponibilité d'une équipe.",
  /** Délai de rappel après envoi du formulaire. */
  rappel: "5 minutes",
  disponibilite: "24h/24 · 7j/7 · jours fériés",
  zoneCourte: "Paris & Île-de-France",
  zoneLongue: "Paris et toute la région parisienne",
} as const;

/* ------------------------------------------------------------------ */
/*  Compteurs de preuve (home + page urgence)                          */
/* ------------------------------------------------------------------ */

/**
 * ⚠️ Chiffres à faire valider par le client avant mise en production.
 * `value` est la cible du compteur animé, `suffix` le symbole affiché.
 */
export const stats = [
  { value: 4200, suffix: "+", label: "Interventions réalisées" },
  { value: 30, suffix: "min", label: "Délai moyen d'intervention" },
  { value: 98, suffix: "%", label: "Clients satisfaits" },
  { value: 24, suffix: "h/24", label: "Disponibilité" },
] as const;

/* ------------------------------------------------------------------ */
/*  Types d'intervention — électricité                                  */
/* ------------------------------------------------------------------ */

export interface InterventionType {
  value: string;
  label: string;
  /** `true` = panne traitée en dépannage d'urgence (mise en avant sur /urgence). */
  urgence: boolean;
}

export const interventionTypes: InterventionType[] = [
  { value: "panne-totale", label: "Panne de courant totale", urgence: true },
  { value: "disjoncteur", label: "Disjoncteur qui saute", urgence: true },
  { value: "court-circuit", label: "Court-circuit", urgence: true },
  { value: "odeur-brulee", label: "Odeur de brûlé / étincelles", urgence: true },
  { value: "tableau", label: "Tableau électrique en panne", urgence: true },
  {
    value: "prise-interrupteur",
    label: "Prise ou interrupteur HS",
    urgence: true,
  },
  { value: "eclairage", label: "Éclairage / luminaire", urgence: true },
  {
    value: "chauffage",
    label: "Chauffage électrique / ballon d'eau chaude",
    urgence: true,
  },
  {
    value: "volet-interphone",
    label: "Volet roulant, interphone, VMC",
    urgence: true,
  },
  { value: "recherche-panne", label: "Recherche de panne", urgence: true },
  {
    value: "mise-aux-normes",
    label: "Mise aux normes NF C 15-100 / Consuel",
    urgence: false,
  },
  {
    value: "installation",
    label: "Installation ou rénovation électrique",
    urgence: false,
  },
  {
    value: "borne-recharge",
    label: "Borne de recharge véhicule (IRVE)",
    urgence: false,
  },
  { value: "autre", label: "Autre demande électrique", urgence: false },
];

/** Pannes mises en avant sous forme de puces sur la section urgence. */
export const pannesCourantes = interventionTypes
  .filter((t) => t.urgence)
  .map((t) => t.label);

/* ------------------------------------------------------------------ */
/*  Degrés d'urgence                                                    */
/* ------------------------------------------------------------------ */

export interface UrgencyLevel {
  value: string;
  label: string;
  /** Délai de prise en charge annoncé pour ce niveau. */
  delai: string;
}

export const urgencyLevels: UrgencyLevel[] = [
  {
    value: "immediat",
    label: "Très urgent — intervention immédiate",
    delai: "30 min",
  },
  { value: "2h", label: "Urgent — dans les 2 heures", delai: "2 h" },
  { value: "journee", label: "Dans la journée", delai: "Même jour" },
  { value: "24-48h", label: "Sous 24 / 48 h", delai: "24-48 h" },
  {
    value: "devis",
    label: "Demande de devis — pas urgent",
    delai: "Devis sous 48 h",
  },
];

/* ------------------------------------------------------------------ */
/*  Garanties affichées à côté du formulaire                            */
/* ------------------------------------------------------------------ */

export const garanties = [
  `Intervention en ${promesse.delai} sur Paris et petite couronne`,
  "Devis annoncé avant toute intervention",
  "Tarif respecté, sans surprise ni frais caché",
  "Électricien qualifié, identifié et assuré",
  "Disponible nuits, week-ends et jours fériés",
  "Travaux garantis et conformes NF C 15-100",
] as const;

/* ------------------------------------------------------------------ */
/*  Parcours en 5 étapes                                                */
/* ------------------------------------------------------------------ */

export const parcours = [
  {
    n: "01",
    title: "Contact immédiat",
    text: `Un appel ou le formulaire suffit. Notre standard répond ${promesse.disponibilite}. Rappel sous ${promesse.rappel}.`,
  },
  {
    n: "02",
    title: "Qualification de la panne",
    text: "Nous identifions l'origine du problème électrique et engageons l'électricien le mieux équipé pour votre cas.",
  },
  {
    n: "03",
    title: "Intervention express",
    text: `Électricien sur place en ${promesse.delai} sur Paris et petite couronne. Devis présenté avant tout travail.`,
  },
  {
    n: "04",
    title: "Réparation & mise en sécurité",
    text: "Dépannage réalisé dans les règles de l'art, installation remise en sécurité et conforme à la norme NF C 15-100.",
  },
  {
    n: "05",
    title: "Vérification & garantie",
    text: "Test devant vous, chantier nettoyé, garantie sur l'intervention. Attestation Consuel si les travaux le nécessitent.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  FAQ urgence                                                         */
/* ------------------------------------------------------------------ */

export const faqUrgence = [
  {
    q: "Dans quel délai intervenez-vous en urgence ?",
    a: `Nous visons une intervention en ${promesse.delai} sur Paris et la petite couronne (92, 93, 94), sous réserve qu'une équipe soit disponible. En grande couronne, comptez généralement 1 h à 2 h. Le délai exact vous est confirmé au téléphone avant le départ de l'électricien.`,
  },
  {
    q: "Intervenez-vous la nuit, le week-end et les jours fériés ?",
    a: `Oui. Le standard est joignable ${promesse.disponibilite}. Les interventions de nuit, le dimanche et les jours fériés font l'objet d'une majoration, systématiquement annoncée avant le déplacement.`,
  },
  {
    q: "Le devis est-il vraiment gratuit ?",
    a: "Oui. Le diagnostic et le devis sont gratuits et sans engagement. Rien ne commence tant que vous n'avez pas validé le montant annoncé, et ce montant est celui que vous payez.",
  },
  {
    q: "Sur quelles zones intervenez-vous ?",
    a: `Nous couvrons ${promesse.zoneLongue} : Paris intra-muros (tous arrondissements), la petite couronne (92, 93, 94) et la grande couronne (77, 78, 91, 95).`,
  },
  {
    q: "Quels types de pannes électriques prenez-vous en charge ?",
    a: "Panne de courant totale ou partielle, disjoncteur qui saute, court-circuit, tableau électrique, prises et interrupteurs, éclairage, chauffage électrique, ballon d'eau chaude, volets roulants, interphone, VMC, ainsi que la recherche de panne et la mise aux normes.",
  },
  {
    q: "Que faire en attendant votre arrivée ?",
    a: "Coupez le disjoncteur général si vous constatez une odeur de brûlé, des étincelles ou de la fumée, et n'utilisez pas l'installation concernée. Ne touchez jamais un câble dénudé. Notre standard vous guide au téléphone dès votre appel.",
  },
  {
    q: "Intervenez-vous pour les professionnels et les copropriétés ?",
    a: "Oui : commerces, bureaux, syndics et copropriétés. Nous proposons des interventions ponctuelles comme des contrats de maintenance électrique avec astreinte.",
  },
  {
    q: "Vos interventions sont-elles garanties ?",
    a: "Oui. Chaque intervention est garantie, réalisée par un électricien qualifié et couverte par notre assurance professionnelle. Les travaux d'installation relèvent de la garantie décennale.",
  },
] as const;
