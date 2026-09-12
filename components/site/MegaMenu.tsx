"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  CookingPot,
  FileText,
  Hammer,
  Images,
  Mail,
  MapPin,
  ShowerHead,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { blurData } from "@/lib/image";
import type {
  MenuColumn,
  MenuIconName,
  MenuLink,
  MenuPanel,
} from "@/content/menu";

const ICONS: Record<
  MenuIconName,
  React.ComponentType<{ className?: string }>
> = {
  zap: Zap,
  hammer: Hammer,
  shower: ShowerHead,
  cooking: CookingPot,
  pipe: Wrench,
  "map-pin": MapPin,
  images: Images,
  users: Users,
  mail: Mail,
  "file-text": FileText,
};

function MenuIcon({
  name,
  className,
}: {
  name: MenuIconName;
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} />;
}

/* ------------------------------------------------------------------ */
/*  Lien de panneau                                                    */
/* ------------------------------------------------------------------ */

function PanelLink({
  link,
  onNavigate,
}: {
  link: MenuLink;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="group/link flex items-start gap-3.5 rounded-xl p-3 transition-colors duration-200 hover:bg-cream-200 active:bg-cream-300"
    >
      {link.icon && (
        <span
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-copper transition-colors duration-200 group-hover/link:border-copper group-hover/link:bg-copper group-hover/link:text-cream"
          aria-hidden
        >
          <MenuIcon name={link.icon} className="h-[18px] w-[18px]" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="font-display text-[15px] font-bold leading-tight text-anthracite">
            {link.label}
          </span>
          {link.badge && (
            <span className="tabular whitespace-nowrap rounded-full bg-anthracite/5 px-2 py-0.5 text-[11px] font-semibold text-muted">
              {link.badge}
            </span>
          )}
          <ChevronRight
            className="h-3.5 w-3.5 shrink-0 text-copper opacity-0 transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:opacity-100"
            aria-hidden
          />
        </span>
        {link.desc && (
          <span className="mt-1 block text-[13px] leading-snug text-muted">
            {link.desc}
          </span>
        )}
      </span>
    </Link>
  );
}

function PanelColumn({
  column,
  onNavigate,
}: {
  column: MenuColumn;
  onNavigate?: () => void;
}) {
  return (
    <div>
      <p className="mb-1 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
        {column.title}
      </p>
      <div className="accent-line mx-3 mb-2 h-[2px] w-8" aria-hidden />
      <ul className="flex flex-col">
        {column.links.map((link) => (
          <li key={link.href}>
            <PanelLink link={link} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Carte visuelle                                                     */
/* ------------------------------------------------------------------ */

function PanelFeature({
  panel,
  onNavigate,
  className,
}: {
  panel: MenuPanel;
  onNavigate?: () => void;
  className?: string;
}) {
  const f = panel.feature;
  return (
    <Link
      href={f.href}
      onClick={onNavigate}
      className={cn(
        "group/feature grain-overlay press relative flex min-h-[15rem] flex-col justify-end overflow-hidden rounded-2xl bg-ink p-6 text-cream shadow-band",
        className,
      )}
    >
      <Image
        src={f.image}
        alt={f.alt}
        fill
        sizes="(max-width: 1023px) 100vw, 360px"
        /* Le panneau ne se monte qu'à l'ouverture : pas de lazy, sinon un
           temps mort visible avant l'apparition du visuel. */
        loading="eager"
        placeholder="blur"
        blurDataURL={blurData}
        className="img-craft object-cover opacity-55 transition-transform duration-700 ease-out group-hover/feature:scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10"
        aria-hidden
      />
      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-copper-300">
          {f.eyebrow}
        </p>
        <p className="mt-2 font-display text-xl font-extrabold leading-tight">
          {f.title}
        </p>
        <p className="mt-2 text-[13px] leading-snug text-cream/75">{f.text}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-copper-300">
          {f.cta}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover/feature:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Contenu du panneau (desktop + mobile)                              */
/* ------------------------------------------------------------------ */

export function MegaPanelContent({
  panel,
  onNavigate,
  compact = false,
}: {
  panel: MenuPanel;
  onNavigate?: () => void;
  /** Variante mobile : colonnes empilées, visuel réduit. */
  compact?: boolean;
}) {
  return (
    <div className={cn(compact ? "flex flex-col gap-5" : "py-8")}>
      <div
        className={cn(
          "grid gap-6",
          compact
            ? "grid-cols-1"
            : /* Hauteur commune à tous les panneaux : le fondu croisé entre
                 rubriques ne fait pas sauter le bord bas. */
              "lg:min-h-[21rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_22rem] lg:gap-10",
        )}
      >
        {panel.columns.map((column) => (
          <PanelColumn
            key={column.title}
            column={column}
            onNavigate={onNavigate}
          />
        ))}
        <PanelFeature
          panel={panel}
          onNavigate={onNavigate}
          className={compact ? "min-h-[12rem]" : undefined}
        />
      </div>

      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-3 rounded-xl bg-cream-200 px-5 py-3.5",
          compact ? "" : "mt-7",
        )}
      >
        <p className="flex items-center gap-2 text-[13px] font-medium text-muted">
          <Zap className="h-4 w-4 shrink-0 text-copper" aria-hidden />
          {panel.footer.text}
        </p>
        <Link
          href={panel.footer.href}
          onClick={onNavigate}
          className="group/cta inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-bold text-copper hover:text-copper-600"
        >
          {panel.footer.cta}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}
