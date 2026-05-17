"use client";
import { QuoteFieldGroup } from "./QuoteFieldGroup";

type Option = { value: string; label: string; helper?: string; disabled?: boolean };
type Props = {
  label: string;
  options: Option[];
  required?: boolean;
  helper?: string;
  error?: string;
  value: string[];
  onChange: (v: string[]) => void;
};

export function QuoteCheckboxGroup({
  label,
  options,
  required,
  helper,
  error,
  value,
  onChange,
}: Props) {
  const toggle = (val: string) =>
    onChange(value.includes(val) ? value.filter((v) => v !== val) : [...value, val]);
  return (
    <QuoteFieldGroup label={label} required={required} helper={helper} error={error}>
      <div aria-invalid={!!error} className="flex flex-col gap-2.5">
        {options.map((o) => {
          const checked = value.includes(o.value);
          return (
            <label
              key={o.value}
              className={`flex items-start gap-3 p-4 border rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-emphasis)] ${
                o.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-[var(--color-bone-soft)]"
              }`}
              style={{
                borderColor: checked ? "var(--color-mineral)" : "var(--color-neutral-100)",
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={o.disabled}
                onChange={() => !o.disabled && toggle(o.value)}
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
          );
        })}
      </div>
    </QuoteFieldGroup>
  );
}
