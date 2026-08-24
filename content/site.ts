/** Navigation, zone d'intervention, étapes, réassurance — contenu éditorial. */

import { parcours, promesse } from "@/content/urgence";

export const nav = [
  { label: "Dépannage 24/7", href: "/urgence" },
  { label: "Services", href: "/services" },
  { label: "Zone d'intervention", href: "/zone-intervention" },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

/** Secteurs desservis — Paris et région parisienne. */
export const interventionZones = [
  "Paris (tous arrondissements)",
  "Hauts-de-Seine (92)",
  "Seine-Saint-Denis (93)",
  "Val-de-Marne (94)",
  "Val-d'Oise (95)",
  "Yvelines (78)",
  "Essonne (91)",
  "Seine-et-Marne (77)",
] as const;

/** Bandeau de réassurance (home + pages). */
export const reassurances = [
  `Intervention en ${promesse.delaiCourt}`,
  "Disponible 24h/24 · 7j/7",
  "Devis gratuit avant travaux",
  "Normes NF C 15-100",
] as const;

/** Arguments « Pourquoi AH ELEC RENOV ». */
export const whyUs = [
  {
    title: "Rapidité",
    text: `Électricien sur place en ${promesse.delai} sur Paris et la petite couronne. Nos équipes sont réparties sur la région pour réduire les délais au minimum.`,
  },
  {
    title: "Disponibilité totale",
    text: "Nuits, week-ends et jours fériés inclus. Une panne électrique n'attend pas les heures de bureau — notre standard non plus.",
  },
  {
    title: "Un seul interlocuteur",
    text: "Un numéro, un formulaire, une équipe. Vous décrivez votre panne une seule fois et nous engageons l'électricien adapté.",
  },
  {
    title: "Transparence",
    text: "Devis annoncé avant toute intervention, tarif respecté, aucun frais caché. Vous validez avant que quoi que ce soit ne commence.",
  },
  {
    title: "Travail aux normes",
    text: "Électriciens qualifiés, installations conformes NF C 15-100, attestation Consuel quand les travaux le nécessitent.",
  },
] as const;

/** Étapes de collaboration — parcours en 5 temps (source : content/urgence.ts). */
export const steps = parcours;
