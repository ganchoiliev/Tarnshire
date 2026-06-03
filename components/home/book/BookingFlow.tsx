"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { QuoteInput } from "@/components/business/quote/QuoteInput";
import { QuoteRadioGroup } from "@/components/business/quote/QuoteRadioGroup";
import { QuoteCheckboxGroup } from "@/components/business/quote/QuoteCheckboxGroup";
import { QuoteDateInput } from "@/components/business/quote/QuoteDateInput";
import { QuoteTextarea } from "@/components/business/quote/QuoteTextarea";
import { StripePaymentStep } from "./StripePaymentStep";
import { getSupabase } from "@/lib/supabase/browser";
import {
  type BookingState,
  type ServiceType,
  initialBookingState,
  type StepId,
  STEP_LABELS,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  ADDITIONAL_ROOM_OPTIONS,
  FREQUENCY_OPTIONS,
  TIME_SLOT_OPTIONS,
  isLaunchPostcode,
  calculatePricePerVisit,
  formatGBP,
  serviceTypeLabel,
} from "@/lib/booking";

// Short, phone-friendly labels for the four-step progress indicator. The full
// STEP_LABELS still drive the screen-reader announcement (aria-valuetext) and
// each step's own heading; these just keep the stepper legible four-up on a
// narrow viewport.
const STEP_SHORT_LABELS: Record<StepId, string> = {
  1: "Postcode",
  2: "Home",
  3: "Visit",
  4: "Details",
};

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function validateStep(state: BookingState, step: StepId): boolean {
  switch (step) {
    case 1:
      return state.postcode.trim().length > 0 && isLaunchPostcode(state.postcode);
    case 2:
      return !!state.bedrooms && !!state.bathrooms && !!state.frequency;
    case 3:
      return !!state.preferredDate && !!state.preferredTimeSlot;
    case 4:
      return (
        state.contactName.trim().length > 0 &&
        isEmail(state.contactEmail) &&
        state.contactPhone.trim().length > 0
      );
    default:
      return false;
  }
}

type BookingFlowProps = {
  initialServiceType?: ServiceType;
};

export function BookingFlow({ initialServiceType = "standard" }: BookingFlowProps = {}) {
  const [step, setStep] = useState<StepId>(1);
  const [state, setState] = useState<BookingState>({
    ...initialBookingState,
    serviceType: initialServiceType,
    frequency: initialServiceType === "deep_clean" ? "one_off" : "",
  });
  const [attemptedAdvance, setAttemptedAdvance] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | "booking" | "waitlist">(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [amountPence, setAmountPence] = useState<number | null>(null);
  const [paymentStarted, setPaymentStarted] = useState(false);

  function update<K extends keyof BookingState>(key: K, value: BookingState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  const postcodeIsOutsideLaunch =
    state.postcode.trim().length > 0 && !isLaunchPostcode(state.postcode);

  function next() {
    if (!validateStep(state, step)) {
      setAttemptedAdvance(true);
      return;
    }
    setAttemptedAdvance(false);
    if (step < 4) setStep((step + 1) as StepId);
  }

  function back() {
    setAttemptedAdvance(false);
    if (step > 1) setStep((step - 1) as StepId);
  }

  async function handleWaitlistSubmit() {
    if (!isEmail(state.waitlistEmail)) {
      setAttemptedAdvance(true);
      return;
    }
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const { data, error } = await getSupabase().functions.invoke("submit-waitlist", {
        body: { email: state.waitlistEmail, postcode: state.postcode },
      });
      if (error) throw error;
      if (!data?.ok) throw new Error("Waitlist signup failed. Please try again.");
      setSubmitted("waitlist");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleBookingSubmit() {
    if (!validateStep(state, 4)) {
      setAttemptedAdvance(true);
      return;
    }
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const { data, error } = await getSupabase().functions.invoke("create-booking", {
        body: state,
      });
      if (error) throw error;
      if (!data?.ok || !data.client_secret) {
        throw new Error("Booking setup failed. Please try again.");
      }
      setClientSecret(data.client_secret);
      setBookingId(data.booking_id);
      setAmountPence(data.amount_pence);
      setPaymentStarted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted === "waitlist") {
    return (
      <section className="py-16 md:py-24 bg-[var(--color-bone)]">
        <Container width="narrow" className="text-center">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-5"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Saved
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
            We&apos;ll be in touch when Tarnshire opens in{" "}
            {state.postcode.toUpperCase().slice(0, 3)}.
          </h2>
          <p
            className="text-[var(--color-neutral-700)] mx-auto max-w-[560px]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}
          >
            Tarnshire launches in Didsbury, Chorlton, and Withington first. Other South Manchester postcodes open through 2026. We&apos;ll email <strong>{state.waitlistEmail}</strong> as soon as your area is live.
          </p>
        </Container>
      </section>
    );
  }

  if (submitted === "booking") {
    return (
      <section className="py-16 md:py-24 bg-[var(--color-bone)]">
        <Container width="narrow" className="text-center">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-5"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Confirmed
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
            {state.serviceType === "deep_clean"
              ? "Deep clean confirmed. Payment received."
              : "Booking confirmed. Payment received."}
          </h2>
          <p
            className="text-[var(--color-neutral-700)] mx-auto max-w-[560px] mb-6"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}
          >
            {state.serviceType === "deep_clean" ? (
              <>
                A confirmation email is on its way to <strong>{state.contactEmail}</strong>. Our operations lead will contact you within 24 working hours to confirm whether one or two cleaners will attend on {state.preferredDate}.
              </>
            ) : (
              <>
                A confirmation email is on its way to <strong>{state.contactEmail}</strong>. Our operations lead will contact you within 24 working hours to confirm which cleaner will attend on {state.preferredDate}.
              </>
            )}
          </p>
          {bookingId ? (
            <p
              className="text-[var(--color-neutral-500)] uppercase"
              style={{ fontSize: "var(--text-caption)", letterSpacing: "var(--tracking-caption)" }}
            >
              Reference: {bookingId}
            </p>
          ) : null}
        </Container>
      </section>
    );
  }

  const showPrice = step >= 2 && !!state.bedrooms && !!state.frequency;
  const pricePerVisit = showPrice ? calculatePricePerVisit(state) : 0;
  const isOneOff = state.frequency === "one_off";
  const isDeepClean = state.serviceType === "deep_clean";

  const showErrors = attemptedAdvance && !validateStep(state, step);

  return (
    <section className="py-16 md:py-24 bg-[var(--color-bone)]">
      <Container width="narrow">
        <div className="mb-12">
          <p
            className="text-[var(--color-mineral)] font-medium uppercase mb-4"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            Step {step} of 4
          </p>
          {/* Progressbar widget: the role + aria-valuetext convey state to AT,
              so the four visual step markers below are decorative (aria-hidden).
              Using <ol>/<li> here would conflict with role="progressbar" (it
              strips list semantics and orphans the items), so this is a <div>. */}
          <div
            className="grid grid-cols-4 gap-x-2 gap-y-2.5"
            role="progressbar"
            aria-label="Booking progress"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={4}
            aria-valuetext={`Step ${step} of 4 — ${STEP_LABELS[step]}`}
          >
            {([1, 2, 3, 4] as StepId[]).map((s) => {
              const done = s < step;
              const current = s === step;
              return (
                <div key={s} className="flex flex-col gap-2" aria-hidden>
                  <span
                    className="h-[3px] rounded-full transition-colors duration-[var(--duration-base)] ease-[var(--ease-emphasis)]"
                    style={{
                      backgroundColor:
                        s <= step ? "var(--color-mineral)" : "var(--color-neutral-100)",
                    }}
                    aria-hidden
                  />
                  <span
                    className="font-medium uppercase transition-colors duration-[var(--duration-fast)]"
                    style={{
                      fontSize: "var(--text-label)",
                      letterSpacing: "var(--tracking-label)",
                      color: current
                        ? "var(--color-ink)"
                        : done
                          ? "var(--color-mineral)"
                          : "var(--color-neutral-500)",
                    }}
                  >
                    {STEP_SHORT_LABELS[s]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

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
              Your postcode.
            </h2>
            <p
              className="text-[var(--color-neutral-700)]"
              style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}
            >
              Tarnshire launches in M20 Didsbury, M21 Chorlton, and M14 Withington. Outside the triangle, you can join the waitlist.
            </p>
            <QuoteInput
              id="postcode"
              label="UK postcode"
              required
              value={state.postcode}
              onChange={(v) => update("postcode", v)}
              helper="Example: M20 4AB"
              placeholder="M20 4AB"
              error={
                showErrors && state.postcode.trim().length === 0
                  ? "Enter a UK postcode."
                  : undefined
              }
            />
            {postcodeIsOutsideLaunch ? (
              <div className="border border-[var(--color-neutral-100)] rounded-[var(--radius-sm)] p-6 bg-[var(--color-bone-soft)]">
                <p
                  className="text-[var(--color-mineral)] font-medium uppercase mb-3"
                  style={{
                    fontSize: "var(--text-label)",
                    letterSpacing: "var(--tracking-label)",
                  }}
                >
                  Outside the launch triangle
                </p>
                <p
                  className="text-[var(--color-ink)] font-medium mb-4"
                  style={{
                    fontFamily: "var(--font-display-loaded), var(--font-display)",
                    fontSize: "var(--text-heading-lg)",
                    lineHeight: 1.2,
                  }}
                >
                  We don&apos;t cover {state.postcode.toUpperCase().slice(0, 3)} yet.
                </p>
                <p
                  className="text-[var(--color-neutral-700)] mb-5"
                  style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}
                >
                  Tarnshire launches in M20, M21, and M14 first. Other South Manchester postcodes open through 2026. Leave your email and we&apos;ll let you know as soon as your area is live.
                </p>
                <QuoteInput
                  id="waitlistEmail"
                  label="Email"
                  type="email"
                  required
                  autoComplete="email"
                  value={state.waitlistEmail}
                  onChange={(v) => update("waitlistEmail", v)}
                  error={
                    attemptedAdvance && !isEmail(state.waitlistEmail)
                      ? "Enter a valid email address."
                      : undefined
                  }
                />
                <div className="mt-5">
                  <Button
                    onClick={handleWaitlistSubmit}
                    variant="primary"
                    size="lg"
                    className={isSubmitting ? "opacity-60 cursor-wait pointer-events-none" : ""}
                  >
                    {isSubmitting ? "Saving..." : "Join the waitlist"}
                  </Button>
                </div>
              </div>
            ) : null}
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
              {isDeepClean ? "Tell us about the home." : "Tell us about your home."}
            </h2>
            <QuoteRadioGroup
              name="bedrooms"
              label="Bedrooms"
              options={BEDROOM_OPTIONS}
              required
              value={state.bedrooms}
              onChange={(v) => update("bedrooms", v)}
              error={showErrors && !state.bedrooms ? "Pick a bedroom count." : undefined}
            />
            <QuoteRadioGroup
              name="bathrooms"
              label="Bathrooms"
              options={BATHROOM_OPTIONS}
              required
              value={state.bathrooms}
              onChange={(v) => update("bathrooms", v)}
              error={showErrors && !state.bathrooms ? "Pick a bathroom count." : undefined}
            />
            <QuoteCheckboxGroup
              label="Additional rooms"
              options={ADDITIONAL_ROOM_OPTIONS}
              helper="Optional. Tick any that apply."
              value={state.additionalRooms}
              onChange={(v) => update("additionalRooms", v)}
            />
            {isDeepClean ? (
              <div className="border border-[var(--color-neutral-100)] rounded-[var(--radius-sm)] p-6 bg-[var(--color-mineral-soft)]">
                <p
                  className="text-[var(--color-mineral-deep)] font-medium uppercase mb-2"
                  style={{
                    fontSize: "var(--text-label)",
                    letterSpacing: "var(--tracking-label)",
                  }}
                >
                  One-off deep clean
                </p>
                <p
                  className="text-[var(--color-ink)]"
                  style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}
                >
                  4-hour minimum visit. One cleaner for ~4 hours or two cleaners for ~2 hours, depending on availability — we&apos;ll confirm which within 24 working hours.
                </p>
              </div>
            ) : (
              <QuoteRadioGroup
                name="frequency"
                label="Frequency"
                options={FREQUENCY_OPTIONS}
                required
                value={state.frequency}
                onChange={(v) => update("frequency", v)}
                error={
                  showErrors && !state.frequency ? "Pick how often you want a visit." : undefined
                }
              />
            )}
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
              When should we visit?
            </h2>
            <p
              className="text-[var(--color-neutral-700)]"
              style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}
            >
              {isDeepClean
                ? "Pick your preferred date for the deep clean. We'll confirm a specific time within 24 working hours."
                : isOneOff
                  ? "Pick your preferred date for the one-off clean. We'll confirm a specific time within 24 working hours."
                  : "Pick your preferred date for your first visit. Future visits land on the same day each week."}
            </p>
            <QuoteDateInput
              id="preferredDate"
              label="First visit date"
              required
              value={state.preferredDate}
              onChange={(v) => update("preferredDate", v)}
              minDate={todayISO()}
              error={showErrors && !state.preferredDate ? "Pick a date to continue." : undefined}
            />
            <QuoteRadioGroup
              name="preferredTimeSlot"
              label="Preferred time"
              options={TIME_SLOT_OPTIONS}
              required
              value={state.preferredTimeSlot}
              onChange={(v) => update("preferredTimeSlot", v)}
              error={
                showErrors && !state.preferredTimeSlot ? "Pick a time slot." : undefined
              }
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
              {paymentStarted ? "Payment." : "Your details and payment."}
            </h2>
            {paymentStarted && clientSecret && bookingId && amountPence != null ? (
              <StripePaymentStep
                clientSecret={clientSecret}
                bookingId={bookingId}
                amountPence={amountPence}
                customerEmail={state.contactEmail}
                onSuccess={() => setSubmitted("booking")}
              />
            ) : (
              <>
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
                  id="contactEmail"
                  label="Email"
                  type="email"
                  required
                  autoComplete="email"
                  value={state.contactEmail}
                  onChange={(v) => update("contactEmail", v)}
                  helper="Booking confirmation goes here."
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
                  required
                  autoComplete="tel"
                  value={state.contactPhone}
                  onChange={(v) => update("contactPhone", v)}
                  helper="So your cleaner can text on arrival."
                  error={
                    showErrors && state.contactPhone.trim().length === 0
                      ? "Tell us a phone number."
                      : undefined
                  }
                />
                <QuoteTextarea
                  id="notes"
                  label="Notes"
                  value={state.notes}
                  onChange={(v) => update("notes", v)}
                  helper="Optional. Access instructions, pets, allergies, anything we should know."
                  rows={3}
                />
                <p
                  className="flex items-start gap-2.5 text-[var(--color-neutral-500)]"
                  style={{ fontSize: "var(--text-caption)", lineHeight: 1.5 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden
                    width="15"
                    height="15"
                    className="mt-px flex-shrink-0 text-[var(--color-mineral)]"
                  >
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  <span>
                    No payment is taken until you confirm on the next step. Your card
                    is handled securely by Stripe — Tarnshire never sees your card
                    number.
                  </span>
                </p>
              </>
            )}
          </div>
        ) : null}

        {!(step === 4 && paymentStarted) ? (
          <div className="flex flex-col gap-4 mt-12 pt-8 border-t border-[var(--color-neutral-100)]">
            {showPrice ? (
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <p
                    className="text-[var(--color-mineral)] font-medium uppercase"
                    style={{
                      fontSize: "var(--text-label)",
                      letterSpacing: "var(--tracking-label)",
                    }}
                  >
                    {serviceTypeLabel(state.serviceType)}
                  </p>
                  <p
                    className="text-[var(--color-neutral-500)]"
                    style={{ fontSize: "var(--text-caption)" }}
                  >
                    {isDeepClean
                      ? "4-hour minimum visit"
                      : isOneOff
                        ? "Estimated one-off price"
                        : "Estimated price per visit"}
                  </p>
                </div>
                <p
                  className="font-medium text-[var(--color-ink)]"
                  style={{
                    fontFamily: "var(--font-display-loaded), var(--font-display)",
                    fontSize: "var(--text-display-md)",
                    lineHeight: 1,
                  }}
                >
                  {formatGBP(pricePerVisit)}
                </p>
              </div>
            ) : null}
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
            {showErrors && !(step === 1 && postcodeIsOutsideLaunch) ? (
              <p
                role="status"
                aria-live="polite"
                className="text-[var(--color-signal)]"
                style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.5 }}
              >
                Add the highlighted details above to continue.
              </p>
            ) : null}
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={back}
                disabled={step === 1 || isSubmitting}
                className="text-[var(--color-ink)] font-medium hover:text-[var(--color-mineral)] transition-colors duration-[var(--duration-fast)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[var(--color-ink)]"
                style={{ fontSize: "var(--text-body)" }}
              >
                ← Back
              </button>
              {step < 4 ? (
                <Button
                  onClick={next}
                  variant="primary"
                  size="lg"
                  className={
                    postcodeIsOutsideLaunch && step === 1
                      ? "opacity-30 cursor-not-allowed pointer-events-none"
                      : ""
                  }
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleBookingSubmit}
                  variant="accent"
                  size="lg"
                  className={isSubmitting ? "opacity-60 cursor-wait pointer-events-none" : ""}
                >
                  {isSubmitting ? "Setting up payment..." : "Continue to payment"}
                </Button>
              )}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
