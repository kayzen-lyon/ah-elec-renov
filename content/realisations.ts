/**
 * Réalisations (avant/après). Ces visuels sont illustratifs — les vraies photos
 * de chantiers remplaçeront before/after dès qu'elles seront fournies (déposer
 * dans /public/realisations/ et mettre à jour les valeurs ici).
 *
 * Toutes les images passent par photo() depuis @/content/photos : source unique,
 * zéro URL en dur, zéro image cassée si Unsplash change un identifiant.
 */

import { photo } from "@/content/photos";

export type Realisation = {
  slug: string;
  title: string;
  city: string;
  category: string;
  summary: string;
  before: string;
  after: string;
};

export const realisations: Realisation[] = [
  {
    slug: "salle-de-bain-neuilly",
    title: "Rénovation complète de salle de bain",
    city: "Neuilly-sur-Seine",
    category: "Salle de bain",
    summary:
      "Dépose totale, création d'une douche à l'italienne, reprise de la plomberie et de l'électricité, carrelage grand format et finitions soignées.",
    before: photo("sdbAvant"),
    after: photo("sdbApres"),
  },
  {
    slug: "tableau-electrique-boulogne",
    title: "Rénovation de tableau et mise aux normes",
    city: "Boulogne-Billancourt",
    category: "Électricité",
    summary:
      "Remplacement d'un tableau vétuste par un coffret neuf, mise en conformité NF C 15-100 avant vente, passage du Consuel.",
    before: photo("cablage"),
    after: photo("tableauElectrique"),
  },
  {
    slug: "cuisine-ecully",
    title: "Aménagement de cuisine ouverte",
    city: "Levallois-Perret",
    category: "Cuisine",
    summary:
      "Ouverture sur séjour, création d'une cuisine sur mesure : circuits dédiés, prises encastrées, raccordements plomberie et pose complète.",
    before: photo("cuisineAvant"),
    after: photo("cuisineModerne"),
  },
  {
    slug: "douche-italienne-montreuil",
    title: "Création de douche à l'italienne",
    city: "Montreuil",
    category: "Salle de bain",
    summary:
      "Transformation d'une baignoire en douche de plain-pied : receveur extra-plat, paroi en verre, reprise de l'étanchéité et du carrelage mural.",
    before: photo("sdbAvant"),
    after: photo("doucheItalienne"),
  },
  {
    slug: "cablage-renovation-sainte-foy",
    title: "Recâblage complet d'appartement",
    city: "Vincennes",
    category: "Électricité",
    summary:
      "Refonte totale de l'installation électrique d'un appartement des années 70 : tableau neuf, câbles sous gaines, prises et éclairage aux normes.",
    before: photo("cablage"),
    after: photo("tableauElectrique"),
  },
  {
    slug: "cuisine-renovation-charbonnieres",
    title: "Rénovation de cuisine et îlot central",
    city: "Saint-Maur-des-Fossés",
    category: "Cuisine",
    summary:
      "Rénovation complète avec dépose de l'ancienne installation, pose d'un îlot central, création des circuits 32 A et raccordements gaz/eau.",
    before: photo("cuisineAvant"),
    after: photo("cuisine3"),
  },
  {
    slug: "plomberie-boulogne",
    title: "Réfection de plomberie en rénovation",
    city: "Boulogne-Billancourt",
    category: "Plomberie",
    summary:
      "Remplacement des colonnes en plomb, mise en place d'un réseau PER multicouche, pose des équipements sanitaires et robinetterie.",
    before: photo("renovationChantier"),
    after: photo("plomberie"),
  },
  {
    slug: "renovation-complete-marcy",
    title: "Rénovation intérieure clé en main",
    city: "Issy-les-Moulineaux",
    category: "Rénovation",
    summary:
      "Chantier global sur maison de 110 m² : électricité, plomberie, peinture et finitions confiés à une seule équipe, délai maîtrisé.",
    before: photo("renovationChantier"),
    after: photo("interieurRenove"),
  },
];
