"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { QuoteProgress } from "./QuoteProgress";
import { QuoteStepNav } from "./QuoteStepNav";
import { QuoteSelect } from "./QuoteSelect";
import { QuoteRadioGroup } from "./QuoteRadioGroup";
import { QuoteCheckboxGroup } from "./QuoteCheckboxGroup";
import { QuoteInput } from "./QuoteInput";
import { QuoteDateInput } from "./QuoteDateInput";
import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase/browser";
import { type QuoteState, initialQuoteState, type StepId } from "./types";

const SECTOR_OPTIONS = [
  { value: "offices", label: "Offices" },
  { value: "gyms", label: "Gyms & studios" },
  { value: "retail", label: "Retail" },
  { value: "education", label: "Education" },
  { value: "hospitality", label: "Hospitality" },
  { value: "other", label: "Something else" },
];

const SIZE_BAND_OPTIONS = [
  {
    value: "lt_5k",
    label: "Under 5,000 sqft",
    helper: "Small office, single-floor studio, independent retail unit.",
  },
  {
    value: "5k_15k",
    label: "5,000 – 15,000 sqft",
    helper: "Mid-size office, multi-floor studio, larger retail.",
  },
  {
    value: "15k_50k",
    label: "15,000 – 50,000 sqft",
    helper: "Large office, education building, hotel.",
  },
  {
    value: "gt_50k",
    label: "Over 50,000 sqft",
    helper: "Large education or hospitality campus, multi-building site.",
  },
  { value: "unknown", label: "Not sure", helper: "We'll measure at the walkthrough." },
];

const FREQUENCY_OPTIONS = [
  { value: "daily", label: "Daily", helper: "Five or seven days a week." },
  { value: "weekly", label: "Weekly", helper: "Once a week, same day each week." },
  { value: "twice_weekly", label: "Two or three times a week" },
  { value: "fortnightly", label: "Fortnightly" },
  { value: "monthly", label: "Monthly" },
  {
    value: "one_off",
    label: "One-off or specialist",
    helper: "Single deep-clean, post-build, end-of-tenancy.",
  },
];

const SCOPE_OPTIONS = [
  { value: "full_clean", label: "Full clean", helper: "All accessible areas to standard." },
  { value: "kitchen_wc", label: "Kitchens and restrooms only" },
  { value: "windows", label: "Windows (internal)" },
  {
    value: "windows_external",
    label: "Windows (external)",
    helper: "Ladder work to two storeys included.",
  },
  {
    value: "specialist",
    label: "Specialist scope",
    helper: "Carpets, upholstery, hard-floor restoration, oven cleans.",
  },
];

const COMPLIANCE_OPTIONS = [
  { value: "dbs", label: "DBS-checked operatives", helper: "Standard for most commercial scopes." },
  {
    value: "enhanced_dbs",
    label: "Enhanced DBS clearance",
    helper: "Required for any education setting.",
  },
  {
    value: "iso_documentation",
    label: "ISO 9001 / 14001 documentation",
    helper: "Tarnshire targets certification Q4 2026 / Q1 2027.",
  },
  {
    value: "coshh_assessment",
    label: "Site-specific COSHH risk assessment",
    helper: "Produced at walkthrough, signed off before first clean.",
  },
  {
    value: "healthcare_grade",
    label: "Healthcare-grade infection control",
    helper: "Phase 3 — by referral only, opens Q3 2026.",
    disabled: true,
  },
];

const TIME_SLOT_OPTIONS = [
  { value: "morning", label: "Morning", helper: "Between 9am and 12pm." },
  { value: "afternoon", label: "Afternoon", helper: "Between 1pm and 5pm." },
  { value: "either", label: "Either works" },
];

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function validateStep(state: QuoteState, step: StepId): boolean {
  switch (step) {
    case 1:
      return !!state.sector && !!state.sizeBand && !!state.numSites;
    case 2:
      return !!state.frequency && state.scope.length > 0;
    case 3:
      return true;
    case 4:
      return !!state.walkthroughDate && !!state.walkthroughTimeSlot;
    case 5:
      return (
        state.contactName.trim().length > 0 &&
        isEmail(state.contactEmail) &&
        state.contactCompany.trim().length > 0
      );
    case 6:
      return true;
    default:
      return false;
  }
}

export function QuoteFlow() {
  const [step, setStep] = useState<StepId>(1);
  const [state, setState] = useState<QuoteState>(initialQuoteState);
  const [submitted, setSubmitted] = useState(false);
  const [attemptedAdvance, setAttemptedAdvance] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  function update<K extends keyof QuoteState>(key: K, value: QuoteState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function next() {
    if (!validateStep(state, step)) {
      setAttemptedAdvance(true);
      return;
    }
    setAttemptedAdvance(false);
    if (step < 6) setStep((step + 1) as StepId);
  }

  function back() {
    setAttemptedAdvance(false);
    if (step > 1) setStep((step - 1) as StepId);
  }

  async function submit() {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const { data, error } = await getSupabase().functions.invoke("submit-quote-request", {
        body: state,
      });
      if (error) throw error;
      if (!data?.ok) {
        throw new Error(
          "Submission did not confirm. Please try again or email hello@tarnshire.co.uk.",
        );
      }
      setSubmittedRef(data.id ?? null);
      setSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-16 md:py-24 bg-[var(--color-bone)]">
        <Container width="narrow" className="text-center">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-5"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Sent
          </p>
          <h2
            className="font-medium text-[var(--color-ink)] mb-6"
            style={{
              fontFamily: "var(--font-display-loaded), var(--font-display)",
              fontSize: "var(--text-display-lg)",
              lineHeight: 1.0,
              letterSpacing: "var(--tracking-display)",
            }}
          >
            Thanks. We&apos;ll be in touch within 24 working hours.
          </h2>
          <p
            className="text-[var(--color-neutral-700)] mx-auto max-w-[560px] mb-6"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}
          >
            A confirmation will land in your inbox shortly. Our operations lead will reach out within 24 working hours, Monday to Friday, to confirm walkthrough details.
          </p>
          {submittedRef ? (
            <p
              className="text-[var(--color-neutral-500)] uppercase"
              style={{ fontSize: "var(--text-caption)", letterSpacing: "var(--tracking-caption)" }}
            >
              Reference: {submittedRef}
            </p>
          ) : null}
        </Container>
      </section>
    );
  }

  const showErrors = attemptedAdvance && !validateStep(state, step);

  return (
    <section className="py-16 md:py-24 bg-[var(--color-bone)]">
      <Container width="narrow">
        <QuoteProgress currentStep={step} />

        {step === 1 ? (
          <div className="flex flex-col gap-8">
            <h2
              className="font-medium text-[var(--color-ink)]"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-display-md)",
                lineHeight: 1.05,
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              Tell us about the building.
            </h2>
            <QuoteSelect
              id="sector"
              label="Sector"
              options={SECTOR_OPTIONS}
              required
              value={state.sector}
              onChange={(v) => update("sector", v)}
              error={showErrors && !state.sector ? "Pick a sector to continue." : undefined}
            />
            <QuoteRadioGroup
              name="sizeBand"
              label="Building size"
              options={SIZE_BAND_OPTIONS}
              required
              value={state.sizeBand}
              onChange={(v) => update("sizeBand", v)}
              error={
                showErrors && !state.sizeBand
                  ? "Pick a size band — 'Not sure' is a valid answer."
                  : undefined
              }
            />
            <QuoteInput
              id="numSites"
              label="Number of sites"
              type="text"
              required
              value={state.numSites}
              onChange={(v) => update("numSites", v)}
              helper="If you have multiple buildings, enter the total."
            />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="flex flex-col gap-8">
            <h2
              className="font-medium text-[var(--color-ink)]"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-display-md)",
                lineHeight: 1.05,
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              How often, and what scope.
            </h2>
            <QuoteRadioGroup
              name="frequency"
              label="Frequency"
              options={FREQUENCY_OPTIONS}
              required
              value={state.frequency}
              onChange={(v) => update("frequency", v)}
              error={showErrors && !state.frequency ? "Pick a frequency to continue." : undefined}
            />
            <QuoteCheckboxGroup
              label="Scope"
              options={SCOPE_OPTIONS}
              required
              helper="Choose all that apply."
              value={state.scope}
              onChange={(v) => update("scope", v)}
              error={
                showErrors && state.scope.length === 0
                  ? "Pick at least one scope item."
                  : undefined
              }
            />
          </div>
        ) : null}

        {step === 3 ? (
          <div className="flex flex-col gap-8">
            <h2
              className="font-medium text-[var(--color-ink)]"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-display-md)",
                lineHeight: 1.05,
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              Compliance requirements.
            </h2>
            <QuoteCheckboxGroup
              label="Required for your contract"
              options={COMPLIANCE_OPTIONS}
              helper="Optional — pick any that apply to your sector or procurement requirements."
              value={state.compliance}
              onChange={(v) => update("compliance", v)}
            />
          </div>
        ) : null}

        {step === 4 ? (
          <div className="flex flex-col gap-8">
            <h2
              className="font-medium text-[var(--color-ink)]"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-display-md)",
                lineHeight: 1.05,
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              When can we visit?
            </h2>
            <p
              className="text-[var(--color-neutral-700)]"
              style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}
            >
              Tarnshire commits to a walkthrough within five working days of your request. Pick your earliest convenient day and we&apos;ll confirm a specific time.
            </p>
            <QuoteDateInput
              id="walkthroughDate"
              label="Preferred walkthrough date"
              required
              value={state.walkthroughDate}
              onChange={(v) => update("walkthroughDate", v)}
              minDate={todayISO()}
              error={
                showErrors && !state.walkthroughDate ? "Pick a date to continue." : undefined
              }
            />
            <QuoteRadioGroup
              name="walkthroughTimeSlot"
              label="Preferred time"
              options={TIME_SLOT_OPTIONS}
              required
              value={state.walkthroughTimeSlot}
              onChange={(v) => update("walkthroughTimeSlot", v)}
              error={
                showErrors && !state.walkthroughTimeSlot
                  ? "Pick a time slot to continue."
                  : undefined
              }
            />
          </div>
        ) : null}

        {step === 5 ? (
          <div className="flex flex-col gap-8">
            <h2
              className="font-medium text-[var(--color-ink)]"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-display-md)",
                lineHeight: 1.05,
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              Your details.
            </h2>
            <QuoteInput
              id="contactName"
              label="Your name"
              required
              autoComplete="name"
              value={state.contactName}
              onChange={(v) => update("contactName", v)}
              error={
                showErrors && state.contactName.trim().length === 0
                  ? "Tell us your name."
                  : undefined
              }
            />
            <QuoteInput
              id="contactRole"
              label="Role"
              autoComplete="organization-title"
              value={state.contactRole}
              onChange={(v) => update("contactRole", v)}
              helper="Optional — e.g. Facilities Manager, Operations Director."
            />
            <QuoteInput
              id="contactCompany"
              label="Company"
              required
              autoComplete="organization"
              value={state.contactCompany}
              onChange={(v) => update("contactCompany", v)}
              error={
                showErrors && state.contactCompany.trim().length === 0
                  ? "Tell us the company name."
                  : undefined
              }
            />
            <QuoteInput
              id="contactEmail"
              label="Email"
              type="email"
              required
              autoComplete="email"
              value={state.contactEmail}
              onChange={(v) => update("contactEmail", v)}
              error={
                showErrors && !isEmail(state.contactEmail)
                  ? "Enter a valid email address."
                  : undefined
              }
            />
            <QuoteInput
              id="contactPhone"
              label="Phone"
              type="tel"
              autoComplete="tel"
              value={state.contactPhone}
              onChange={(v) => update("contactPhone", v)}
              helper="Optional — but speeds up the walkthrough confirmation."
            />
          </div>
        ) : null}

        {step === 6 ? (
          <div className="flex flex-col gap-8">
            <h2
              className="font-medium text-[var(--color-ink)]"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-display-md)",
                lineHeight: 1.05,
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              Everything looks right?
            </h2>
            <dl className="flex flex-col divide-y divide-[var(--color-neutral-100)] border-t border-b border-[var(--color-neutral-100)]">
              {[
                {
                  label: "Sector",
                  value: SECTOR_OPTIONS.find((o) => o.value === state.sector)?.label ?? "—",
                },
                {
                  label: "Building size",
                  value:
                    SIZE_BAND_OPTIONS.find((o) => o.value === state.sizeBand)?.label ?? "—",
                },
                { label: "Number of sites", value: state.numSites },
                {
                  label: "Frequency",
                  value:
                    FREQUENCY_OPTIONS.find((o) => o.value === state.frequency)?.label ?? "—",
                },
                {
                  label: "Scope",
                  value:
                    state.scope
                      .map((v) => SCOPE_OPTIONS.find((o) => o.value === v)?.label)
                      .filter(Boolean)
                      .join(", ") || "—",
                },
                {
                  label: "Compliance",
                  value:
                    state.compliance
                      .map((v) => COMPLIANCE_OPTIONS.find((o) => o.value === v)?.label)
                      .filter(Boolean)
                      .join(", ") || "None specified",
                },
                { label: "Walkthrough date", value: state.walkthroughDate || "—" },
                {
                  label: "Walkthrough time",
                  value:
                    TIME_SLOT_OPTIONS.find((o) => o.value === state.walkthroughTimeSlot)
                      ?.label ?? "—",
                },
                { label: "Name", value: state.contactName || "—" },
                { label: "Role", value: state.contactRole || "—" },
                { label: "Company", value: state.contactCompany || "—" },
                { label: "Email", value: state.contactEmail || "—" },
                { label: "Phone", value: state.contactPhone || "—" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <dt
                    className="text-[var(--color-neutral-500)] uppercase"
                    style={{
                      fontSize: "var(--text-label)",
                      letterSpacing: "var(--tracking-label)",
                    }}
                  >
                    {row.label}
                  </dt>
                  <dd
                    className="text-[var(--color-ink)] text-right max-w-[60%]"
                    style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.4 }}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col gap-4 mt-4">
              {submitError ? (
                <div
                  className="p-4 border border-[var(--color-signal)] rounded-[var(--radius-sm)] bg-[var(--color-bone)]"
                  role="alert"
                >
                  <p
                    className="text-[var(--color-signal)] font-medium mb-1"
                    style={{ fontSize: "var(--text-body-sm)" }}
                  >
                    Submission failed.
                  </p>
                  <p
                    className="text-[var(--color-neutral-700)]"
                    style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.5 }}
                  >
                    {submitError}
                  </p>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                  className="text-[var(--color-ink)] hover:text-[var(--color-mineral)] underline underline-offset-4 decoration-[0.5px] transition-colors duration-[var(--duration-fast)] disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  Edit details
                </button>
                <Button
                  onClick={submit}
                  variant="primary"
                  size="lg"
                  className={isSubmitting ? "opacity-60 cursor-wait pointer-events-none" : ""}
                >
                  {isSubmitting ? "Sending..." : "Send request"}
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {step < 6 ? (
          <QuoteStepNav
            canBack={step > 1}
            canNext={true}
            onBack={back}
            onNext={next}
            nextLabel={step === 5 ? "Review" : "Next"}
          />
        ) : null}
      </Container>
    </section>
  );
}
