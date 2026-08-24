import Link from "next/link";
import { Phone, MessageSquareText } from "lucide-react";
import { company, hasPhone } from "@/content/company";

/**
 * Barre d'action mobile : les deux seules sorties du funnel restent à portée
 * de pouce en permanence — appeler, ou ouvrir le formulaire centralisé.
 */
export function MobileFAB() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-anthracite-500 bg-ink/95 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-2.5 px-4 py-3">
        {hasPhone && (
          <a
            href={company.contact.phoneHref}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-copper px-4 py-3.5 text-sm font-bold text-cream"
          >
            <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            Appeler maintenant
          </a>
        )}
        <Link
          href="/urgence"
          className="flex items-center justify-center gap-2 rounded-full border border-cream/25 px-5 py-3.5 text-sm font-semibold text-cream"
        >
          <MessageSquareText className="h-4 w-4" aria-hidden />
          <span className="sr-only">Demander une intervention</span>
          <span aria-hidden>Demander</span>
        </Link>
      </div>
    </div>
  );
}
