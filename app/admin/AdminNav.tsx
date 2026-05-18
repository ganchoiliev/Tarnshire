import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "@/components/ui/Container";
import { signOutAction } from "./actions";

export function AdminNav() {
  return (
    <header className="border-b border-[var(--color-neutral-100)] bg-[var(--color-bone)] sticky top-0 z-50">
      <Container width="wide">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <Wordmark size="md" href="/" />
            <span
              className="text-[var(--color-mineral)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              · Admin
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-[var(--color-neutral-500)] hover:text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)]"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              View site →
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="text-[var(--color-neutral-500)] hover:text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] underline underline-offset-4 decoration-[0.5px]"
                style={{ fontSize: "var(--text-body-sm)" }}
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </Container>
    </header>
  );
}
