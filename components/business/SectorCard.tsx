import Image from "next/image";
import Link from "next/link";

export type SectorCardData = {
  href: string;
  title: string;
  body: string;
  imageSrc: string;
  locked?: boolean;
  lockedNote?: string;
};

export function SectorCard({ href, title, body, imageSrc, locked, lockedNote }: SectorCardData) {
  const content = (
    <>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bone-soft)]">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 200px, (min-width: 640px) 33vw, 50vw"
          className={`object-cover ${locked ? "opacity-50" : ""}`}
        />
        {locked ? (
          <div
            className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-bone)] border border-[var(--color-neutral-300)] rounded-[var(--radius-xs)] text-[var(--color-neutral-700)] font-medium uppercase"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Phase 3
          </div>
        ) : null}
      </div>
      <div className="p-5 md:p-6">
        <h3
          className="font-medium text-[var(--color-ink)] mb-2"
          style={{
            fontFamily: "var(--font-display-loaded), var(--font-display)",
            fontSize: "var(--text-heading-lg)",
            lineHeight: 1.1,
            letterSpacing: "var(--tracking-heading)",
          }}
        >
          {title}
        </h3>
        <p
          className="text-[var(--color-neutral-500)] mb-4"
          style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.5 }}
        >
          {body}
        </p>
        {locked && lockedNote ? (
          <p
            className="text-[var(--color-neutral-500)] font-medium uppercase"
            style={{ fontSize: "var(--text-caption)", letterSpacing: "var(--tracking-caption)" }}
          >
            {lockedNote}
          </p>
        ) : null}
      </div>
    </>
  );

  if (locked) {
    return (
      <div className="block bg-[var(--color-bone)] border border-[var(--color-neutral-100)] rounded-[var(--radius-md)] overflow-hidden cursor-default">
        {content}
      </div>
    );
  }
  return (
    <Link
      href={href}
      className="group block bg-[var(--color-bone)] border border-[var(--color-neutral-100)] rounded-[var(--radius-md)] overflow-hidden transition-colors duration-[var(--duration-base)] ease-[var(--ease-emphasis)] hover:border-[var(--color-neutral-300)]"
    >
      {content}
    </Link>
  );
}
