import type { ReactNode } from "react";

type Props = {
  label: string;
  htmlFor?: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: ReactNode;
};

export function QuoteFieldGroup({ label, htmlFor, required, helper, error, children }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-[var(--color-ink)] font-medium"
        style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.3 }}
      >
        {label}
        {required ? (
          <span className="text-[var(--color-mineral)] ml-1.5" aria-hidden>
            ·
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p
          className="text-[var(--color-signal)]"
          style={{ fontSize: "var(--text-caption)", lineHeight: 1.5 }}
          role="alert"
        >
          {error}
        </p>
      ) : helper ? (
        <p
          className="text-[var(--color-neutral-500)]"
          style={{ fontSize: "var(--text-caption)", lineHeight: 1.5 }}
        >
          {helper}
        </p>
      ) : null}
    </div>
  );
}
