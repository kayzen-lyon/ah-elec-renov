/**
 * Bibliothèque de visuels — IDs Unsplash VÉRIFIÉS (HTTP 200). Source unique pour
 * toutes les pages : référencer une clé plutôt qu'une URL en dur garantit la
 * cohérence et zéro image cassée. Remplacer par les vraies photos de chantiers
 * dès qu'elles sont fournies (déposer dans /public et changer la valeur).
 *
 * Toutes les URLs pointent images.unsplash.com (autorisé dans next.config.mjs).
 */

const ID = {
  heroElectricien: "photo-1621905251918-48416bd8575a",
  tableauElectrique: "photo-1558002038-1055907df827",
  cablage: "photo-1621905251189-08b45d6a269e",
  sdbApres: "photo-1620626011761-996317b8d101",
  sdbAvant: "photo-1584622650111-993a426fbf0a",
  doucheItalienne: "photo-1524813686514-a57563d77965",
  cuisineModerne: "photo-1556909212-d5b604d0c90d",
  cuisineAvant: "photo-1556911220-bff31c812dba",
  cuisine3: "photo-1556228453-efd6c1ff04f6",
  plomberie: "photo-1507089947368-19c1da9775ae",
  plomberie2: "photo-1581244277943-fe4a9c777189",
  renovationChantier: "photo-1503387762-592deb58ef4e",
  peinture: "photo-1562259949-e8e7689d7828",
  interieurRenove: "photo-1600585154340-be6161a56a0c",
  interieur2: "photo-1600566753086-00f18fb6b3ea",
  artisanPortrait: "photo-1581092160562-40aa08e78837",
  artisanTravail: "photo-1504307651254-35680f356dfd",
  bureauDevis: "photo-1497366216548-37526070297c",
  parisVille: "photo-1565538810643-b5bdb714032a",
  architectureParis: "photo-1431576901776-e539bd916ba2",
} as const;

export type PhotoKey = keyof typeof ID;

/** Construit une URL Unsplash optimisée (next/image gère ensuite AVIF/WebP + srcset). */
export function photo(key: PhotoKey, w = 1200, q = 70): string {
  return `https://images.unsplash.com/${ID[key]}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const photos = ID;
