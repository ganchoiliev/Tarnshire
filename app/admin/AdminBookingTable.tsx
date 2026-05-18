import { AdminStatusSelect } from "./AdminStatusSelect";
import { AdminNotesEditor } from "./AdminNotesEditor";

const BOOKING_STATUS_OPTIONS = [
  { value: "pending_payment", label: "Pending payment" },
  { value: "confirmed", label: "Confirmed" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
];

const BEDROOM_LABELS: Record<string, string> = {
  studio: "Studio",
  "1": "1 bed",
  "2": "2 bed",
  "3": "3 bed",
  "4": "4 bed",
  "5_plus": "5+ bed",
};

const FREQUENCY_LABELS: Record<string, string> = {
  weekly: "Weekly",
  fortnightly: "Fortnightly",
  monthly: "Monthly",
  one_off: "One-off",
};

const TIME_SLOT_LABELS: Record<string, string> = {
  morning: "AM",
  afternoon: "PM",
  either: "Any",
};

type Booking = {
  id: string;
  created_at: string;
  status: string;
  postcode: string;
  bedrooms: string;
  frequency: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  preferred_date: string;
  preferred_time_slot: string;
  assigned_contractor_id: string | null;
  price_per_visit_pence: number;
  internal_notes: string | null;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

function formatGBP(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(pence / 100);
}

export function AdminBookingTable({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return (
      <p
        className="text-[var(--color-neutral-500)] italic"
        style={{ fontSize: "var(--text-body)" }}
      >
        No bookings yet. The first one lands here when a B2C customer pays through /home/book.
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
              Contact
            </th>
            <th
              className="text-left px-4 py-3 text-[var(--color-neutral-500)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Property
            </th>
            <th
              className="text-left px-4 py-3 text-[var(--color-neutral-500)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Scheduled
            </th>
            <th
              className="text-left px-4 py-3 text-[var(--color-neutral-500)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Amount
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
          {bookings.map((b) => (
            <tr
              key={b.id}
              className="border-b border-[var(--color-neutral-100)] last:border-b-0 hover:bg-[var(--color-bone-soft)] transition-colors"
            >
              <td className="px-4 py-3 text-[var(--color-neutral-500)] whitespace-nowrap">
                {formatDate(b.created_at)}
              </td>
              <td className="px-4 py-3 text-[var(--color-ink)]">
                <div className="font-medium">{b.contact_name}</div>
                <a
                  href={`mailto:${b.contact_email}`}
                  className="text-[var(--color-neutral-500)] hover:text-[var(--color-mineral)] underline underline-offset-2 decoration-[0.5px]"
                  style={{ fontSize: "var(--text-caption)" }}
                >
                  {b.contact_email}
                </a>
                <div
                  className="text-[var(--color-neutral-500)]"
                  style={{ fontSize: "var(--text-caption)" }}
                >
                  {b.contact_phone}
                </div>
              </td>
              <td className="px-4 py-3 text-[var(--color-neutral-700)] whitespace-nowrap">
                <div>{BEDROOM_LABELS[b.bedrooms] ?? b.bedrooms}</div>
                <div
                  className="text-[var(--color-neutral-500)]"
                  style={{ fontSize: "var(--text-caption)" }}
                >
                  {FREQUENCY_LABELS[b.frequency] ?? b.frequency} · {b.postcode}
                </div>
              </td>
              <td className="px-4 py-3 text-[var(--color-neutral-700)] whitespace-nowrap">
                <div>
                  {b.preferred_date} · {TIME_SLOT_LABELS[b.preferred_time_slot] ?? b.preferred_time_slot}
                </div>
                {b.assigned_contractor_id ? (
                  <div
                    className="text-[var(--color-mineral)]"
                    style={{ fontSize: "var(--text-caption)" }}
                  >
                    Assigned
                  </div>
                ) : (
                  <div
                    className="text-[var(--color-signal)]"
                    style={{ fontSize: "var(--text-caption)" }}
                  >
                    Unassigned
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-[var(--color-ink)] font-medium whitespace-nowrap">
                {formatGBP(b.price_per_visit_pence)}
              </td>
              <td className="px-4 py-3">
                <AdminStatusSelect
                  kind="booking"
                  id={b.id}
                  currentStatus={b.status}
                  options={BOOKING_STATUS_OPTIONS}
                />
              </td>
              <td className="px-4 py-3">
                <AdminNotesEditor kind="booking" id={b.id} currentNotes={b.internal_notes} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
