"use client";

import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "press inline-flex items-center justify-center gap-2 rounded-full font-semibold bg-copper text-cream copper-glow focus-visible:outline-2 focus-visible:outline-offset-2 will-change-transform";

const sizes = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
} as const;

/**
 * CTA principal avec effet « magnétique » : le bouton suit légèrement le
 * curseur. Désactivé proprement pour le tactile et le mouvement réduit.
 */
export function MagneticButton({
  href,
  children,
  size = "lg",
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  size?: keyof typeof sizes;
  className?: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const cls = cn(base, sizes[size], "transition-transform", className);

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cls}
    >
      {children}
    </Link>
  );
}
