import { AdminStatusSelect } from "./AdminStatusSelect";
import { AdminNotesEditor } from "./AdminNotesEditor";

const QUOTE_STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "walkthrough_booked", label: "Walkthrough booked" },
  { value: "quoted", label: "Quoted" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

type Quote = {
  id: string;
  created_at: string;
  status: string;
  sector: string;
  size_band: string;
  frequency: string;
  contact_name: string;
  contact_company: string;
  contact_email: string;
  contact_phone: string | null;
  walkthrough_date: string;
  walkthrough_time_slot: string;
  internal_notes: string | null;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

export function AdminQuoteTable({ quotes }: { quotes: Quote[] }) {
  if (quotes.length === 0) {
    return (
      <p
        className="text-[var(--color-neutral-500)] italic"
        style={{ fontSize: "var(--text-body)" }}
      >
        No quote requests yet. The first one lands here when a B2B prospect submits at /business/quote.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border border-[var(--color-neutral-100)] rounded-[var(--radius-md)] bg-[var(--color-bone)]">
      <table className="w-full" style={{ fontSize: "var(--text-body-sm)" }}>
        <thead className="bg-[var(--color-bone-soft)] border-b border-[var(--color-neutral-100)]">
          <tr>
            <th
              className="text-left px-4 py-3 text-[var(--color-neutral-500)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Date
            </th>
            <th
              className="text-left px-4 py-3 text-[var(--color-neutral-500)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Company
            </th>
            <th
              className="text-left px-4 py-3 text-[var(--color-neutral-500)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Contact
            </th>
            <th
              className="text-left px-4 py-3 text-[var(--color-neutral-500)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Sector
            </th>
            <th
              className="text-left px-4 py-3 text-[var(--color-neutral-500)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Walkthrough
            </th>
            <th
              className="text-left px-4 py-3 text-[var(--color-neutral-500)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Status
            </th>
            <th
              className="text-left px-4 py-3 text-[var(--color-neutral-500)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr
              key={q.id}
              className="border-b border-[var(--color-neutral-100)] last:border-b-0 hover:bg-[var(--color-bone-soft)] transition-colors"
            >
              <td className="px-4 py-3 text-[var(--color-neutral-500)] whitespace-nowrap">
                {formatDate(q.created_at)}
              </td>
              <td className="px-4 py-3 text-[var(--color-ink)] font-medium">{q.contact_company}</td>
              <td className="px-4 py-3 text-[var(--color-neutral-700)]">
                <a
                  href={`mailto:${q.contact_email}`}
                  className="hover:text-[var(--color-mineral)] underline underline-offset-2 decoration-[0.5px]"
                >
                  {q.contact_name}
                </a>
                {q.contact_phone ? (
                  <div
                    className="text-[var(--color-neutral-500)]"
                    style={{ fontSize: "var(--text-caption)" }}
                  >
                    {q.contact_phone}
                  </div>
                ) : null}
              </td>
              <td className="px-4 py-3 text-[var(--color-neutral-700)] whitespace-nowrap">
                {q.sector}
              </td>
              <td className="px-4 py-3 text-[var(--color-neutral-700)] whitespace-nowrap">
                {q.walkthrough_date} · {q.walkthrough_time_slot}
              </td>
              <td className="px-4 py-3">
                <AdminStatusSelect
                  kind="quote"
                  id={q.id}
                  currentStatus={q.status}
                  options={QUOTE_STATUS_OPTIONS}
                />
              </td>
              <td className="px-4 py-3">
                <AdminNotesEditor kind="quote" id={q.id} currentNotes={q.internal_notes} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
