"use client";
import { QuoteFieldGroup } from "./QuoteFieldGroup";

type Option = { value: string; label: string; helper?: string };
type Props = {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
  helper?: string;
  error?: string;
  value: string;
  onChange: (v: string) => void;
};

export function QuoteRadioGroup({
  name,
  label,
  options,
  required,
  helper,
  error,
  value,
  onChange,
}: Props) {
  return (
    <QuoteFieldGroup label={label} required={required} helper={helper} error={error}>
      <div role="radiogroup" aria-invalid={!!error} className="flex flex-col gap-2.5">
        {options.map((o) => (
          <label
            key={o.value}
            className="flex items-start gap-3 p-4 border rounded-[var(--radius-sm)] cursor-pointer transition-colors duration-[var(--duration-fast)] ease-[var(--ease-emphasis)] hover:bg-[var(--color-bone-soft)]"
            style={{
              borderColor:
                value === o.value ? "var(--color-mineral)" : "var(--color-neutral-100)",
            }}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="mt-1 accent-[var(--color-mineral)]"
            />
            <span className="flex flex-col gap-1">
              <span
                className="text-[var(--color-ink)] font-medium"
                style={{ fontSize: "var(--text-body)", lineHeight: 1.35 }}
              >
                {o.label}
              </span>
              {o.helper ? (
                <span
                  className="text-[var(--color-neutral-500)]"
                  style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.5 }}
                >
                  {o.helper}
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
    </QuoteFieldGroup>
  );
}
