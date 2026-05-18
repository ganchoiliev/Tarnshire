"use client";

import { useState, useTransition } from "react";
import {
  updateQuoteStatusAction,
  updateApplicationStatusAction,
  updateBookingStatusAction,
} from "./actions";

type Kind = "quote" | "application" | "booking";

type Props = {
  kind: Kind;
  id: string;
  currentStatus: string;
  options: { value: string; label: string }[];
};

const ACTION_BY_KIND: Record<Kind, (id: string, status: string) => Promise<{ ok: true } | { ok: false; error: string }>> = {
  quote: updateQuoteStatusAction,
  application: updateApplicationStatusAction,
  booking: updateBookingStatusAction,
};

export function AdminStatusSelect({ kind, id, currentStatus, options }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setError(null);
    startTransition(async () => {
      const action = ACTION_BY_KIND[kind];
      const result = await action(id, newStatus);
      if (!result.ok) {
        setError(result.error ?? "Update failed");
        setStatus(currentStatus);
      }
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <select
        value={status}
        onChange={handleChange}
        disabled={isPending}
        className="bg-[var(--color-bone)] border rounded-[var(--radius-sm)] px-3 py-1.5 text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] focus:outline-none focus:border-[var(--color-mineral)]"
        style={{
          borderColor: error ? "var(--color-signal)" : "var(--color-neutral-100)",
          fontFamily: "var(--font-sans-loaded), var(--font-sans)",
          fontSize: "var(--text-body-sm)",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error ? (
        <p className="text-[var(--color-signal)]" style={{ fontSize: "var(--text-caption)" }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
