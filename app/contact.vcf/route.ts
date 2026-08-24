import { company } from "@/content/company";

/**
 * vCard 3.0 téléchargeable (« Ajouter à mes contacts »). Construite depuis
 * content/company.ts — les champs vides (tél/email) sont omis tant qu'ils ne
 * sont pas renseignés.
 */
export function GET() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${company.director};;;;`,
    `FN:${company.director}`,
    `ORG:${company.legalName}`,
    `TITLE:${company.directorRole} — Électricité & rénovation intérieure`,
  ];

  if (company.contact.phone) {
    const tel = company.contact.phoneHref.replace("tel:", "") || company.contact.phone;
    lines.push(`TEL;TYPE=CELL,VOICE:${tel}`);
  }
  if (company.contact.phoneFixed) {
    const tel =
      company.contact.phoneFixedHref.replace("tel:", "") ||
      company.contact.phoneFixed;
    lines.push(`TEL;TYPE=WORK,VOICE:${tel}`);
  }
  if (company.contact.email) {
    lines.push(`EMAIL;TYPE=WORK:${company.contact.email}`);
  }

  lines.push(
    `ADR;TYPE=WORK:;;;Paris;Île-de-France;;France`,
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahelecrenov.fr";
  lines.push(`URL:${siteUrl}`);
  lines.push(`NOTE:Dépannage électrique d'urgence 24h/24, recherche de panne, tableau électrique, mise aux normes NF C 15-100. Paris et Île-de-France.`);
  lines.push("END:VCARD");

  const body = lines.join("\r\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="ah-elec-renov.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
