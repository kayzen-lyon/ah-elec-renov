"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  QrCode,
  X,
  Download,
  Phone,
  Mail,
  Navigation,
  Star,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import { company, displayLocation, mapsDirectionsUrl } from "@/content/company";

export type ContactQR = {
  site: string;
  maps: string;
  avis: string | null;
};

function QrTile({
  svg,
  label,
  icon,
}: {
  svg: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <figure className="flex flex-col items-center gap-2 rounded-xl border border-line bg-white p-3">
      <div
        className="h-24 w-24 [&_svg]:h-full [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
        aria-hidden
      />
      <figcaption className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-anthracite">
        {icon}
        {label}
      </figcaption>
    </figure>
  );
}

export function ContactCard({
  qr,
  variant = "header",
}: {
  qr: ContactQR;
  /** `icon` = bouton carré (header desktop, où la place est comptée). */
  variant?: "header" | "inline" | "icon";
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Le dialogue est rendu dans <body> : le header porte un backdrop-filter,
     qui ferait de lui le bloc conteneur d'un `position: fixed` (le voile ne
     couvrirait que la barre). */
  useEffect(() => {
    setMounted(true);
  }, []);
  const hasPhone = Boolean(company.contact.phone);
  const hasEmail = Boolean(company.contact.email);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={variant === "icon" ? "Carte de contact" : undefined}
        title={variant === "icon" ? "Carte de contact" : undefined}
        className={cn(
          "press inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
          variant === "header" &&
            "h-11 border-2 border-anthracite/15 px-4 text-sm text-anthracite hover:border-copper hover:text-copper",
          variant === "icon" &&
            "h-11 w-11 border border-line bg-white text-anthracite hover:border-copper hover:text-copper",
          variant === "inline" &&
            "h-12 bg-anthracite px-6 text-sm text-cream hover:bg-anthracite-700",
        )}
      >
        <QrCode
          className={variant === "icon" ? "h-[18px] w-[18px]" : "h-4 w-4"}
        />
        {variant !== "icon" && "Carte de contact"}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={spring.fade}
                onClick={() => setOpen(false)}
                role="dialog"
                aria-modal="true"
                aria-label="Carte de contact numérique"
              >
                <motion.div
                  ref={panelRef}
                  className="w-full max-w-md overflow-hidden rounded-t-2xl bg-cream shadow-band sm:rounded-2xl"
                  /* Même chemin à l'aller et au retour (cohérence spatiale) ;
                 échelle + opacité seulement : compositable, pas de raster par image. */
                  initial={{ y: 32, opacity: 0, scale: 0.97 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 32, opacity: 0, scale: 0.97 }}
                  transition={spring.ui}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* En-tête sombre */}
                  <div className="relative bg-anthracite px-6 py-6 text-cream">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Fermer"
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-cream/70 hover:bg-cream/10 hover:text-cream"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-300">
                      Carte de contact
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-bold">
                      {company.legalName}
                    </h2>
                    <p className="mt-1 text-sm text-cream/70">
                      {company.director} · {displayLocation}
                    </p>
                  </div>

                  <div className="space-y-5 px-6 py-6">
                    {/* Action vCard */}
                    <a
                      href="/contact.vcf"
                      className="press flex w-full items-center justify-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-cream copper-glow"
                      download
                    >
                      <Download className="h-4 w-4" />
                      Ajouter à mes contacts (vCard)
                    </a>

                    {/* Actions rapides */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-medium">
                      {hasPhone ? (
                        <a
                          href={company.contact.phoneHref}
                          className="press flex flex-col items-center gap-1.5 rounded-xl border border-line bg-white py-3 text-anthracite hover:border-copper"
                        >
                          <Phone className="h-4 w-4 text-copper" />
                          Appeler
                        </a>
                      ) : null}
                      {hasEmail ? (
                        <a
                          href={`mailto:${company.contact.email}`}
                          className="press flex flex-col items-center gap-1.5 rounded-xl border border-line bg-white py-3 text-anthracite hover:border-copper"
                        >
                          <Mail className="h-4 w-4 text-copper" />
                          Email
                        </a>
                      ) : null}
                      <a
                        href={mapsDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press flex flex-col items-center gap-1.5 rounded-xl border border-line bg-white py-3 text-anthracite hover:border-copper"
                      >
                        <Navigation className="h-4 w-4 text-copper" />
                        Itinéraire
                      </a>
                    </div>

                    {/* QR codes */}
                    <div>
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                        Scanner
                      </p>
                      <div
                        className={cn(
                          "grid gap-3",
                          qr.avis ? "grid-cols-3" : "grid-cols-2",
                        )}
                      >
                        <QrTile
                          svg={qr.site}
                          label="Site"
                          icon={<Globe className="h-3 w-3 text-copper" />}
                        />
                        <QrTile
                          svg={qr.maps}
                          label="Plan"
                          icon={<Navigation className="h-3 w-3 text-copper" />}
                        />
                        {qr.avis && (
                          <QrTile
                            svg={qr.avis}
                            label="Avis"
                            icon={<Star className="h-3 w-3 text-copper" />}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
