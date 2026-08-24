/**
 * Contenu éditorial riche pour les pages de service.
 * Source unique : utilisé par app/services/[slug]/page.tsx.
 */

import type { PhotoKey } from "@/content/photos";

export type Prestation = {
  title: string;
  text: string;
};

export type ServiceContent = {
  slug: string;
  metaTitle: string; // <60 chars
  metaDescription: string; // <155 chars
  heroImageKey: PhotoKey;
  serviceType: string;
  intro: string[]; // 2-3 paragraphes
  prestations: Prestation[]; // 5-8 items
  reassurances: string[]; // 3-4 items
  faq: { q: string; a: string }[]; // 4-6 Q/R
  galleryKeys: PhotoKey[]; // 3-6 clés
};

export const servicesContent: ServiceContent[] = [
  {
    slug: "depannage-urgence",
    metaTitle: "Dépannage électrique urgent 24h/24 — Paris & IDF",
    metaDescription:
      "Électricien d'urgence à Paris et en Île-de-France. Intervention en 30 minutes, 24h/24 et 7j/7. Panne de courant, disjoncteur, court-circuit. Devis gratuit.",
    heroImageKey: "heroElectricien",
    serviceType: "Emergency Electrical Repair",
    intro: [
      "Une coupure de courant en pleine nuit, un disjoncteur qui refuse de se réenclencher, une odeur de brûlé près du tableau : une panne électrique n'attend pas les heures ouvrables. Nos électriciens sont mobilisables immédiatement partout à Paris et en région parisienne, 24h/24, 7j/7, jours fériés compris.",
      "Toutes les demandes passent par un point d'entrée unique — un numéro et un formulaire. Vous décrivez la panne une seule fois, nous qualifions le problème au téléphone et nous engageons l'électricien le mieux équipé pour votre cas. Le délai réel vous est confirmé avant le départ, et le tarif est annoncé avant que quoi que ce soit ne commence.",
      "Nous couvrons Paris intra-muros et les huit départements franciliens. Sur Paris et la petite couronne (92, 93, 94), nous visons une intervention en 30 minutes ; en grande couronne, comptez généralement entre une heure et deux heures selon la commune.",
    ],
    prestations: [
      {
        title: "Panne de courant totale ou partielle",
        text: "Diagnostic immédiat de l'origine de la coupure : défaut sur le tableau, sur un circuit, ou en amont côté distributeur. Rétablissement dès que la cause est identifiée et sécurisée.",
      },
      {
        title: "Disjoncteur qui saute à répétition",
        text: "Identification du circuit ou de l'appareil fautif par isolement successif, contrôle des protections différentielles et remplacement des éléments défaillants.",
      },
      {
        title: "Court-circuit et défaut d'isolement",
        text: "Localisation précise du défaut au matériel de mesure professionnel, réparation du câblage concerné et vérification de l'isolement de l'installation avant remise sous tension.",
      },
      {
        title: "Odeur de brûlé, étincelles, échauffement",
        text: "Intervention prioritaire. Mise hors tension, contrôle du tableau et des connexions, remplacement des éléments dégradés et remise en sécurité de l'installation.",
      },
      {
        title: "Recherche de panne",
        text: "Quand l'origine du problème n'est pas évidente, nous procédons à une recherche méthodique circuit par circuit, avec un rapport de ce qui a été trouvé et corrigé.",
      },
      {
        title: "Chauffage électrique et ballon d'eau chaude",
        text: "Panne de convecteur, de plancher chauffant ou de chauffe-eau : contrôle de l'alimentation, du thermostat, de la résistance et du contacteur jour/nuit.",
      },
      {
        title: "Volets roulants, interphone, VMC",
        text: "Dépannage des équipements électriques du logement : motorisation de volet bloquée, interphone muet, VMC à l'arrêt.",
      },
    ],
    reassurances: [
      "Intervention en 30 min sur Paris et petite couronne",
      "Disponible 24h/24, 7j/7, jours fériés inclus",
      "Devis annoncé avant intervention, tarif respecté",
      "Électriciens qualifiés, identifiés et assurés",
    ],
    faq: [
      {
        q: "Combien coûte un dépannage électrique en urgence ?",
        a: "Le tarif dépend de la nature de la panne et de l'heure d'intervention. Le déplacement et le diagnostic sont gratuits, et le montant vous est annoncé avant tout travail : vous validez d'abord, nous intervenons ensuite. Les interventions de nuit, le dimanche et les jours fériés font l'objet d'une majoration, annoncée elle aussi à l'avance.",
      },
      {
        q: "Intervenez-vous vraiment en 30 minutes ?",
        a: "C'est notre objectif sur Paris et la petite couronne (92, 93, 94), quand une équipe est disponible à proximité. En grande couronne, le délai est généralement d'une à deux heures. Dans tous les cas, le délai réel vous est confirmé au téléphone avant que l'électricien ne se mette en route.",
      },
      {
        q: "Que faire en attendant l'électricien ?",
        a: "En cas d'odeur de brûlé, d'étincelles ou de fumée, coupez le disjoncteur général et n'utilisez plus l'installation concernée. Ne touchez jamais un câble dénudé et n'ouvrez pas le tableau vous-même. En cas de départ de feu, appelez le 18 ou le 112.",
      },
      {
        q: "La panne peut-elle venir de mon fournisseur d'électricité ?",
        a: "Oui, une coupure peut venir du réseau ou du compteur, en amont de votre installation. Notre diagnostic permet de trancher rapidement : si le défaut est en amont, nous vous l'indiquons et vous orientons vers le gestionnaire de réseau, sans vous facturer de réparation inutile.",
      },
      {
        q: "Intervenez-vous pour les copropriétés et les commerces ?",
        a: "Oui. Nous intervenons en parties communes pour les syndics, ainsi que dans les commerces et bureaux. Des contrats de maintenance avec astreinte peuvent être mis en place pour garantir une prise en charge prioritaire.",
      },
    ],
    galleryKeys: ["heroElectricien", "tableauElectrique", "cablage"],
  },
  {
    slug: "electricite",
    metaTitle: "Électricien à Paris — mise aux normes NF C 15-100",
    metaDescription:
      "Rénovation de tableau, mise aux normes NF C 15-100, attestation Consuel et dépannage électrique à Paris et en Île-de-France. Devis gratuit.",
    heroImageKey: "heroElectricien",
    serviceType: "Electrical installation and repair",
    intro: [
      "Une installation électrique vieillissante ou non conforme représente un risque réel pour vos occupants et votre bien immobilier. Chez AH ELEC RENOV, nous intervenons sur l'ensemble de votre installation pour la mettre ou la maintenir en conformité avec la norme NF C 15-100, en vigueur pour tous les logements en France.",
      "Que vous soyez propriétaire souhaitant vendre, locataire souhaitant sécuriser un appartement ancien, ou particulier réalisant une extension, notre électricien diplômé établit un diagnostic complet avant de vous proposer un devis clair, sans surprise. Chaque intervention débouche sur une attestation Consuel, document indispensable pour la mise en service ou la remise aux normes officielle.",
      "Nous intervenons à Paris et dans toute l'Île-de-France (Boulogne-Billancourt, Neuilly-sur-Seine, Levallois-Perret, Vincennes, Montreuil, Saint-Maur-des-Fossés), sans sous-traitance. Un seul artisan, du diagnostic à la livraison.",
    ],
    prestations: [
      {
        title: "Mise aux normes NF C 15-100",
        text: "Diagnostic complet de votre tableau et de vos circuits. Remplacement ou mise à niveau des équipements vétustes, ajout de protections différentielles, mise à la terre.",
      },
      {
        title: "Rénovation de tableau électrique",
        text: "Remplacement d'un tableau ancien (fusibles, disjoncteurs hors normes) par un tableau modulaire conforme, avec organisation des circuits par zone et étiquetage clair.",
      },
      {
        title: "Attestation Consuel",
        text: "Après travaux, nous constituons le dossier de demande d'attestation Consuel (visuelle de conformité) pour le raccordement ou le rétablissement du compteur Enedis.",
      },
      {
        title: "Remise aux normes avant vente",
        text: "Le diagnostic électrique est obligatoire lors d'une vente immobilière. Nous réalisons les travaux correctifs pour lever les anomalies signalées et sécuriser la transaction.",
      },
      {
        title: "Dépannage et diagnostic",
        text: "Prise en charge rapide des pannes (disjoncteur qui saute, court-circuit, prise défaillante). Localisation précise du défaut grâce au matériel de mesure professionnel.",
      },
      {
        title: "Création de circuits et prises",
        text: "Ajout de prises de courant, circuits dédiés pour appareils énergivores (four encastré, lave-linge, borne de recharge), ou extension lors d'un aménagement de pièce.",
      },
      {
        title: "Éclairage et domotique de base",
        text: "Pose de spots encastrés, interrupteurs variateurs, éclairage extérieur avec détecteur de mouvement. Câblage préparatoire pour systèmes domotiques.",
      },
    ],
    reassurances: [
      "Devis gratuit et détaillé sous 48 h",
      "Interventions sans sous-traitance — un seul interlocuteur",
      "Attestation Consuel fournie après chaque mise aux normes",
      "Norme NF C 15-100 rigoureusement respectée",
    ],
    faq: [
      {
        q: "Qu'est-ce que la norme NF C 15-100 ?",
        a: "C'est la norme française qui définit les règles de sécurité pour les installations électriques basses tension dans les logements (nombre de circuits, protections, mise à la terre, etc.). Elle est obligatoire pour toute installation neuve ou rénovée.",
      },
      {
        q: "Ai-je besoin d'une attestation Consuel pour vendre mon logement ?",
        a: "Non, le diagnostic électrique (DDT) suffit pour la vente. L'attestation Consuel est en revanche obligatoire pour le raccordement d'un logement neuf ou la remise en service d'un compteur coupé. Elle prouve la conformité de l'installation.",
      },
      {
        q: "Combien coûte la rénovation d'un tableau électrique ?",
        a: "Le tarif dépend du nombre de circuits et du type de tableau. Pour un logement standard (T3-T4), comptez entre 800 et 1 800 euros fournitures et pose incluses. Nous établissons un devis précis après visite.",
      },
      {
        q: "Pouvez-vous intervenir en urgence ?",
        a: "Oui. Pour les pannes bloquantes (coupure générale, court-circuit dangereux), nous organisons une intervention dans les meilleurs délais. Appelez directement le 06 50 04 52 33 pour évaluer la situation.",
      },
      {
        q: "Intervenez-vous uniquement à Paris ou aussi en banlieue ?",
        a: "Nous couvrons Paris et toute la zone ouest : Boulogne-Billancourt, Neuilly-sur-Seine, Levallois-Perret, Vincennes, Montreuil, Saint-Maur-des-Fossés, Issy-les-Moulineaux et Courbevoie.",
      },
      {
        q: "Faut-il couper l'électricité toute la journée pour une rénovation de tableau ?",
        a: "La coupure est nécessaire pendant l'intervention sur le tableau lui-même, généralement 3 à 5 heures. Nous planifions l'intervention pour minimiser la gêne et vous prévenons à l'avance.",
      },
    ],
    galleryKeys: ["tableauElectrique", "cablage", "heroElectricien"],
  },

  {
    slug: "salle-de-bain",
    metaTitle: "Rénovation salle de bain Paris — douche italienne, PMR",
    metaDescription:
      "Rénovation complète de salle de bain à Paris : douche à l'italienne, adaptation PMR, plomberie et carrelage. Un seul artisan, devis gratuit.",
    heroImageKey: "sdbApres",
    serviceType: "Bathroom renovation",
    intro: [
      "La salle de bain est l'une des pièces qui prend le plus de valeur lors d'une rénovation bien menée. Chez AH ELEC RENOV, nous réalisons la rénovation complète de votre salle de bain, de la dépose des anciens équipements jusqu'aux finitions, sans faire appel à d'autres corps de métier.",
      "Douche à l'italienne, baignoire, mobilier suspendu, carrelage grand format : nous vous accompagnons dès la conception pour choisir des solutions adaptées à votre surface, à votre usage et à votre budget. Pour les personnes à mobilité réduite ou les seniors, nous proposons des aménagements PMR (Personnes à Mobilité Réduite) conformes aux recommandations en vigueur.",
      "Plomberie, électricité, carrelage et finitions sont gérés par le même artisan. Vous avez un seul interlocuteur, un calendrier clair et un chantier propre, livré dans les délais convenus.",
    ],
    prestations: [
      {
        title: "Rénovation complète clé en main",
        text: "Dépose de l'existant, redistribution si nécessaire, plomberie, électricité, carrelage sol et mur, pose des équipements sanitaires et finitions. Un seul devis pour tout.",
      },
      {
        title: "Douche à l'italienne",
        text: "Création d'une douche à l'italienne avec receveur extra-plat ou sol de niveau fini. Traitement de l'étanchéité par membrane sous-carrelage, siphon de sol, paroi sur mesure.",
      },
      {
        title: "Aménagement PMR et senior",
        text: "Barre d'appui, siège de douche intégré, receveur extra-plat facilitant l'accès, robinetterie thermostatique. Réalisations conformes aux normes d'accessibilité.",
      },
      {
        title: "Plomberie complète",
        text: "Déplacement ou création des arrivées et évacuations d'eau. Remplacement des canalisations vétustes, installation de robinetterie et siphons de qualité.",
      },
      {
        title: "Électricité salle de bain",
        text: "Câblage conforme aux zones réglementaires (NF C 15-100), sèche-serviette électrique, éclairage led encastré IP44, prises sécurisées hors zones d'eau.",
      },
      {
        title: "Carrelage et faïence",
        text: "Pose de carrelage grand format, faïence murale, mosaïque. Découpe précise, joints soignés, bandes d'étanchéité sur les angles sensibles.",
      },
      {
        title: "Mobilier suspendu et rangements",
        text: "Pose de meubles sous-vasque, miroir avec éclairage intégré, colonnes de rangement. Conseil pour optimiser l'espace, même dans les petites salles de bain.",
      },
    ],
    reassurances: [
      "Devis gratuit avec plan et sélection de matériaux",
      "Plomberie, électricité et carrelage réunis chez un seul artisan",
      "Aménagements PMR disponibles sur demande",
      "Chantier propre, protégé et livré en temps et en heure",
    ],
    faq: [
      {
        q: "Combien de temps dure une rénovation complète de salle de bain ?",
        a: "Pour une salle de bain standard (4 à 7 m²), comptez 5 à 10 jours ouvrés selon l'ampleur des travaux de plomberie et la superficie à carreler. Nous vous communiquons un planning précis avant le démarrage.",
      },
      {
        q: "Peut-on installer une douche à l'italienne dans un appartement ancien ?",
        a: "Oui, dans la grande majorité des cas. Il faut néanmoins vérifier la hauteur de plancher disponible pour le siphon de sol et s'assurer que les évacuations existantes permettent la modification. Nous réalisons ce diagnostic lors de la visite.",
      },
      {
        q: "Quels matériaux proposez-vous ?",
        a: "Nous travaillons avec des fournisseurs professionnels et proposons une large gamme de carrelages, robinetteries et meubles. Vous pouvez également fournir vos propres matériaux sous réserve de validation technique.",
      },
      {
        q: "La salle de bain sera-t-elle inutilisable pendant tout le chantier ?",
        a: "Oui, la salle de bain est hors service pendant les travaux. Si vous n'avez qu'une seule salle d'eau, nous prévoyons le chantier sur des semaines consécutives pour limiter l'inconfort et, si besoin, nous organisons une solution transitoire.",
      },
      {
        q: "Intervenez-vous aussi pour une simple réparation de plomberie ?",
        a: "Oui. Au-delà des rénovations complètes, nous prenons en charge les remplacements de robinetterie, les fuites sous évier, le remplacement de joints de baignoire ou les petites réparations de faïence.",
      },
    ],
    galleryKeys: ["sdbApres", "doucheItalienne", "sdbAvant"],
  },

  {
    slug: "cuisine",
    metaTitle: "Aménagement cuisine Paris — électricité & plomberie incluses",
    metaDescription:
      "Aménagement de cuisine sur mesure à Paris : pose de meubles, électricité aux normes, raccordements plomberie. Devis gratuit, secteur région parisienne.",
    heroImageKey: "cuisineModerne",
    serviceType: "Kitchen renovation",
    intro: [
      "La cuisine est la pièce la plus technique de la maison : elle concentre à la fois les circuits électriques dédiés (four, plaque, hotte, réfrigérateur), les alimentations en eau et les évacuations. Une mauvaise installation crée des pannes répétées, des risques électriques et une cuisine difficile à vivre au quotidien.",
      "AH ELEC RENOV intervient sur l'ensemble des corps de métier nécessaires à l'aménagement d'une cuisine : pose de meubles et façades, câblage électrique aux normes, raccordements plomberie et finitions. Pas de coordination à gérer entre plusieurs artisans, pas de délais qui s'accumulent.",
      "Que vous renoviez une cuisine existante ou créiez un espace cuisine dans une pièce à aménager, nous vous proposons un devis détaillé après visite, incluant les fournitures si vous le souhaitez.",
    ],
    prestations: [
      {
        title: "Pose de meubles et plan de travail",
        text: "Installation de meubles bas, hauts et colonnes, fixation murale sécurisée, découpe et pose du plan de travail (stratifié, compact, quartz selon votre choix), installation de l'évier.",
      },
      {
        title: "Électricité aux normes cuisine",
        text: "Création de circuits dédiés pour four encastré, plaque de cuisson, hotte, lave-vaisselle et réfrigérateur, conformément à la norme NF C 15-100. Ajout de prises 16 A protégées par différentiel.",
      },
      {
        title: "Raccordements plomberie",
        text: "Alimentation et évacuation de l'évier, raccordement du lave-vaisselle et du lave-linge si présent. Remplacement des robinets d'arrêt et mise en conformité des flexibles.",
      },
      {
        title: "Hotte et ventilation",
        text: "Pose de hotte aspirante avec conduit d'extraction ou en version recyclage. Percement si nécessaire, raccordement électrique et test de débit.",
      },
      {
        title: "Crédence et carrelage",
        text: "Pose de crédence carrelage ou verre laqué entre le plan de travail et les meubles hauts. Finition soignée aux angles et joints étanches sur toutes les jonctions humides.",
      },
      {
        title: "Éclairage plan de travail",
        text: "Éclairage led intégré sous meubles hauts pour éclairer la zone de préparation. Câblage propre dissimulé, interrupteur indépendant ou commande sur variateur.",
      },
      {
        title: "Remplacement partiel et réparations",
        text: "Vous n'avez pas besoin d'une cuisine complète ? Nous remplaçons un plan de travail, un évier, une plaque ou réparons un circuit défaillant sans refaire toute la cuisine.",
      },
    ],
    reassurances: [
      "Électricité, plomberie et pose : un seul artisan",
      "Circuits dédiés conformes NF C 15-100",
      "Devis gratuit, matériaux fournis ou non selon votre préférence",
      "Aucune sous-traitance, planning tenu",
    ],
    faq: [
      {
        q: "Faut-il un circuit électrique dédié pour chaque gros appareil ?",
        a: "Oui. La norme NF C 15-100 impose des circuits séparés pour le four, la plaque de cuisson, le réfrigérateur et le lave-vaisselle. Cela évite les surcharges et les déclenchements intempestifs du disjoncteur général.",
      },
      {
        q: "Peut-on déplacer l'évier dans une autre position ?",
        a: "Oui, à condition qu'une évacuation soit possible à moins de 3 mètres du siphon (ou en utilisant un broyeur). Nous évaluons la faisabilité lors de la visite de chantier.",
      },
      {
        q: "Proposez-vous la fourniture des meubles de cuisine ?",
        a: "Nous pouvons vous conseiller et sourcer des meubles auprès de nos fournisseurs. Vous pouvez aussi commander votre cuisine chez Ikea ou un cuisiniste et nous charger uniquement de la pose, de l'électricité et de la plomberie.",
      },
      {
        q: "Combien de temps dure l'aménagement d'une cuisine ?",
        a: "Une cuisine complète (dépose, plomberie, électricité, pose et finitions) prend généralement 4 à 7 jours ouvrés. Nous vous communiquons un planning détaillé avant démarrage.",
      },
      {
        q: "Gérez-vous aussi la ventilation mécanique (VMC) ?",
        a: "Oui. Si votre logement dispose d'une VMC simple ou double flux, nous pouvons raccorder la bouche d'extraction de la cuisine et nous assurer du bon débit conformément aux exigences réglementaires.",
      },
    ],
    galleryKeys: ["cuisineModerne", "cuisine3", "cuisineAvant"],
  },

  {
    slug: "plomberie",
    metaTitle: "Plombier à Paris — installation, rénovation, dépannage",
    metaDescription:
      "Plomberie à Paris et en Île-de-France : installation neuve, rénovation de réseau, dépannage et remplacement de sanitaires. Devis gratuit.",
    heroImageKey: "plomberie",
    serviceType: "Plumbing services",
    intro: [
      "Une fuite d'eau non traitée abîme les structures, gâche les finitions et gonfle les factures. Chez AH ELEC RENOV, nous prenons en charge les travaux de plomberie dans leur intégralité, qu'il s'agisse d'une installation neuve lors d'une rénovation, d'un remplacement d'équipements vétustes ou d'un dépannage urgent.",
      "Notre approche est différente d'un plombier exclusif : comme nous intervenons aussi sur l'électricité et la rénovation complète, nous pouvons coordonner les deux corps de métier sans friction. Lors d'une rénovation de salle de bain ou d'une cuisine, cela évite les temps d'attente entre les interventions et les problèmes de communication entre artisans.",
      "Nous intervenons à Paris et dans toute l'Île-de-France (Boulogne-Billancourt, Neuilly, Levallois-Perret, Vincennes, Montreuil, Charbonnières). Devis gratuit, travaux proprement exécutés, garantie décennale.",
    ],
    prestations: [
      {
        title: "Installation plomberie neuve",
        text: "Création complète des réseaux d'eau chaude, eau froide et évacuations pour un logement neuf ou une pièce entièrement réaménagée. Choix des matériaux adaptés (multicouche, cuivre, PVC).",
      },
      {
        title: "Rénovation de réseau existant",
        text: "Remplacement des canalisations en plomb ou acier galvanisé par des matériaux modernes (multicouche, cuivre). Amélioration du débit et suppression des risques de corrosion.",
      },
      {
        title: "Remplacement de sanitaires",
        text: "Dépose et remplacement de WC, lavabo, baignoire, douche, évier. Adaptation aux nouvelles dimensions si nécessaire, raccordements conformes et test d'étanchéité.",
      },
      {
        title: "Robinetterie et mitigeurs",
        text: "Remplacement de robinets goutte-à-goutte ou vétustes, pose de mitigeurs thermostatiques, installation de robinets d'arrêt accessibles sous chaque appareil.",
      },
      {
        title: "Dépannage et urgences",
        text: "Localisation et réparation de fuites, débouchage de canalisations, remplacement de joints de chasse ou de siphon. Intervention rapide sur le secteur de Paris et l'Île-de-France.",
      },
      {
        title: "Chauffe-eau et ballon d'eau chaude",
        text: "Remplacement de chauffe-eau électrique (cumulus) ou à gaz, pose d'un chauffe-eau thermodynamique (PAC air/eau). Raccordements plomberie et électricité réalisés ensemble.",
      },
    ],
    reassurances: [
      "Plomberie et électricité coordonnées par le même artisan",
      "Dépannage réactif sur Paris et l'Île-de-France",
      "Matériaux de qualité professionnelle (cuivre, multicouche, PVC)",
      "Devis gratuit avant toute intervention",
    ],
    faq: [
      {
        q: "Comment savoir si j'ai une fuite cachée ?",
        a: "Les indices courants sont une facture d'eau anormalement élevée, des traces d'humidité sur un plafond ou une cloison, ou une mauvaise odeur persistante. Nous réalisons un diagnostic (écoute de réseau, test de pression) pour localiser la fuite sans démolir inutilement.",
      },
      {
        q: "Peut-on encore poser des canalisations en plomb ?",
        a: "Non. Le plomb est interdit dans les installations nouvelles depuis 1995 et interdit à la distribution d'eau potable depuis 2013. Si votre logement est ancien, nous vous recommandons de remplacer les tronçons en plomb encore présents.",
      },
      {
        q: "Prenez-vous en charge le remplacement du chauffe-eau ?",
        a: "Oui. Nous assurons la dépose de l'ancien appareil, la pose du nouveau, les raccordements plomberie et électricité, et le test de mise en service. Nous pouvons aussi conseiller sur le dimensionnement (volume, technologie).",
      },
      {
        q: "Quelle est la différence entre cuivre et multicouche pour les canalisations ?",
        a: "Le cuivre est très durable et résistant aux températures élevées, mais plus coûteux. Le multicouche (tube aluminium gainé de plastique) est plus rapide à poser, résistant à la corrosion et adapté au chauffage comme à l'eau sanitaire. Nous choisissons le matériau le mieux adapté à votre configuration.",
      },
      {
        q: "Intervenez-vous pour le débouchage de canalisation ?",
        a: "Oui, nous prenons en charge les débouchages courants (lavabo, WC, douche bouchée). Pour les obstructions profondes sur la colonne générale, nous disposons du matériel de furetage adapté.",
      },
    ],
    galleryKeys: ["plomberie", "plomberie2"],
  },

  {
    slug: "renovation-interieure",
    metaTitle: "Rénovation intérieure Paris — clé en main, A à Z",
    metaDescription:
      "Rénovation intérieure à Paris et en Île-de-France : aménagement, isolation, cloisons, peinture et coordination complète. Un seul artisan. Devis gratuit.",
    heroImageKey: "renovationChantier",
    serviceType: "Interior renovation",
    intro: [
      "Une rénovation intérieure réussie exige de la coordination : chaque corps de métier doit intervenir dans le bon ordre, sans temps mort ni chevauchement. Chez AH ELEC RENOV, nous pilotons l'ensemble du chantier, de la démolition aux finitions, en intégrant l'électricité et la plomberie que nous réalisons nous-mêmes.",
      "Cloisons, isolation thermique et acoustique, peinture, revêtements de sol : nous mettons en oeuvre les solutions adaptées à votre projet, que vous rénoviez un appartement entier, une chambre, un couloir ou un espace de vie. Pas de sous-traitance, pas de problème d'interface entre artisans.",
      "Situés à Paris 15e, nous intervenons sur Paris et dans toute l'Île-de-France. Chaque projet commence par une visite gratuite et un devis détaillé, sans engagement. Vous savez exactement ce qui est prévu, dans quel ordre, et pour quel budget.",
    ],
    prestations: [
      {
        title: "Aménagement intérieur global",
        text: "Refonte complète d'un appartement ou d'une maison : redistribution des pièces, ouvertures dans les cloisons non porteuses, création de nouvelles pièces. Étude de faisabilité incluse.",
      },
      {
        title: "Cloisons et placo",
        text: "Pose de cloisons en plaques de plâtre sur ossature métallique. Cloisons phoniques (laine de roche + double plaque), cloisons humides pour salles de bain. Saignées pour passages de gaines.",
      },
      {
        title: "Isolation thermique et phonique",
        text: "Isolation des murs par l'intérieur (doublage), isolation des planchers et des combles. Matériaux adaptés à votre objectif (laine de verre, laine de roche, panneaux rigides).",
      },
      {
        title: "Peinture et finitions",
        text: "Préparation des supports (rebouchage, ponçage, impression), application de peinture en deux couches. Finitions soignées aux angles, plinthe et baguettes d'angle.",
      },
      {
        title: "Revêtements de sol",
        text: "Pose de parquet stratifié ou contrecollé, carrelage, vinyle LVT sur des surfaces parfaitement préparées. Consultation sur les choix de matériaux en fonction du trafic et de l'ambiance souhaitée.",
      },
      {
        title: "Faux plafonds",
        text: "Création de faux plafonds en placo pour habiller des réseaux, corriger la hauteur d'une pièce ou intégrer un éclairage led encastré. Traitement acoustique intégré possible.",
      },
      {
        title: "Électricité intégrée au chantier",
        text: "Câblage réalisé au bon moment, avant fermeture des cloisons, pour éviter les reprises. Tableau, circuits, prises et éclairages planifiés dès la conception.",
      },
      {
        title: "Coordination et suivi de chantier",
        text: "Planning détaillé fourni avant démarrage. Point hebdomadaire avec vous, photos d'avancement. Pour les projets plus importants, coordination des éventuels intervenants spécialisés (parqueteur, carreleur).",
      },
    ],
    reassurances: [
      "Un seul interlocuteur du début à la fin",
      "Électricité et plomberie intégrées au chantier, sans coordination externe",
      "Devis détaillé avec planning avant démarrage",
      "Chantier propre, protections posées dès le premier jour",
    ],
    faq: [
      {
        q: "Par quoi commencer pour une rénovation complète d'appartement ?",
        a: "Par une visite de chantier. Nous évaluons l'état général du logement (électricité, plomberie, état des cloisons, isolation), discutons de vos priorités et vous remettons un devis phase par phase. Vous choisissez ensuite ce que vous faites faire et dans quel ordre.",
      },
      {
        q: "Faites-vous appel à des sous-traitants ?",
        a: "Non. Nous réalisons nous-mêmes l'électricité, la plomberie, les cloisons et la peinture. Pour des spécialités très pointues (parquet massif, marbrerie), nous pouvons faire appel à des partenaires de confiance, mais toujours sous notre responsabilité et avec votre accord préalable.",
      },
      {
        q: "Peut-on rénover un logement occupé ?",
        a: "Oui, c'est possible pièce par pièce. Nous planifions le chantier pour libérer une pièce complète avant de passer à la suivante, en protégeant les espaces non touchés (bâches, sas de chantier).",
      },
      {
        q: "Proposez-vous un accompagnement pour le choix des matériaux ?",
        a: "Oui. Lors de la phase de devis, nous vous présentons des gammes de matériaux adaptées à votre budget et à l'ambiance souhaitée (peintures, revêtements de sol, carrelage). Vous prenez les décisions, nous apportons notre expertise technique.",
      },
      {
        q: "Comment est calculé le prix d'une rénovation intérieure ?",
        a: "Le prix dépend de la surface, de l'état initial du logement et des prestations choisies. Un appartement T3 à rénover complètement (cloisons, électricité, peinture, sols) se situe généralement entre 15 000 et 35 000 euros. Nous détaillons chaque poste dans le devis.",
      },
      {
        q: "Peut-on bénéficier d'aides pour la rénovation ?",
        a: "Certains travaux d'isolation peuvent ouvrir droit à MaPrimeRénov' si l'artisan est reconnu RGE. Nous vous informons sur les aides disponibles lors de la visite et, si vous êtes éligible, nous vous orientons vers les démarches à effectuer.",
      },
    ],
    galleryKeys: [
      "renovationChantier",
      "peinture",
      "interieurRenove",
      "interieur2",
    ],
  },
];

export function getBySlug(slug: string): ServiceContent | undefined {
  return servicesContent.find((s) => s.slug === slug);
}
