import Link from "next/link";

type WordmarkProps = {
  size?: "sm" | "md" | "lg" | "xl";
  href?: string | null;
  className?: string;
};

const sizeClass: Record<NonNullable<WordmarkProps["size"]>, string> = {
  sm: "text-[14px]",
  md: "text-[18px]",
  lg: "text-[24px]",
  xl: "text-[40px] md:text-[56px]",
};

export function Wordmark({
  size = "lg",
  href = "/",
  className = "",
}: WordmarkProps) {
  const content = (
    <span
      className={`inline-block uppercase font-medium ${sizeClass[size]} ${className}`}
      style={{
        fontFamily: "var(--font-display-loaded), var(--font-display)",
        letterSpacing: "var(--tracking-wordmark)",
        color: "var(--color-ink)",
        lineHeight: 1,
      }}
      aria-label="Tarnshire"
    >
      Tarnshire
    </span>
  );

  if (href === null) return content;

  return (
    <Link
      href={href}
      className="inline-block transition-opacity duration-200 hover:opacity-70"
    >
      {content}
    </Link>
  );
}
