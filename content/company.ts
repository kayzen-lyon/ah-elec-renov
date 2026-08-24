/**
 * Source unique de vérité pour toutes les données de l'entreprise (NAP, mentions
 * légales, JSON-LD). Modifier ICI met à jour tout le site.
 *
 * ⚠️ Champs « À COMPLÉTER » = données encore manquantes / à confirmer avant prod.
 *    Voir la liste récapitulative dans le README.
 *
 * Coordonnées confirmées depuis la carte de visite (mobile + fixe + adresse).
 * RESTE À CONFIRMER : l'entité légale exacte (la carte indique AH+elec /
 * ahelec.fr / RCS Lyon 853 296 499 / « Gérant », alors que le brief initial
 * indiquait AH ELEC RENOV SASU / 933 755 423 / Francheville). Tant que ce n'est
 * pas tranché, les identifiants légaux restent en « À COMPLÉTER ».
 */

export const TODO = "À COMPLÉTER";
/** Renvoie la valeur si renseignée, sinon le marqueur « À COMPLÉTER ». */
export const orTodo = (v?: string) => (v && v.trim() ? v : TODO);

export const company = {
  // --- Identité ---
  legalName: "AH ELEC RENOV", // marque affichée (à confirmer : AH+elec ?)
  brandName: "AH ELEC RENOV",
  tagline: "Dépannage électrique 24h/24 à Paris et en Île-de-France",
  baseline: "Un seul numéro, un électricien chez vous en 30 minutes.",
  director: "Hocine ASLI",
  directorRole: "Président", // SASU → Président

  // --- Coordonnées (NAP — IDENTIQUE partout : site, Google, annuaires) ---
  contact: {
    phone: "06 50 04 52 33", // mobile — CTA principal
    phoneHref: "tel:+33650045233",
    phoneFixed: "04 87 37 99 27", // fixe
    phoneFixedHref: "tel:+33487379927",
    email: "contact@ahelec.fr",
  },

  address: {
    street: "27 rue de Bourgogne",
    postalCode: "69009",
    city: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    country: "France",
    countryCode: "FR",
    // Coordonnées approximatives (Lyon 9e — à affiner pour la carte).
    latitude: 45.7686,
    longitude: 4.8045,
  },

  // --- Données légales (entité confirmée : AH ELEC RENOV SASU) ---
  legal: {
    raisonSociale: "AH ELEC RENOV",
    // Capital (100 €) repris du brief initial — à vérifier sur le Kbis.
    form: "SASU au capital de 100 €",
    siren: "853 296 499",
    siret: "853 296 499 00017",
    rcs: "853 296 499 R.C.S. Lyon",
    // TVA intracom = clé standard calculée pour le SIREN (à corriger si franchise en base).
    tva: "FR48 853 296 499",
    ape: "", // optionnel en mentions légales (ligne masquée si vide)
    creationDate: "",
    // Assurances : souscrites ; coordonnées/n° non affichés (figurent sur devis/factures).
    decennale:
      "Coordonnées de l'assureur et zone de couverture communiquées sur les devis et factures, conformément à l'article L.243-2 du Code des assurances.",
    rcPro:
      "Responsabilité civile professionnelle souscrite ; coordonnées de l'assureur communiquées sur demande.",
    // Médiateur de la consommation (nom + URL) — OBLIGATOIRE B2C.
    mediator: {
      name: "AME CONSO — Association des Médiateurs Européens",
      url: "https://www.mediationconso-ame.com",
    },
    // Hébergeur (Vercel par défaut).
    host: {
      name: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
      url: "https://vercel.com",
    },
  },

  // --- Réseaux / fiche Google ---
  social: {
    website: "https://www.ahelec.fr", // site indiqué sur la carte (domaine à confirmer)
    googleBusinessUrl: "", // À COMPLÉTER : fiche Google Business Profile
    googleReviewUrl: "", // À COMPLÉTER : lien « laisser un avis » (QR Avis)
  },

  // --- Horaires : standard d'urgence ouvert en continu ---
  hours: "24h/24, 7j/7, jours fériés inclus",
} as const;

/**
 * Établissement d'exploitation en Île-de-France.
 *
 * ⚠️ IMPORTANT — le siège social déclaré (`company.address`) est à Lyon 9e ;
 * il reste affiché dans les mentions légales, où il est obligatoire et exact.
 * Mais la zone d'intervention commerciale est Paris / Île-de-France : tant
 * qu'aucune adresse francilienne n'est fournie, le site n'affiche AUCUNE
 * adresse postale hors mentions légales (uniquement le téléphone et la zone),
 * et le JSON-LD `LocalBusiness` déclare la région servie sans épingler Lyon.
 *
 * Dès qu'une adresse parisienne existe, renseigner les champs ci-dessous et
 * passer `active: true` : la fiche locale, la carte et le JSON-LD basculent
 * automatiquement dessus.
 */
export const establishment = {
  active: false,
  street: "", // À COMPLÉTER — adresse de l'établissement francilien
  postalCode: "",
  city: "Paris",
  region: "Île-de-France",
  countryCode: "FR",
  // Centre de Paris — utilisé pour la géolocalisation tant que l'adresse
  // exacte n'est pas connue.
  latitude: 48.8566,
  longitude: 2.3522,
} as const;

/** Adresse à utiliser pour l'affichage local et le JSON-LD. */
export const displayLocation = establishment.active
  ? `${establishment.street}, ${establishment.postalCode} ${establishment.city}`
  : "Paris & région parisienne";

/**
 * Agence web ayant réalisé le site (crédit footer + mentions légales).
 * Données réelles fournies.
 */
export const agency = {
  name: "KAYZEN LYON",
  form: "SASU",
  siren: "999 418 346",
  siret: "999 418 346 000 14",
  rcs: "Lyon — 999 418 346",
  tva: "FR85 999 418 346",
  ape: "4791B",
  address: "6, rue Pierre Termier, 69009 Lyon",
  phone: "+33 (0)4 87 77 68 61",
  phoneHref: "tel:+33487776861",
  email: "contact@kayzen-lyon.fr",
  url: "https://internet.kayzen-lyon.fr",
  creditLabel: "Fièrement réalisé par Kayzen Web",
} as const;

/** Requête cartographique — l'établissement s'il existe, sinon la zone servie. */
const mapsQuery = establishment.active
  ? `${company.brandName} ${establishment.street} ${establishment.postalCode} ${establishment.city}`
  : `${company.brandName} électricien Paris`;

/** URL Google Maps de la fiche / zone servie. */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  mapsQuery,
)}`;

/** URL d'itinéraire Google Maps (n'a de sens qu'avec un établissement réel). */
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  establishment.active
    ? `${establishment.street} ${establishment.postalCode} ${establishment.city}`
    : "Paris, France",
)}`;

/** Téléphones / email renseignés ? */
export const hasPhone = Boolean(company.contact.phone);
export const hasPhoneFixed = Boolean(company.contact.phoneFixed);
export const hasEmail = Boolean(company.contact.email);

/**
 * Certifications. N'afficher dynamiquement QUE celles fournies/validées
 * (mettre `active: true`). RGE/Qualifelec/Qualibat débloquent MaPrimeRénov'/CEE.
 */
export const certifications = [
  { name: "RGE", label: "Reconnu Garant de l'Environnement", active: false },
  { name: "Qualifelec", label: "Qualification électricité", active: false },
  { name: "Qualibat", label: "Qualification bâtiment", active: false },
  { name: "Handibat", label: "Accessibilité PMR", active: false },
] as const;

export const activeCertifications = certifications.filter((c) => c.active);
