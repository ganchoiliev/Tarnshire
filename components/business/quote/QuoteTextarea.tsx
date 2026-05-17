"use client";
import { QuoteFieldGroup } from "./QuoteFieldGroup";

type Props = {
  id: string;
  label: string;
  required?: boolean;
  helper?: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
};

export function QuoteTextarea({
  id,
  label,
  required,
  helper,
  error,
  value,
  onChange,
  placeholder,
  rows = 4,
}: Props) {
  return (
    <QuoteFieldGroup label={label} htmlFor={id} required={required} helper={helper} error={error}>
      <textarea
        id={id}
        required={required}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className="w-full bg-[var(--color-bone)] border rounded-[var(--radius-sm)] px-4 py-3 text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-emphasis)] focus:outline-none focus:border-[var(--color-mineral)] resize-y"
        style={{
          borderColor: error ? "var(--color-signal)" : "var(--color-neutral-100)",
          fontFamily: "var(--font-sans-loaded), var(--font-sans)",
          fontSize: "var(--text-body)",
          lineHeight: 1.55,
          minHeight: "100px",
        }}
      />
    </QuoteFieldGroup>
  );
}
