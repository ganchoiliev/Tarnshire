import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { getServiceSupabase } from "@/lib/supabase/server";
import { Container } from "@/components/ui/Container";
import { AdminNav } from "./AdminNav";
import { AdminQuoteTable } from "./AdminQuoteTable";
import { AdminBookingTable } from "./AdminBookingTable";
import { AdminApplicationTable } from "./AdminApplicationTable";

export const metadata: Metadata = {
  title: "Admin — Tarnshire",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  if (!(await isAdminSessionValid())) redirect("/admin/login");

  const supabase = getServiceSupabase();

  const [quotesResult, bookingsResult, applicationsResult] = await Promise.all([
    supabase
      .from("quote_requests")
      .select(
        "id, created_at, status, sector, size_band, frequency, contact_name, contact_company, contact_email, contact_phone, walkthrough_date, walkthrough_time_slot, internal_notes",
      )
      .order("created_at", { ascending: false })
      .limit(25),
    supabase
      .from("bookings")
      .select(
        "id, created_at, status, service_type, postcode, bedrooms, frequency, contact_name, contact_email, contact_phone, preferred_date, preferred_time_slot, assigned_contractor_id, price_per_visit_pence, internal_notes",
      )
      .order("created_at", { ascending: false })
      .limit(25),
    supabase
      .from("contractor_applications")
      .select(
        "id, created_at, status, name, email, phone, borough_preference, experience_months, languages, hours_per_week, right_to_work, dbs_willing, self_employed_ok, internal_notes",
      )
      .order("created_at", { ascending: false })
      .limit(25),
  ]);

  const quotes = quotesResult.data ?? [];
  const bookings = bookingsResult.data ?? [];
  const applications = applicationsResult.data ?? [];

  const newQuotes = quotes.filter((q) => q.status === "new").length;
  const newBookings = bookings.filter((b) => b.status === "confirmed").length;
  const newApplications = applications.filter((a) => a.status === "new").length;

  return (
    <>
      <AdminNav />
      <main className="bg-[var(--color-bone)] min-h-screen pb-24">
        <Container width="wide" className="pt-12 md:pt-16">
          <div className="mb-12">
            <p
              className="text-[var(--color-mineral)] font-medium uppercase mb-3"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Dashboard
            </p>
            <h1
              className="font-medium text-[var(--color-ink)] mb-6"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-display-md)",
                lineHeight: 1.05,
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              Inbound pipeline.
            </h1>
            <div className="flex flex-wrap gap-8" style={{ fontSize: "var(--text-body)" }}>
              <div>
                <p
                  className="text-[var(--color-neutral-500)] uppercase mb-1"
                  style={{
                    fontSize: "var(--text-caption)",
                    letterSpacing: "var(--tracking-caption)",
                  }}
                >
                  Quotes (new)
                </p>
                <p
                  className="font-medium text-[var(--color-ink)]"
                  style={{
                    fontFamily: "var(--font-display-loaded), var(--font-display)",
                    fontSize: "var(--text-display-md)",
                    lineHeight: 1,
                  }}
                >
                  {newQuotes}
                </p>
              </div>
              <div>
                <p
                  className="text-[var(--color-neutral-500)] uppercase mb-1"
                  style={{
                    fontSize: "var(--text-caption)",
                    letterSpacing: "var(--tracking-caption)",
                  }}
                >
                  Bookings (confirmed)
                </p>
                <p
                  className="font-medium text-[var(--color-ink)]"
                  style={{
                    fontFamily: "var(--font-display-loaded), var(--font-display)",
                    fontSize: "var(--text-display-md)",
                    lineHeight: 1,
                  }}
                >
                  {newBookings}
                </p>
              </div>
              <div>
                <p
                  className="text-[var(--color-neutral-500)] uppercase mb-1"
                  style={{
                    fontSize: "var(--text-caption)",
                    letterSpacing: "var(--tracking-caption)",
                  }}
                >
                  Applications (new)
                </p>
                <p
                  className="font-medium text-[var(--color-ink)]"
                  style={{
                    fontFamily: "var(--font-display-loaded), var(--font-display)",
                    fontSize: "var(--text-display-md)",
                    lineHeight: 1,
                  }}
                >
                  {newApplications}
                </p>
              </div>
              <div>
                <p
                  className="text-[var(--color-neutral-500)] uppercase mb-1"
                  style={{
                    fontSize: "var(--text-caption)",
                    letterSpacing: "var(--tracking-caption)",
                  }}
                >
                  Total quotes
                </p>
                <p
                  className="font-medium text-[var(--color-neutral-700)]"
                  style={{
                    fontFamily: "var(--font-display-loaded), var(--font-display)",
                    fontSize: "var(--text-display-md)",
                    lineHeight: 1,
                  }}
                >
                  {quotes.length}
                </p>
              </div>
              <div>
                <p
                  className="text-[var(--color-neutral-500)] uppercase mb-1"
                  style={{
                    fontSize: "var(--text-caption)",
                    letterSpacing: "var(--tracking-caption)",
                  }}
                >
                  Total applications
                </p>
                <p
                  className="font-medium text-[var(--color-neutral-700)]"
                  style={{
                    fontFamily: "var(--font-display-loaded), var(--font-display)",
                    fontSize: "var(--text-display-md)",
                    lineHeight: 1,
                  }}
                >
                  {applications.length}
                </p>
              </div>
            </div>
          </div>

          <section className="mb-16">
            <h2
              className="font-medium text-[var(--color-ink)] mb-6"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-heading-lg)",
                lineHeight: 1.2,
              }}
            >
              Quote requests ({quotes.length})
            </h2>
            <AdminQuoteTable quotes={quotes} />
          </section>

          <section className="mb-16">
            <h2
              className="font-medium text-[var(--color-ink)] mb-6"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-heading-lg)",
                lineHeight: 1.2,
              }}
            >
              Bookings ({bookings.length})
            </h2>
            <AdminBookingTable bookings={bookings} />
          </section>

          <section>
            <h2
              className="font-medium text-[var(--color-ink)] mb-6"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-heading-lg)",
                lineHeight: 1.2,
              }}
            >
              Contractor applications ({applications.length})
            </h2>
            <AdminApplicationTable applications={applications} />
          </section>
        </Container>
      </main>
    </>
  );
}
