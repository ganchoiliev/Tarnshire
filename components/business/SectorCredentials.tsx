import { Container } from "@/components/ui/Container";

export function SectorCredentials({ credentials }: { credentials: string[] }) {
  return (
    <section
      className="py-16 md:py-20 bg-[var(--color-bone-soft)] border-y border-[var(--color-neutral-100)]"
      aria-label="Sector credentials"
    >
      <Container>
        <p
          className="text-[var(--color-mineral)] font-medium uppercase mb-6"
          style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
        >
          Credentials in place for this sector
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {credentials.map((c) => (
            <li
              key={c}
              className="flex items-start gap-3 text-[var(--color-neutral-700)]"
              style={{ fontSize: "var(--text-body)" }}
            >
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-mineral)] mt-2.5"
                aria-hidden
              />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
