import Image from "next/image";
import { Button } from "@/components/ui/Button";

type Variant = "home" | "business";

type RouteSplitFunnelProps = {
  variant: Variant;
  label: string;
  headline: string;
  lede: string;
  ctaLabel: string;
  ctaHref: string;
  metaPrimary: string;
  metaSecondary: string;
  imageSrc: string;
};

export function RouteSplitFunnel({
  variant,
  label,
  headline,
  lede,
  ctaLabel,
  ctaHref,
  metaPrimary,
  metaSecondary,
  imageSrc,
}: RouteSplitFunnelProps) {
  return (
    <div
      className="route-funnel relative overflow-hidden flex flex-col justify-between px-8 py-16 md:px-16 md:py-24 lg:py-28 min-h-[460px] md:min-h-[620px] transition-opacity duration-[var(--duration-base)] ease-[var(--ease-emphasis)]"
      data-variant={variant}
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover opacity-[0.18] pointer-events-none route-funnel-image transition-opacity duration-[var(--duration-base)] ease-[var(--ease-emphasis)]"
      />

      <div className="relative z-10 max-w-[480px]">
        <div
          className="inline-flex items-center gap-3 text-[var(--color-mineral)] font-medium mb-6 uppercase"
          style={{
            fontSize: "var(--text-label)",
            letterSpacing: "var(--tracking-label)",
          }}
        >
          <span className="inline-block w-6 h-px bg-[var(--color-mineral)]" aria-hidden />
          {label}
        </div>

        <h2
          className="font-medium text-[var(--color-ink)] mb-7"
          style={{
            fontFamily: "var(--font-display-loaded), var(--font-display)",
            fontSize: "var(--text-display-lg)",
            lineHeight: 1.0,
            letterSpacing: "var(--tracking-display)",
          }}
        >
          {headline}
        </h2>

        <p
          className="route-funnel-lede text-[var(--color-neutral-500)] mb-10 max-w-[440px] transition-opacity duration-[var(--duration-base)] ease-[var(--ease-emphasis)]"
          style={{
            fontSize: "var(--text-body-lg)",
            lineHeight: 1.6,
          }}
        >
          {lede}
        </p>

        <Button
          href={ctaHref}
          variant={variant === "home" ? "accent" : "primary"}
          size="lg"
        >
          {ctaLabel}
        </Button>
      </div>

      <div
        className="route-funnel-meta relative z-10 mt-12 text-[var(--color-neutral-500)] transition-opacity duration-[var(--duration-base)] ease-[var(--ease-emphasis)] uppercase"
        style={{
          fontSize: "var(--text-caption)",
          letterSpacing: "var(--tracking-caption)",
        }}
      >
        <strong className="text-[var(--color-ink)] font-medium mr-2 not-uppercase" style={{ textTransform: "none" }}>
          {metaPrimary}
        </strong>
        {metaSecondary}
      </div>
    </div>
  );
}
