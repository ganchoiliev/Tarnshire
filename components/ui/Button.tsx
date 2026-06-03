import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "accent" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  showArrow?: boolean;
};

type AsLink = Common & {
  href: string;
  prefetch?: boolean;
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
  sm: "px-4 py-2.5 text-[13px]",
  md: "px-5 py-3 text-[14px]",
  lg: "px-7 py-4 text-[14px]",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "lg",
    className = "",
    children,
    showArrow = true,
  } = props;
  const cls = [
    "inline-flex items-center gap-3 font-medium tracking-[0.02em] rounded-[var(--radius-sm)] transition-[color,background-color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-emphasis)] no-underline motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[var(--shadow-md)] motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]",
    variantClass[variant],
    sizeClass[size],
    className,
  ].join(" ");

  const content = (
    <>
      <span>{children}</span>
      {showArrow && <span aria-hidden>→</span>}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} prefetch={props.prefetch} className={cls}>
        {content}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={cls}>
      {content}
    </button>
  );
}
