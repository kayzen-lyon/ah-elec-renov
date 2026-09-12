"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useDragControls,
  type PanInfo,
} from "framer-motion";
import { ChevronDown, Menu, Phone, X, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContactCard, type ContactQR } from "@/components/contact/ContactCard";
import { MegaPanelContent } from "@/components/site/MegaMenu";
import { headerNav, type HeaderNavItem } from "@/content/menu";
import { company, hasPhone } from "@/content/company";
import { promesse } from "@/content/urgence";

const MOBILE_SHEET_ID = "menu-mobile";

/* ------------------------------------------------------------------ */
/*  Bandeau d'urgence                                                  */
/* ------------------------------------------------------------------ */

/** Le numéro reste visible dès le premier pixel ; le bandeau se replie au scroll. */
function UrgenceBar({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-ink text-cream transition-[height,opacity] duration-300 ease-out",
        collapsed ? "h-0 opacity-0" : "h-10 opacity-100",
      )}
      aria-hidden={collapsed}
    >
      <Container className="flex h-10 items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-xs font-semibold">
          <Zap
            className="h-3.5 w-3.5 text-copper-300"
            strokeWidth={2.5}
            aria-hidden
          />
          <span className="hidden sm:inline">
            Dépannage électrique {promesse.disponibilite}
          </span>
          <span className="sm:hidden">Urgence 24h/24</span>
        </p>
        {hasPhone && (
          <a
            href={company.contact.phoneHref}
            tabIndex={collapsed ? -1 : undefined}
            className="tabular flex items-center gap-1.5 whitespace-nowrap text-xs font-bold text-copper-300 transition-colors hover:text-cream"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
            {company.contact.phone}
          </a>
        )}
      </Container>
    </div>
  );
}

/** Libellé de rubrique : version courte < 1280 px, complète au-delà. */
function NavLabel({ item }: { item: HeaderNavItem }) {
  if (!item.short) return <>{item.label}</>;
  return (
    <>
      <span className="xl:hidden">{item.short}</span>
      <span className="hidden xl:inline">{item.label}</span>
    </>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="press flex shrink-0 items-center gap-2.5"
      aria-label="Accueil"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-anthracite font-display text-base font-extrabold text-copper-300">
        AH
      </span>
      <span className="whitespace-nowrap font-display text-lg font-bold leading-none text-anthracite">
        AH ELEC<span className="text-copper"> RENOV</span>
      </span>
    </Link>
  );
}

/** Pastille pulsée de l'entrée d'urgence (pulsation retirée en mouvement réduit). */
function LivePulse({ className }: { className?: string }) {
  return (
    <span
      className={cn("relative flex h-2 w-2 shrink-0", className)}
      aria-hidden
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-copper" />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

export function Header({ qr }: { qr: ContactQR }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  /** Poignée de la feuille : distingue un appui d'un glissement (cf. onClick). */
  const handleGesture = useRef({ startY: 0, moved: false });
  const sheetDrag = useDragControls();

  /* --- Scroll : le bandeau se replie, le header se densifie --- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- Changement de page : on referme tout --- */
  useEffect(() => {
    setOpenKey(null);
    setMobileOpen(false);
  }, [pathname]);

  /* --- Feuille fermée : l'accordéon repart plié à la prochaine ouverture --- */
  useEffect(() => {
    if (!mobileOpen) setMobileSection(null);
  }, [mobileOpen]);

  /* --- Échap : ferme UNE couche à la fois et rend le focus au déclencheur --- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      /* Un dialogue au-dessus (carte de contact) gère lui-même Échap. */
      if (
        document.querySelector(
          `[role="dialog"][aria-modal="true"]:not(#${MOBILE_SHEET_ID})`,
        )
      ) {
        return;
      }
      if (mobileOpen) {
        setMobileOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (openKey) {
        setOpenKey(null);
        document.getElementById(`nav-${openKey}`)?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, openKey]);

  /* --- Menu mobile ouvert : on bloque le défilement de la page --- */
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  /** Petite latence : évite le clignotement quand on traverse la barre. */
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenKey(null), 140);
  }, [cancelClose]);

  const openPanel = useCallback(
    (key: string) => {
      cancelClose();
      setOpenKey(key);
    },
    [cancelClose],
  );

  /** Ouvre au survol souris seulement : au doigt, `pointerenter` précède le
   *  clic et les deux s'annuleraient (ouvert puis refermé dans le même tap). */
  const onHoverOpen = (key: string) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") openPanel(key);
  };
  const onHoverClose = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") scheduleClose();
  };

  /** Flèche bas : ouvre ET déplace le focus dans le panneau (le panneau est
   *  après les actions dans le DOM, Tab seul y arriverait trop tard). */
  const onArrowDown = (key: string) => (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown") return;
    e.preventDefault();
    openPanel(key);
    requestAnimationFrame(() => {
      document
        .getElementById(`megamenu-${key}`)
        ?.querySelector<HTMLElement>("a[href]")
        ?.focus();
    });
  };

  /**
   * Fin de glissement sur la feuille mobile : la décision se prend au SIGNE
   * de la vitesse, pas à la position. Un flick vers le haut ferme même si le
   * doigt n'a parcouru que quelques pixels ; un glissement lent doit aller
   * plus loin. Sinon le ressort ramène la feuille en place.
   */
  const onSheetDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (!mobileOpen) return;
      if (info.velocity.y < -250 || info.offset.y < -90) setMobileOpen(false);
    },
    [mobileOpen],
  );

  const isActive = (item: HeaderNavItem) =>
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  const activePanel = headerNav.find((i) => i.key === openKey)?.panel ?? null;

  return (
    <header
      className={cn(
        /* Couche translucide : le contenu défile dessous. L'effet de bord
           n'apparaît que lorsque du contenu passe réellement sous la barre. */
        "material-light sticky top-0 z-50 transition-shadow duration-200",
        scrolled && !openKey && !mobileOpen && "scroll-edge",
      )}
      onPointerLeave={onHoverClose}
      /* Le focus quitte le header (Tab jusqu'au contenu, clic ailleurs) :
         on referme, sinon un panneau ouvert au clavier resterait affiché. */
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOpenKey(null);
        }
      }}
    >
      <UrgenceBar collapsed={scrolled} />

      <Container className="flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />

        {/* ---------- Navigation desktop ---------- */}
        <nav
          className="hidden h-full items-center gap-1 lg:flex"
          aria-label="Principale"
        >
          {headerNav.map((item) => {
            const open = openKey === item.key;
            return item.panel ? (
              <button
                key={item.key}
                type="button"
                id={`nav-${item.key}`}
                aria-haspopup="true"
                aria-expanded={open}
                aria-controls={open ? `megamenu-${item.key}` : undefined}
                onPointerEnter={onHoverOpen(item.key)}
                onClick={() =>
                  setOpenKey((k) => (k === item.key ? null : item.key))
                }
                onKeyDown={onArrowDown(item.key)}
                className={cn(
                  "press relative flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors duration-200 xl:px-3.5",
                  open || isActive(item)
                    ? "text-copper"
                    : "text-anthracite/80 hover:text-anthracite",
                )}
              >
                <NavLabel item={item} />
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={spring.snappy}
                  className="flex"
                  aria-hidden
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </motion.span>
                {/* Un seul soulignement partagé : il glisse d'une rubrique à
                    l'autre au lieu de disparaître puis réapparaître. */}
                {open && (
                  <motion.span
                    layoutId="nav-underline"
                    transition={spring.snappy}
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-copper xl:inset-x-3.5"
                    aria-hidden
                  />
                )}
              </button>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                onPointerEnter={onHoverClose}
                className={cn(
                  "press flex h-11 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 text-sm font-semibold transition-colors duration-200",
                  isActive(item)
                    ? "border-copper/40 bg-copper/10 text-copper"
                    : "border-line bg-white text-anthracite hover:border-copper/40 hover:text-copper",
                )}
              >
                <LivePulse />
                <NavLabel item={item} />
              </Link>
            );
          })}
        </nav>

        {/* ---------- Actions desktop ---------- */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {/* Sous 1280 px la place manque : QR masqué, numéro réduit à l'icône. */}
          <span className="hidden xl:inline-flex">
            <ContactCard qr={qr} variant="icon" />
          </span>
          {hasPhone && (
            <>
              <a
                href={company.contact.phoneHref}
                aria-label={`Appeler le ${company.contact.phone}`}
                title={company.contact.phone}
                className="press inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-anthracite/20 text-anthracite transition-colors hover:border-copper hover:text-copper xl:hidden"
              >
                <Phone className="h-[18px] w-[18px]" aria-hidden />
              </a>
              <ButtonLink
                href={company.contact.phoneHref}
                variant="outline"
                className="tabular hidden whitespace-nowrap px-4 xl:inline-flex"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                {company.contact.phone}
              </ButtonLink>
            </>
          )}
          <Button
            href="/urgence"
            variant="copper"
            className="whitespace-nowrap px-5"
          >
            Intervention {promesse.delaiCourt}
          </Button>
        </div>

        {/* ---------- Déclencheurs mobile ---------- */}
        <div className="flex items-center gap-2 lg:hidden">
          {hasPhone && (
            <a
              href={company.contact.phoneHref}
              aria-label={`Appeler le ${company.contact.phone}`}
              className="press inline-flex h-11 w-11 items-center justify-center rounded-full bg-copper text-cream"
            >
              <Phone
                className="h-[18px] w-[18px]"
                strokeWidth={2.4}
                aria-hidden
              />
            </a>
          )}
          <button
            ref={burgerRef}
            type="button"
            className="press inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-anthracite"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            aria-controls={mobileOpen ? MOBILE_SHEET_ID : undefined}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </Container>

      {/* ---------- Méga-panneau desktop ----------
          L'enveloppe reste montée tant qu'une rubrique est ouverte : passer de
          « Services » à « Zone » fait un fondu croisé du contenu, sans que le
          panneau ne redescende à chaque fois. Entrée et sortie empruntent le
          même chemin, ancré au bord bas du header. */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            key="mega-shell"
            role="region"
            aria-labelledby={openKey ? `nav-${openKey}` : undefined}
            id={openKey ? `megamenu-${openKey}` : undefined}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={spring.ui}
            onPointerEnter={cancelClose}
            className="absolute inset-x-0 top-full hidden border-t border-line/70 bg-cream shadow-band lg:block"
          >
            <Container className="relative">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={openKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={spring.fade}
                >
                  <MegaPanelContent
                    panel={activePanel}
                    onNavigate={() => setOpenKey(null)}
                  />
                </motion.div>
              </AnimatePresence>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voile sous le header (le header reste net) : clic = fermeture.
          Doublon d'Échap et de la sortie du focus, donc hors de l'arbre a11y. */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring.fade}
            onClick={() => setOpenKey(null)}
            /* Le voile est un descendant du header : sans ceci, `pointerleave`
               ne se déclenche jamais et le panneau resterait ouvert. */
            onPointerEnter={onHoverClose}
            className="absolute inset-x-0 top-full -z-10 hidden h-dvh cursor-default bg-ink/25 backdrop-blur-[2px] lg:block"
          />
        )}
      </AnimatePresence>

      {/* ---------- Menu mobile : feuille glissable ----------
          La feuille descend du header et se referme par le même chemin. On
          peut la saisir par sa poignée et la remonter du pouce : suivi 1:1
          vers le haut, résistance élastique vers le bas, décision au
          relâchement selon la vitesse (voir onSheetDragEnd). */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id={MOBILE_SHEET_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            drag="y"
            dragListener={false}
            dragControls={sheetDrag}
            dragConstraints={{ top: 0, bottom: 0 }}
            /* top: 1 = suivi 1:1 du doigt dans le sens de la fermeture ;
               bottom: 0.05 = quasi butée dans l'autre sens. */
            dragElastic={{ top: 1, bottom: 0.05 }}
            /* Pas d'inertie au relâchement : c'est la sortie (exit) ou le
               retour en place qui prend le relais, sans rebond parasite. */
            dragMomentum={false}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 40 }}
            onDragEnd={onSheetDragEnd}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={spring.ui}
            /* 11.75 rem = header déplié (7 rem) + barre d'action basse (4.75 rem) :
               la feuille ne recouvre jamais « Appeler / Demander ». */
            className="absolute inset-x-0 top-full flex max-h-[calc(100dvh-11.75rem)] flex-col border-t border-line/70 bg-cream shadow-band lg:hidden"
          >
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <Container className="flex flex-col gap-2 py-5">
                {headerNav.map((item) => {
                  const panel = item.panel;
                  if (!panel) {
                    return (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="press flex items-center gap-3 rounded-xl border border-copper/30 bg-copper/10 px-4 py-4 font-display text-base font-bold text-copper"
                      >
                        <LivePulse />
                        {item.label}
                      </Link>
                    );
                  }
                  const expanded = mobileSection === item.key;
                  return (
                    <div
                      key={item.key}
                      className="overflow-hidden rounded-xl border border-line bg-white"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSection((k) =>
                            k === item.key ? null : item.key,
                          )
                        }
                        aria-expanded={expanded}
                        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left font-display text-base font-bold text-anthracite active:bg-cream-200"
                      >
                        {item.label}
                        <motion.span
                          animate={{ rotate: expanded ? 180 : 0 }}
                          transition={spring.snappy}
                          className="flex shrink-0 text-copper"
                          aria-hidden
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={spring.ui}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-line px-3 pb-4 pt-3">
                              <MegaPanelContent
                                panel={panel}
                                compact
                                onNavigate={() => setMobileOpen(false)}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <div className="mt-3 flex flex-col gap-2">
                  <ContactCard qr={qr} variant="inline" />
                  {hasPhone && (
                    <ButtonLink
                      href={company.contact.phoneHref}
                      variant="outline"
                      size="lg"
                      className="tabular whitespace-nowrap"
                    >
                      <Phone className="h-4 w-4" aria-hidden />
                      {company.contact.phone}
                    </ButtonLink>
                  )}
                  <Button href="/urgence" variant="copper" size="lg">
                    Intervention en {promesse.delaiCourt}
                  </Button>
                </div>
              </Container>
            </div>

            {/* Poignée : seule zone qui démarre le glissement, pour ne pas
                entrer en conflit avec le défilement du contenu au-dessus.
                Un appui sec ferme ; un glissement laisse onSheetDragEnd
                décider (le clic synthétique qui suit est ignoré). */}
            <button
              type="button"
              aria-label="Fermer le menu"
              onPointerDown={(e) => {
                handleGesture.current = { startY: e.clientY, moved: false };
                sheetDrag.start(e);
              }}
              onPointerUp={(e) => {
                handleGesture.current = {
                  ...handleGesture.current,
                  moved: Math.abs(e.clientY - handleGesture.current.startY) > 6,
                };
              }}
              onClick={() => {
                if (!handleGesture.current.moved) setMobileOpen(false);
              }}
              className="flex shrink-0 cursor-grab touch-none items-center justify-center border-t border-line/70 bg-cream py-3 active:cursor-grabbing"
            >
              <span
                className="h-1.5 w-12 rounded-full bg-anthracite/15"
                aria-hidden
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
