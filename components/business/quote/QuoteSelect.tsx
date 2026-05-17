"use client";
import { QuoteFieldGroup } from "./QuoteFieldGroup";

type Option = { value: string; label: string };
type Props = {
  id: string;
  label: string;
  options: Option[];
  required?: boolean;
  helper?: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export function QuoteSelect({
  id,
  label,
  options,
  required,
  helper,
  error,
  value,
  onChange,
  placeholder = "Choose one",
}: Props) {
  return (
    <QuoteFieldGroup label={label} htmlFor={id} required={required} helper={helper} error={error}>
      <select
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className="w-full bg-[var(--color-bone)] border rounded-[var(--radius-sm)] px-4 py-3 text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-emphasis)] focus:outline-none focus:border-[var(--color-mineral)]"
        style={{
          borderColor: error ? "var(--color-signal)" : "var(--color-neutral-100)",
          fontFamily: "var(--font-sans-loaded), var(--font-sans)",
          fontSize: "var(--text-body)",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </QuoteFieldGroup>
  );
}
