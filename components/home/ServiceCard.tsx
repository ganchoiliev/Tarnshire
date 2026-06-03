import Image from "next/image";
import Link from "next/link";

export type ServiceCardData = {
  href: string;
  title: string;
  body: string;
  price: string;
  imageSrc: string;
};

export function ServiceCard({ href, title, body, price, imageSrc }: ServiceCardData) {
  return (
    <Link
      href={href}
      className="group block bg-[var(--color-bone)] border border-[var(--color-neutral-100)] rounded-[var(--radius-md)] overflow-hidden transition-[color,border-color,box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-emphasis)] hover:border-[var(--color-neutral-300)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[var(--shadow-lg)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bone-soft)]">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-emphasis)] motion-safe:group-hover:scale-105"
        />
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
        <p
          className="text-[var(--color-mineral)] font-medium uppercase"
          style={{
            fontSize: "var(--text-caption)",
            letterSpacing: "var(--tracking-caption)",
          }}
        >
          {price}
        </p>
      </div>
    </Link>
  );
}
