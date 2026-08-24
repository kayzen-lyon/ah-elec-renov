/**
 * Contenu éditorial de la page « À propos ».
 * Source unique : modifier ici met à jour toute la page.
 */

export const bio = {
  intro:
    "Électricien de formation, Hocine ASLI a élargi son activité à la rénovation intérieure après avoir constaté, chantier après chantier, que ses clients devaient coordonner plusieurs corps de métier pour un résultat final. AH ELEC RENOV est né de cette conviction simple : un seul artisan, du tableau électrique aux finitions, c'est moins de stress pour le client et un travail mieux maîtrisé.",
  paragraphs: [
    "Basé à Paris 15e, j'interviens principalement dans la région parisienne — Boulogne-Billancourt, Neuilly-sur-Seine, Levallois-Perret, Vincennes, Montreuil et leurs alentours. Mon périmètre d'action reste volontairement limité : la proximité géographique me permet de tenir mes délais et d'être disponible si quelque chose réclame une attention après la réception.",
    "L'électricité, c'est mon cœur de métier. Mises aux normes NF C 15-100, tableaux de répartition, VA-et-vient, prises USB, domotique de base, attestations Consuel : je prends en charge l'ensemble du lot électrique. La partie rénovation vient compléter naturellement — peinture, revêtements de sol, faïence, second œuvre — pour livrer un intérieur terminé sans que vous ayez à gérer une demi-douzaine d'artisans.",
    "Je travaille seul, sans sous-traitance. Ce que vous voyez dans le devis, c'est ce qui sera réalisé, par la même personne. Cela implique aussi une transparence totale sur les délais : si le planning est serré, je le dis en amont, pas à mi-chantier.",
  ],
} as const;

export const valeurs = [
  {
    icon: "shield-check" as const,
    title: "Travail aux normes",
    text: "Chaque installation électrique respecte la norme NF C 15-100. L'attestation Consuel est fournie dès que le lot l'exige. Pas de raccourcis sur la sécurité.",
  },
  {
    icon: "clock" as const,
    title: "Respect des délais",
    text: "Le planning est fixé avant le démarrage et tenu. En cas d'imprévu de chantier, vous êtes informé immédiatement — jamais après coup.",
  },
  {
    icon: "receipt-text" as const,
    title: "Devis transparents",
    text: "Le devis détaille chaque poste : fournitures, main-d'œuvre, déplacements. Aucun coût caché ne surgit en fin de chantier.",
  },
  {
    icon: "map-pin" as const,
    title: "Proximité réelle",
    text: "Je couvre un secteur géographique restreint pour rester disponible. Pas de délai de trois semaines pour un retour d'appel ou une petite intervention.",
  },
  {
    icon: "user-check" as const,
    title: "Un seul interlocuteur",
    text: "De la visite de diagnostic à la réception du chantier, vous avez toujours la même personne au bout du fil — et sur le chantier.",
  },
] as const;

export type ValeurIcon = (typeof valeurs)[number]["icon"];

/** Engagements qualité affichés en lieu et place des certifications non encore actives. */
export const engagements = [
  {
    title: "Assurance décennale",
    text: "Les travaux réalisés sont couverts par une assurance décennale. Les justificatifs sont fournis sur demande avant démarrage du chantier.",
  },
  {
    title: "Devis gratuit, sans engagement",
    text: "La visite de chantier et le chiffrage sont offerts. Vous recevez un document écrit et détaillé, que vous décidiez de donner suite ou non.",
  },
  {
    title: "Conformité NF C 15-100",
    text: "Toutes les installations électriques sont réalisées selon la norme en vigueur. Attestation de conformité Consuel fournie pour les travaux qui l'exigent.",
  },
  {
    title: "Pas de sous-traitance",
    text: "Le travail est exécuté par l'artisan signataire du devis. Aucun tiers non déclaré n'intervient sur votre chantier.",
  },
] as const;

/**
 * Statistiques indicatives — chiffres volontairement honnêtes.
 * Pas de valeurs rondes ni de certifications non vérifiées.
 */
export const stats = [
  { value: "10+", label: "communes couvertes" },
  { value: "2", label: "métiers, un seul artisan" },
  { value: "0", label: "sous-traitant" },
] as const;
