import type { Transition } from "framer-motion";

/**
 * Ressorts « à la Apple » (Designing Fluid Interfaces, WWDC 2018).
 *
 * Deux paramètres seulement : l'amortissement (rebond) et la réponse (durée
 * apparente). Par défaut on reste critiquement amorti (aucun dépassement) :
 * un menu qui s'ouvre n'a pas d'élan, il n'a donc aucune raison de rebondir.
 * Le léger rebond est réservé aux surfaces relâchées après un geste.
 */
export const spring = {
  /** Panneaux, menus, dialogues : amortissement 1, réponse ~0.35 s. */
  ui: { type: "spring", bounce: 0, duration: 0.35 },
  /** Feuille relâchée après un glissement : l'élan du doigt justifie un rebond. */
  sheet: { type: "spring", bounce: 0.15, duration: 0.4 },
  /** Micro-éléments (soulignement, chevron, pastille). */
  snappy: { type: "spring", bounce: 0, duration: 0.25 },
  /** Fondu croisé de contenu (changement de rubrique, mouvement réduit). */
  fade: { duration: 0.16, ease: "easeOut" },
} as const satisfies Record<string, Transition>;
