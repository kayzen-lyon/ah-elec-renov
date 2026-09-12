import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "copper" | "dark" | "outline" | "outline-light" | "ghost";
type Size = "md" | "lg";

const base =
  "press inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  copper: "bg-copper text-cream hover:bg-copper-600 copper-glow",
  dark: "bg-anthracite text-cream hover:bg-anthracite-700 hover:-translate-y-0.5",
  outline:
    "border-2 border-anthracite/20 text-anthracite hover:border-copper hover:text-copper bg-transparent",
  "outline-light":
    "border-2 border-cream/30 text-cream hover:bg-cream/10 hover:border-copper-300",
  ghost: "text-anthracite hover:text-copper bg-transparent",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "copper",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & {
  href: string;
} & React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Variante <a> brute (pour tel: / mailto: / fichiers). */
export function ButtonLink({
  href,
  variant = "copper",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </a>
  );
}
