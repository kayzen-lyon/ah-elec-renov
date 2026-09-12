/**
 * Structure du menu principal (header desktop + mobile).
 *
 * Le header ne porte plus 6 entrées à plat : on regroupe en 4 rubriques, dont
 * trois ouvrent un méga-panneau (colonnes de liens + visuel d'illustration).
 * Le dépannage reste un lien direct — une urgence ne se cherche pas dans un
 * sous-menu.
 *
 * Les libellés proviennent des sources existantes (services, zones, promesse)
 * pour éviter toute divergence de contenu.
 */

import { services } from "@/content/services";
import { zones } from "@/content/zones";
import { photo } from "@/content/photos";
import { promesse } from "@/content/urgence";

/** Icônes autorisées — résolues vers lucide-react dans le composant. */
export type MenuIconName =
  | "zap"
  | "hammer"
  | "shower"
  | "cooking"
  | "pipe"
  | "map-pin"
  | "images"
  | "users"
  | "mail"
  | "file-text";

export type MenuLink = {
  label: string;
  href: string;
  desc?: string;
  icon?: MenuIconName;
  /** Pastille courte à droite du libellé (délai, mention « 24/7 »…). */
  badge?: string;
};

export type MenuColumn = {
  title: string;
  links: MenuLink[];
};

/** Carte visuelle à droite du panneau — l'illustration du méga-menu. */
export type MenuFeature = {
  href: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
};

export type MenuPanel = {
  columns: MenuColumn[];
  feature: MenuFeature;
  /** Bandeau bas de panneau — rappel de la promesse + sortie du funnel. */
  footer: { text: string; cta: string; href: string };
};

export type HeaderNavItem = {
  key: string;
  label: string;
  /** Libellé raccourci affiché entre 1024 et 1280 px (place comptée). */
  short?: string;
  href: string;
  /** Lien direct traité comme entrée d'urgence (pastille pulsée, pas de panneau). */
  urgent?: boolean;
  panel?: MenuPanel;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const serviceLink = (slug: string): MenuLink => {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Menu : service inconnu « ${slug} »`);
  return {
    label: s.title,
    href: `/services/${s.slug}`,
    desc: s.short,
    icon: s.icon,
  };
};

const zoneLink = (slug: string): MenuLink => {
  const z = zones.find((x) => x.slug === slug);
  if (!z) throw new Error(`Menu : zone inconnue « ${slug} »`);
  return {
    label: z.name,
    href: `/zone-intervention#${z.slug}`,
    desc: z.postalCode,
    icon: "map-pin",
    badge: z.delai,
  };
};

/* ------------------------------------------------------------------ */
/*  Panneaux                                                           */
/* ------------------------------------------------------------------ */

const servicesPanel: MenuPanel = {
  columns: [
    {
      title: "Électricité",
      links: [serviceLink("depannage-urgence"), serviceLink("electricite")],
    },
    {
      title: "Rénovation clé en main",
      links: [
        serviceLink("renovation-interieure"),
        serviceLink("salle-de-bain"),
        serviceLink("cuisine"),
        serviceLink("plomberie"),
      ],
    },
  ],
  feature: {
    href: "/services",
    image: photo("tableauElectrique", 900, 70),
    alt: "Électricien intervenant sur un tableau électrique",
    eyebrow: "Notre métier",
    title: "Toutes nos prestations",
    text: "Du dépannage en urgence à la rénovation complète : un seul interlocuteur, des installations conformes NF C 15-100.",
    cta: "Voir les services",
  },
  footer: {
    text: `Une panne en cours ? Électricien sur place en ${promesse.delai}.`,
    cta: "Demander une intervention",
    href: "/urgence",
  },
};

const zonePanel: MenuPanel = {
  columns: [
    {
      title: "Paris & petite couronne",
      links: [
        zoneLink("paris"),
        zoneLink("hauts-de-seine"),
        zoneLink("seine-saint-denis"),
        zoneLink("val-de-marne"),
      ],
    },
    {
      title: "Grande couronne",
      links: [
        zoneLink("val-d-oise"),
        zoneLink("yvelines"),
        zoneLink("essonne"),
        zoneLink("seine-et-marne"),
      ],
    },
  ],
  feature: {
    href: "/zone-intervention",
    image: photo("architectureParis", 900, 70),
    alt: "Immeubles haussmanniens parisiens",
    eyebrow: "Couverture",
    title: "Paris & toute l'Île-de-France",
    text: `Équipes prépositionnées sur la capitale et la petite couronne : ${promesse.delai} annoncées, ${promesse.disponibilite}.`,
    cta: "Voir la carte des secteurs",
  },
  footer: {
    text: promesse.delaiPerimetre,
    cta: "Vérifier ma commune",
    href: "/zone-intervention",
  },
};

const entreprisePanel: MenuPanel = {
  columns: [
    {
      title: "Nous connaître",
      links: [
        {
          label: "Réalisations",
          href: "/realisations",
          desc: "Chantiers livrés, avant / après.",
          icon: "images",
        },
        {
          label: "À propos",
          href: "/a-propos",
          desc: "L'équipe, la méthode, les engagements.",
          icon: "users",
        },
      ],
    },
    {
      title: "Nous contacter",
      links: [
        {
          label: "Contact",
          href: "/contact",
          desc: "Téléphone, e-mail, carte de visite.",
          icon: "mail",
        },
        {
          label: "Devis gratuit",
          href: "/devis",
          desc: "Chiffrage sous 48 h, sans engagement.",
          icon: "file-text",
        },
      ],
    },
  ],
  feature: {
    href: "/realisations",
    image: photo("artisanTravail", 900, 70),
    alt: "Électricien au travail sur un chantier",
    eyebrow: "Nos chantiers",
    title: "Le travail parle pour nous",
    text: "Tableaux refaits, câblages repris, rénovations complètes : les photos avant / après de nos interventions.",
    cta: "Voir les réalisations",
  },
  footer: {
    text: "Devis annoncé avant intervention, tarif respecté, aucun frais caché.",
    cta: "Demander un devis",
    href: "/devis",
  },
};

/* ------------------------------------------------------------------ */
/*  Navigation principale                                              */
/* ------------------------------------------------------------------ */

export const headerNav: HeaderNavItem[] = [
  { key: "urgence", label: "Dépannage 24/7", href: "/urgence", urgent: true },
  {
    key: "services",
    label: "Services",
    href: "/services",
    panel: servicesPanel,
  },
  {
    key: "zone",
    label: "Zone d'intervention",
    short: "Zone",
    href: "/zone-intervention",
    panel: zonePanel,
  },
  {
    key: "entreprise",
    label: "L'entreprise",
    short: "Entreprise",
    href: "/a-propos",
    panel: entreprisePanel,
  },
];
