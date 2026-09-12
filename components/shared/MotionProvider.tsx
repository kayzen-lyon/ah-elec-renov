"use client";

import { MotionConfig } from "framer-motion";

/**
 * `reducedMotion="user"` : quand l'OS demande moins de mouvement, Framer
 * Motion neutralise les transformations (glissements, ressorts) mais conserve
 * les fondus d'opacité — un retour visuel plus doux, pas une absence de retour.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
