"use client";
import { Button } from "@/components/ui/Button";

type Props = {
  canBack: boolean;
  canNext: boolean;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
};

export function QuoteStepNav({ canBack, canNext, onBack, onNext, nextLabel = "Next" }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-[var(--color-neutral-100)]">
      <button
        type="button"
        onClick={onBack}
        disabled={!canBack}
        className="text-[var(--color-ink)] font-medium hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[var(--color-ink)]"
        style={{ fontSize: "var(--text-body)" }}
      >
        ← Back
      </button>
      <Button
        onClick={onNext}
        variant="primary"
        size="lg"
        className={canNext ? "" : "opacity-30 cursor-not-allowed pointer-events-none"}
      >
        {nextLabel}
      </Button>
    </div>
  );
}
