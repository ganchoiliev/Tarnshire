import { AdminStatusSelect } from "./AdminStatusSelect";
import { AdminNotesEditor } from "./AdminNotesEditor";

const APPLICATION_STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "reviewing", label: "Reviewing" },
  { value: "interview_scheduled", label: "Interview scheduled" },
  { value: "references_checking", label: "References checking" },
  { value: "dbs_pending", label: "DBS pending" },
  { value: "trial_clean_scheduled", label: "Trial clean scheduled" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

type Application = {
  id: string;
  created_at: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  borough_preference: string;
  experience_months: string;
  languages: string[];
  hours_per_week: string;
  right_to_work: string;
  dbs_willing: string;
  self_employed_ok: string;
  internal_notes: string | null;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

const EXPERIENCE_LABELS: Record<string, string> = {
  lt_6: "<6mo",
  "6_12": "6-12mo",
  "12_24": "1-2yr",
  gt_24: "2yr+",
};

const BOROUGH_LABELS: Record<string, string> = {
  m20: "M20",
  m21: "M21",
  m14: "M14",
  any: "Any",
};

export function AdminApplicationTable({ applications }: { applications: Application[] }) {
  if (applications.length === 0) {
    return (
      <p
        className="text-[var(--color-neutral-500)] italic"
        style={{ fontSize: "var(--text-body)" }}
      >
        No applications yet. The first one lands here when a cleaner applies at /careers.
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
              Name
            </th>
            <th
              className="text-left px-4 py-3 text-[var(--color-neutral-500)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Borough
            </th>
            <th
              className="text-left px-4 py-3 text-[var(--color-neutral-500)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Exp
            </th>
            <th
              className="text-left px-4 py-3 text-[var(--color-neutral-500)] font-medium uppercase"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              RTW · DBS
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
          {applications.map((a) => (
            <tr
              key={a.id}
              className="border-b border-[var(--color-neutral-100)] last:border-b-0 hover:bg-[var(--color-bone-soft)] transition-colors"
            >
              <td className="px-4 py-3 text-[var(--color-neutral-500)] whitespace-nowrap">
                {formatDate(a.created_at)}
              </td>
              <td className="px-4 py-3 text-[var(--color-ink)]">
                <div className="font-medium">{a.name}</div>
                <a
                  href={`mailto:${a.email}`}
                  className="text-[var(--color-neutral-500)] hover:text-[var(--color-mineral)] underline underline-offset-2 decoration-[0.5px]"
                  style={{ fontSize: "var(--text-caption)" }}
                >
                  {a.email}
                </a>
                <div
                  className="text-[var(--color-neutral-500)]"
                  style={{ fontSize: "var(--text-caption)" }}
                >
                  {a.phone}
                </div>
              </td>
              <td className="px-4 py-3 text-[var(--color-neutral-700)] whitespace-nowrap">
                {BOROUGH_LABELS[a.borough_preference] ?? a.borough_preference}
              </td>
              <td className="px-4 py-3 text-[var(--color-neutral-700)] whitespace-nowrap">
                {EXPERIENCE_LABELS[a.experience_months] ?? a.experience_months}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={
                    a.right_to_work === "yes"
                      ? "text-[var(--color-mineral)]"
                      : "text-[var(--color-signal)]"
                  }
                >
                  RTW: {a.right_to_work}
                </span>
                <span className="text-[var(--color-neutral-500)]"> · </span>
                <span
                  className={
                    a.dbs_willing === "yes"
                      ? "text-[var(--color-mineral)]"
                      : "text-[var(--color-signal)]"
                  }
                >
                  DBS: {a.dbs_willing}
                </span>
              </td>
              <td className="px-4 py-3">
                <AdminStatusSelect
                  kind="application"
                  id={a.id}
                  currentStatus={a.status}
                  options={APPLICATION_STATUS_OPTIONS}
                />
              </td>
              <td className="px-4 py-3">
                <AdminNotesEditor kind="application" id={a.id} currentNotes={a.internal_notes} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
