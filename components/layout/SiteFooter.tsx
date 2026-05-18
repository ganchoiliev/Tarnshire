import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";

type FooterLink = { href: string; label: string };

const homeLinks: FooterLink[] = [
  { href: "/home", label: "For Home" },
  { href: "/home/services", label: "Services" },
  { href: "/home/pricing", label: "Pricing" },
  { href: "/home/areas", label: "Areas" },
];

const businessLinks: FooterLink[] = [
  { href: "/business", label: "For Business" },
  { href: "/business/sectors", label: "Sectors" },
  { href: "/business/accreditations", label: "Accreditations" },
  { href: "/business/quote", label: "Request a quote" },
];

const brandLinks: FooterLink[] = [
  { href: "/about", label: "About" },
  { href: "/our-cleaners", label: "Our Cleaners" },
  { href: "/the-almanac", label: "The Almanac" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--color-bone)] border-t border-[var(--color-neutral-100)] px-6 md:px-14 pt-16 pb-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
        <div className="col-span-2">
          <Wordmark size="md" href="/" />
          <p
            className="text-[var(--color-neutral-500)] mt-5 max-w-[280px]"
            style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.55 }}
          >
            Premium cleaning across Greater Manchester. Same cleaner every visit. Vetted, insured, and yours to keep.
          </p>
        </div>

        <FooterColumn title="For Home" links={homeLinks} />
        <FooterColumn title="For Business" links={businessLinks} />
        <FooterColumn title="Brand" links={brandLinks} />
      </div>

      <div className="pt-8 border-t border-[var(--color-neutral-100)] flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="text-[var(--color-neutral-500)] uppercase"
            style={{ fontSize: "var(--text-caption)", letterSpacing: "var(--tracking-caption)" }}
          >
            © {year} Tarnshire · Manchester · Greater Manchester
          </p>
          <p
            className="text-[var(--color-neutral-500)] uppercase"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            DBS-checked · Fully insured · Same-cleaner promise
          </p>
        </div>
        <p
          className="text-[var(--color-neutral-500)] max-w-none"
          style={{ fontSize: "var(--text-caption)", lineHeight: 1.55 }}
        >
          Tarnshire is a trading name of Brushly Ltd, a company registered in England and Wales (Company No. 17056861). Registered office: 18 Howard Road, Reigate, RH2 7JE.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <p
        className="text-[var(--color-ink)] font-medium uppercase mb-4"
        style={{
          fontSize: "var(--text-label)",
          letterSpacing: "var(--tracking-label)",
        }}
      >
        {title}
      </p>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[var(--color-neutral-500)] hover:text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-emphasis)]"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
