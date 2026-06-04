"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { QuoteInput } from "@/components/business/quote/QuoteInput";
import { QuoteRadioGroup } from "@/components/business/quote/QuoteRadioGroup";
import { QuoteCheckboxGroup } from "@/components/business/quote/QuoteCheckboxGroup";
import { QuoteTextarea } from "@/components/business/quote/QuoteTextarea";
import { getSupabase } from "@/lib/supabase/browser";
import {
  type CareersFormState,
  initialCareersState,
  BOROUGH_OPTIONS,
  EXPERIENCE_OPTIONS,
  LANGUAGE_OPTIONS,
  HOURS_OPTIONS,
  RTW_OPTIONS,
  DBS_OPTIONS,
  SELF_EMPLOYED_OPTIONS,
} from "@/lib/careers";

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isValid(state: CareersFormState): { valid: boolean; firstError?: string } {
  if (state.name.trim().length === 0) return { valid: false, firstError: "name" };
  if (!isEmail(state.email)) return { valid: false, firstError: "email" };
  if (state.phone.trim().length === 0) return { valid: false, firstError: "phone" };
  if (!state.boroughPreference) return { valid: false, firstError: "boroughPreference" };
  if (!state.experienceMonths) return { valid: false, firstError: "experienceMonths" };
  if (state.languages.length === 0) return { valid: false, firstError: "languages" };
  if (!state.hoursPerWeek) return { valid: false, firstError: "hoursPerWeek" };
  if (!state.rightToWork) return { valid: false, firstError: "rightToWork" };
  if (!state.dbsWilling) return { valid: false, firstError: "dbsWilling" };
  if (!state.selfEmployedOk) return { valid: false, firstError: "selfEmployedOk" };
  if (state.references.trim().length === 0) return { valid: false, firstError: "references" };
  return { valid: true };
}

export function CareersForm() {
  const [state, setState] = useState<CareersFormState>(initialCareersState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [showErrors, setShowErrors] = useState(false);

  function update<K extends keyof CareersFormState>(key: K, value: CareersFormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  async function submit() {
    const validation = isValid(state);
    if (!validation.valid) {
      setShowErrors(true);
      if (validation.firstError) {
        const el = document.getElementById(validation.firstError);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const { data, error } = await getSupabase().functions.invoke(
        "submit-contractor-application",
        { body: state },
      );
      if (error) throw error;
      if (!data?.ok)
        throw new Error(
          "Submission did not confirm. Please try again or email careers@tarnshire.co.uk.",
        );
      setSubmittedRef(data.id ?? null);
      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-20 md:py-28 bg-[var(--color-bone)]" id="apply">
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
            Thanks. We&apos;ll be in touch within five working days.
          </h2>
          <p
            className="text-[var(--color-neutral-700)] mx-auto max-w-[560px] mb-6"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}
          >
            We read every application. If your experience and right-to-work status match the
            standards on this page, we&apos;ll invite you to a 30-minute conversation. If not,
            we&apos;ll write back and tell you why.
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

  const v = isValid(state);
  const err = (field: string) => showErrors && v.firstError === field;

  return (
    <section
      className="py-20 md:py-28 bg-[var(--color-bone)]"
      id="apply"
      aria-label="Application form"
    >
      <Container width="narrow">
        <div className="mb-12">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Apply
          </p>
          <h2
            className="font-medium text-[var(--color-ink)] mb-5"
            style={{
              fontFamily: "var(--font-display-loaded), var(--font-display)",
              fontSize: "var(--text-display-md)",
              lineHeight: 1.05,
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            Tell us about yourself.
          </h2>
          <p
            className="text-[var(--color-neutral-700)] max-w-[560px]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}
          >
            Thirteen questions across three short sections. Takes about five minutes. We respond to
            every application within five working days.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {/* Section 1: About you */}
          <div>
            <h3
              className="font-medium text-[var(--color-ink)] mb-8 pb-4 border-b border-[var(--color-neutral-100)]"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-heading-lg)",
                lineHeight: 1.2,
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              About you
            </h3>
            <div className="flex flex-col gap-8">
              <QuoteInput
                id="name"
                label="Your name"
                required
                autoComplete="name"
                value={state.name}
                onChange={(v) => update("name", v)}
                error={err("name") ? "Tell us your name." : undefined}
              />
              <QuoteInput
                id="email"
                label="Email"
                type="email"
                required
                autoComplete="email"
                value={state.email}
                onChange={(v) => update("email", v)}
                error={err("email") ? "Enter a valid email address." : undefined}
              />
              <QuoteInput
                id="phone"
                label="Phone"
                type="tel"
                required
                autoComplete="tel"
                value={state.phone}
                onChange={(v) => update("phone", v)}
                helper="We need a phone for scheduling the interview."
                error={err("phone") ? "Tell us a phone number." : undefined}
              />
              <QuoteRadioGroup
                name="boroughPreference"
                label="Where would you work?"
                options={BOROUGH_OPTIONS}
                required
                value={state.boroughPreference}
                onChange={(v) => update("boroughPreference", v)}
                error={
                  err("boroughPreference")
                    ? "Pick a borough. 'Any of the three' is a valid answer."
                    : undefined
                }
              />
              <QuoteRadioGroup
                name="experienceMonths"
                label="Months of paid housekeeping experience"
                options={EXPERIENCE_OPTIONS}
                required
                value={state.experienceMonths}
                onChange={(v) => update("experienceMonths", v)}
                error={err("experienceMonths") ? "Pick your experience level." : undefined}
              />
              <QuoteCheckboxGroup
                label="Languages you speak"
                options={LANGUAGE_OPTIONS}
                required
                helper="Pick all that apply."
                value={state.languages}
                onChange={(v) => update("languages", v)}
                error={err("languages") ? "Pick at least one language." : undefined}
              />
              <QuoteRadioGroup
                name="hoursPerWeek"
                label="Hours per week you can work"
                options={HOURS_OPTIONS}
                required
                value={state.hoursPerWeek}
                onChange={(v) => update("hoursPerWeek", v)}
                error={err("hoursPerWeek") ? "Pick a range." : undefined}
              />
              <QuoteTextarea
                id="whyTarnshire"
                label="Why Tarnshire?"
                value={state.whyTarnshire}
                onChange={(v) => update("whyTarnshire", v)}
                helper="One or two sentences. Optional but reads well at the interview."
                placeholder="Optional. What makes Tarnshire interesting to you?"
                rows={3}
              />
            </div>
          </div>

          {/* Section 2: The basics */}
          <div>
            <h3
              className="font-medium text-[var(--color-ink)] mb-8 pb-4 border-b border-[var(--color-neutral-100)]"
              style={{
                fontFamily: "var(--font-display-loaded), var(--font-display)",
                fontSize: "var(--text-heading-lg)",
                lineHeight: 1.2,
                letterSpacing: "var(--tracking-heading)",
              }}
            >
              The basics
            </h3>
            <div className="flex flex-col gap-8">
              <QuoteRadioGroup
                name="rightToWork"
                label="UK right to work?"
                options={RTW_OPTIONS}
                required
                value={state.rightToWork}
                onChange={(v) => update("rightToWork", v)}
                error={
                  err("rightToWork")
                    ? "Required. Tarnshire only contracts UK right-to-work holders."
                    : undefined
                }
              />
              <QuoteRadioGroup
                name="dbsWilling"
                label="Willing to undergo DBS check?"
                options={DBS_OPTIONS}
                required
                value={state.dbsWilling}
                onChange={(v) => update("dbsWilling", v)}
                error={
                  err("dbsWilling")
                    ? "Required. DBS is non-negotiable for every contractor."
                    : undefined
                }
              />
              <QuoteRadioGroup
                name="selfEmployedOk"
                label="Happy with self-employed contractor model?"
                options={SELF_EMPLOYED_OPTIONS}
                required
                value={state.selfEmployedOk}
                onChange={(v) => update("selfEmployedOk", v)}
                error={err("selfEmployedOk") ? "Tell us either way. Useful to know." : undefined}
              />
              <QuoteTextarea
                id="references"
                label="Two references"
                required
                value={state.references}
                onChange={(v) => update("references", v)}
                helper="For each reference: their name, contact email or phone, and your relationship (former employer, agency manager, etc.). We contact both before we extend a contract."
                placeholder="Reference 1: Name, contact, relationship&#10;Reference 2: Name, contact, relationship"
                rows={6}
                error={err("references") ? "We need at least two references." : undefined}
              />
              <QuoteTextarea
                id="anythingElse"
                label="Anything else?"
                value={state.anythingElse}
                onChange={(v) => update("anythingElse", v)}
                helper="Optional. Tell us anything else we should know about your application."
                placeholder="Optional"
                rows={3}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-4 mt-4 pt-8 border-t border-[var(--color-neutral-100)]">
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
            {showErrors && !v.valid ? (
              <p
                className="text-[var(--color-signal)]"
                style={{ fontSize: "var(--text-body-sm)" }}
                role="alert"
              >
                Some required fields are still empty. Scroll up. The first one is highlighted.
              </p>
            ) : null}
            <div className="flex items-center justify-end">
              <Button
                onClick={submit}
                variant="primary"
                size="lg"
                className={isSubmitting ? "opacity-60 cursor-wait pointer-events-none" : ""}
              >
                {isSubmitting ? "Sending..." : "Send application"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
