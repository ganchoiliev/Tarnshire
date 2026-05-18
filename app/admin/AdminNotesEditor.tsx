"use client";

import { useState, useTransition } from "react";
import {
  updateQuoteNotesAction,
  updateApplicationNotesAction,
  updateBookingNotesAction,
} from "./actions";

type Kind = "quote" | "application" | "booking";

type Props = {
  kind: Kind;
  id: string;
  currentNotes: string | null;
};

const ACTION_BY_KIND: Record<Kind, (id: string, notes: string) => Promise<{ ok: true } | { ok: false; error: string }>> = {
  quote: updateQuoteNotesAction,
  application: updateApplicationNotesAction,
  booking: updateBookingNotesAction,
};

export function AdminNotesEditor({ kind, id, currentNotes }: Props) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(currentNotes ?? "");
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(false);
    startTransition(async () => {
      const action = ACTION_BY_KIND[kind];
      const result = await action(id, notes);
      if (result.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    });
  }

  if (!open) {
    const hasNotes = (currentNotes?.trim().length ?? 0) > 0;
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[var(--color-mineral)] hover:text-[var(--color-mineral-deep)] underline underline-offset-4 decoration-[0.5px]"
        style={{ fontSize: "var(--text-body-sm)" }}
      >
        {hasNotes ? "Edit notes" : "Add notes"}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2 mt-2 max-w-[520px]">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        placeholder="Internal notes — visible only to admin."
        className="w-full bg-[var(--color-bone)] border border-[var(--color-neutral-100)] rounded-[var(--radius-sm)] px-3 py-2 text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-mineral)]"
        style={{
          fontFamily: "var(--font-sans-loaded), var(--font-sans)",
          fontSize: "var(--text-body-sm)",
          lineHeight: 1.5,
          resize: "vertical",
        }}
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="bg-[var(--color-ink)] text-[var(--color-bone)] px-4 py-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-neutral-700)] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            fontSize: "var(--text-body-sm)",
            fontFamily: "var(--font-sans-loaded), var(--font-sans)",
          }}
        >
          {isPending ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setNotes(currentNotes ?? "");
            setSaved(false);
          }}
          className="text-[var(--color-neutral-500)] hover:text-[var(--color-ink)]"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          Cancel
        </button>
        {saved ? (
          <span
            className="text-[var(--color-mineral)]"
            style={{ fontSize: "var(--text-caption)" }}
          >
            Saved
          </span>
        ) : null}
      </div>
    </div>
  );
}
