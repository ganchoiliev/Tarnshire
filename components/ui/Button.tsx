import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "accent" | "ghost";
type ButtonSize = "md" | "lg";

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & {
  href: string;
  type?: never;
  onClick?: never;
};

type AsButton = Common & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
};

type ButtonProps = AsLink | AsButton;

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-ink text-bone hover:bg-neutral-700",
  accent: "bg-mineral text-bone hover:bg-mineral-deep",
  ghost: "bg-transparent text-ink border border-ink hover:bg-ink hover:text-bone",
};

const sizeClass: Record<ButtonSize, string> = {
  md: "px-5 py-3 text-[14px]",
  lg: "px-7 py-4 text-[14px]",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "lg", className = "", children } = props;
  const cls = [
    "inline-flex items-center gap-3 font-medium tracking-[0.02em] rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-emphasis)] no-underline",
    variantClass[variant],
    sizeClass[size],
    className,
  ].join(" ");

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={cls}>
        <span>{children}</span>
        <span aria-hidden>→</span>
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={cls}
    >
      <span>{children}</span>
      <span aria-hidden>→</span>
    </button>
  );
}
