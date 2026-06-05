"use client";

import { useState } from "react";
import {
  Elements,
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  loadStripe,
  type Stripe,
  type StripeExpressCheckoutElementOptions,
  type StripeExpressCheckoutElementReadyEvent,
  type StripeExpressCheckoutElementConfirmEvent,
} from "@stripe/stripe-js";
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

// Express wallet row config. Apple's and Google's own brand rules govern how the
// buttons look, so we set only theme, type, and height (never arbitrary
// colours): black sits with the ink/bone palette, "book" suits a booking, and
// 55px is Stripe's maximum button height, the closest match to the tall lg Pay
// button below. Apple Pay and Google Pay only; Link and PayPal are off so this
// stays a strict two-wallet row. maxColumns 1 keeps each button full-width and
// prominent on mobile.
const EXPRESS_CHECKOUT_OPTIONS: StripeExpressCheckoutElementOptions = {
  buttonHeight: 55,
  buttonTheme: { applePay: "black", googlePay: "black" },
  buttonType: { applePay: "book", googlePay: "book" },
  layout: { maxColumns: 1, overflow: "never" },
  paymentMethods: {
    applePay: "auto",
    googlePay: "auto",
    link: "never",
    paypal: "never",
    amazonPay: "never",
  },
};

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
  // Whether at least one express wallet (Apple Pay or Google Pay) can show. The
  // ExpressCheckoutElement is always mounted so its onReady can tell us; until a
  // wallet is confirmed we render no divider and reserve no space, so a browser
  // with no wallet sees no empty block and no shift above the card form.
  const [walletAvailable, setWalletAvailable] = useState(false);

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

  function handleExpressReady(event: StripeExpressCheckoutElementReadyEvent) {
    const methods = event.availablePaymentMethods;
    setWalletAvailable(!!methods && (methods.applePay || methods.googlePay));
  }

  // The wallet path, mirroring handlePay. The wallet sheet has already collected
  // payment, so there is no elements.submit() step; we confirm the same
  // PaymentIntent and, with no redirect needed, finish via onSuccess. On error
  // we surface it through the shared error UI and tell the wallet sheet it
  // failed so it does not hang open.
  async function handleExpressConfirm(event: StripeExpressCheckoutElementConfirmEvent) {
    if (!stripe || !elements) return;
    setError(null);

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
      event.paymentFailed({ reason: "fail" });
      return;
    }

    onSuccess();
  }

  const amount = (amountPence / 100).toFixed(2);

  return (
    <div className="flex flex-col">
      {/* One-tap wallet row, above the card form. The element is always mounted
          so onReady can report availability; only once Apple Pay or Google Pay
          is confirmed do the buttons, the "or pay by card" divider, and the
          spacing below appear. On a browser with no wallet the element collapses
          to nothing and we render no divider, so there is no gap and no shift. */}
      <div className={walletAvailable ? "flex flex-col gap-6 mb-6" : "flex flex-col gap-6"}>
        <ExpressCheckoutElement
          options={EXPRESS_CHECKOUT_OPTIONS}
          onReady={handleExpressReady}
          onConfirm={handleExpressConfirm}
        />
        {walletAvailable ? (
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-[var(--color-neutral-100)]" aria-hidden />
            <span
              className="uppercase text-[var(--color-neutral-500)]"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              Or pay by card
            </span>
            <span className="h-px flex-1 bg-[var(--color-neutral-100)]" aria-hidden />
          </div>
        ) : null}
      </div>

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
    </div>
  );
}
