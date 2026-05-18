"use client";

import { useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/Button";

let stripePromise: Promise<Stripe | null> | null = null;
function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.error("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
      stripePromise = Promise.resolve(null);
    } else {
      stripePromise = loadStripe(key);
    }
  }
  return stripePromise;
}

type Props = {
  clientSecret: string;
  bookingId: string;
  amountPence: number;
  customerEmail: string;
  onSuccess: () => void;
};

export function StripePaymentStep({
  clientSecret,
  bookingId,
  amountPence,
  customerEmail,
  onSuccess,
}: Props) {
  return (
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret,
        appearance: {
          theme: "flat",
          variables: {
            colorPrimary: "#0E5E5A",
            colorText: "#15171A",
            colorBackground: "#F7F4EE",
            colorDanger: "#B8331E",
            fontFamily: '"DM Sans", system-ui, sans-serif',
            borderRadius: "4px",
          },
        },
      }}
    >
      <PaymentForm
        bookingId={bookingId}
        amountPence={amountPence}
        customerEmail={customerEmail}
        onSuccess={onSuccess}
      />
    </Elements>
  );
}

function PaymentForm({
  bookingId,
  amountPence,
  customerEmail,
  onSuccess,
}: Omit<Props, "clientSecret">) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    if (!stripe || !elements) return;
    setError(null);
    setIsSubmitting(true);

    const { error: submitErr } = await elements.submit();
    if (submitErr) {
      setError(submitErr.message ?? "Card validation failed.");
      setIsSubmitting(false);
      return;
    }

    const { error: confirmErr } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/home/book?confirmation=${bookingId}`,
        receipt_email: customerEmail,
      },
      redirect: "if_required",
    });

    if (confirmErr) {
      setError(confirmErr.message ?? "Payment failed. Please check your card and try again.");
      setIsSubmitting(false);
      return;
    }

    onSuccess();
  }

  const amount = (amountPence / 100).toFixed(2);

  return (
    <div className="flex flex-col gap-6">
      <div className="border border-[var(--color-neutral-100)] rounded-[var(--radius-sm)] p-6 bg-[var(--color-bone)]">
        <p
          className="text-[var(--color-mineral)] font-medium uppercase mb-4"
          style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
        >
          Payment · £{amount}
        </p>
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      {error ? (
        <div
          className="p-4 border border-[var(--color-signal)] rounded-[var(--radius-sm)] bg-[var(--color-bone)]"
          role="alert"
        >
          <p
            className="text-[var(--color-signal)] font-medium mb-1"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            Payment failed.
          </p>
          <p
            className="text-[var(--color-neutral-700)]"
            style={{ fontSize: "var(--text-body-sm)", lineHeight: 1.5 }}
          >
            {error}
          </p>
        </div>
      ) : null}

      <div className="flex justify-end">
        <Button
          onClick={handlePay}
          variant="accent"
          size="lg"
          className={
            !stripe || isSubmitting ? "opacity-60 cursor-wait pointer-events-none" : ""
          }
        >
          {isSubmitting ? "Processing..." : `Pay £${amount}`}
        </Button>
      </div>

      <p
        className="text-[var(--color-neutral-500)]"
        style={{ fontSize: "var(--text-caption)", lineHeight: 1.5 }}
      >
        Card details are processed by Stripe. Tarnshire never sees or stores your card number. Booking is confirmed when payment completes.
      </p>
    </div>
  );
}
