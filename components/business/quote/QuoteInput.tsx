"use client";
import { QuoteFieldGroup } from "./QuoteFieldGroup";

type Props = {
  id: string;
  label: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
  helper?: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  placeholder?: string;
};

export function QuoteInput({
  id,
  label,
  type = "text",
  required,
  helper,
  error,
  value,
  onChange,
  autoComplete,
  placeholder,
}: Props) {
  return (
    <QuoteFieldGroup label={label} htmlFor={id} required={required} helper={helper} error={error}>
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className="w-full bg-[var(--color-bone)] border rounded-[var(--radius-sm)] px-4 py-3 text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-emphasis)] focus:outline-none focus:border-[var(--color-mineral)]"
        style={{
          borderColor: error ? "var(--color-signal)" : "var(--color-neutral-100)",
          fontFamily: "var(--font-sans-loaded), var(--font-sans)",
          fontSize: "var(--text-body)",
        }}
      />
    </QuoteFieldGroup>
  );
}
