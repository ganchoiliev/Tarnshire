import { STEP_LABELS, type StepId } from "./types";

export function QuoteProgress({ currentStep }: { currentStep: StepId }) {
  const steps: StepId[] = [1, 2, 3, 4, 5, 6];
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-3">
        <p
          className="text-[var(--color-mineral)] font-medium uppercase"
          style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
        >
          Step {currentStep} of 6
        </p>
        <p
          className="text-[var(--color-neutral-500)] font-medium"
          style={{ fontSize: "var(--text-caption)" }}
        >
          {STEP_LABELS[currentStep]}
        </p>
      </div>
      <div
        className="flex gap-1.5"
        role="progressbar"
        aria-label="Quote request progress"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={6}
      >
        {steps.map((s) => (
          <span
            key={s}
            className="flex-1 h-[3px] rounded-full transition-colors duration-[var(--duration-base)] ease-[var(--ease-emphasis)]"
            style={{
              backgroundColor:
                s <= currentStep ? "var(--color-mineral)" : "var(--color-neutral-100)",
            }}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
