import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { Container } from "@/components/ui/Container";
import { AdminLoginForm } from "./AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminSessionValid()) redirect("/admin");

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-bone)] py-16 px-6">
      <Container width="narrow">
        <div className="max-w-[400px] mx-auto">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Admin
          </p>
          <h1
            className="font-medium text-[var(--color-ink)] mb-8"
            style={{
              fontFamily: "var(--font-display-loaded), var(--font-display)",
              fontSize: "var(--text-display-md)",
              lineHeight: 1.0,
              letterSpacing: "var(--tracking-display)",
            }}
          >
            Tarnshire admin.
          </h1>
          <AdminLoginForm />
        </div>
      </Container>
    </main>
  );
}
