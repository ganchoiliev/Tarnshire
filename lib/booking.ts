export type ServiceType = "standard" | "deep_clean";

export type BookingState = {
  serviceType: ServiceType;
  postcode: string;
  waitlistEmail: string;
  bedrooms: string;
  bathrooms: string;
  additionalRooms: string[];
  frequency: string;
  preferredDate: string;
  preferredTimeSlot: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
};

export const initialBookingState: BookingState = {
  serviceType: "standard",
  postcode: "",
  waitlistEmail: "",
  bedrooms: "",
  bathrooms: "",
  additionalRooms: [],
  frequency: "",
  preferredDate: "",
  preferredTimeSlot: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  notes: "",
};

export type StepId = 1 | 2 | 3 | 4;

export const STEP_LABELS: Record<StepId, string> = {
  1: "Postcode",
  2: "About your home",
  3: "When we visit",
  4: "Details and payment",
};

export const LAUNCH_POSTCODES = ["M20", "M21", "M14"] as const;

export function isLaunchPostcode(input: string): boolean {
  const cleaned = input.toUpperCase().replace(/\s+/g, "");
  const prefix = cleaned.slice(0, 3);
  return (LAUNCH_POSTCODES as readonly string[]).includes(prefix);
}

export const BEDROOM_OPTIONS = [
  { value: "studio", label: "Studio", helper: "One open-plan room." },
  { value: "1", label: "1 bedroom" },
  { value: "2", label: "2 bedrooms" },
  { value: "3", label: "3 bedrooms" },
  { value: "4", label: "4 bedrooms" },
  { value: "5_plus", label: "5+ bedrooms" },
];

export const BATHROOM_OPTIONS = [
  { value: "1", label: "1 bathroom" },
  { value: "2", label: "2 bathrooms" },
  { value: "3", label: "3 bathrooms" },
  { value: "4_plus", label: "4+ bathrooms" },
];

export const ADDITIONAL_ROOM_OPTIONS = [
  { value: "reception", label: "Reception room" },
  { value: "dining", label: "Dining room" },
  { value: "home_office", label: "Home office" },
  { value: "conservatory", label: "Conservatory" },
  { value: "utility", label: "Utility room" },
  { value: "garage", label: "Garage", helper: "Light tidying, not deep clean." },
];

export const FREQUENCY_OPTIONS = [
  {
    value: "weekly",
    label: "Weekly",
    helper: "Same cleaner, same time, every week. Most customers choose this.",
  },
  { value: "fortnightly", label: "Fortnightly", helper: "Same cleaner, every two weeks." },
  { value: "monthly", label: "Monthly", helper: "Less frequent, with a small premium." },
  {
    value: "one_off",
    label: "One-off deep clean",
    helper: "Longer visit, top-to-bottom. Premium pricing.",
  },
];

export const TIME_SLOT_OPTIONS = [
  { value: "morning", label: "Morning", helper: "Between 9am and 12pm." },
  { value: "afternoon", label: "Afternoon", helper: "Between 1pm and 5pm." },
  { value: "either", label: "Either works" },
];

/**
 * Per-visit rate tables in GBP. Single source of truth for every price shown on
 * the site (pricing page, service cards, snapshots) and for the client-side
 * estimate. Mirrored in pence in supabase/functions/create-booking/index.ts
 * (calculatePricePence), from which the Stripe charge derives. BOTH MUST MATCH.
 */
export const STANDARD_BASE_RATES: Record<string, number> = {
  studio: 45,
  "1": 60,
  "2": 60,
  "3": 75,
  "4": 90,
  "5_plus": 105,
};

export const DEEP_CLEAN_RATES: Record<string, number> = {
  studio: 120,
  "1": 120,
  "2": 120,
  "3": 150,
  "4": 190,
  "5_plus": 230,
};

export const FREQUENCY_MULTIPLIERS: Record<string, number> = {
  weekly: 1.0,
  fortnightly: 1.0,
  monthly: 1.05,
  one_off: 1.5,
};

/** Fallback standard rate when bedrooms is unknown. Mirrors the Edge Function. */
export const STANDARD_DEFAULT_RATE = 60;

/**
 * Calculate price per visit in GBP.
 * Mirrored in supabase/functions/create-booking/index.ts (calculatePricePence).
 * BOTH MUST MATCH. The Stripe charge derives from the Edge Function copy.
 */
export function calculatePricePerVisit(state: BookingState): number {
  if (state.serviceType === "deep_clean") {
    return DEEP_CLEAN_RATES[state.bedrooms] ?? 0;
  }
  const b = STANDARD_BASE_RATES[state.bedrooms] ?? STANDARD_DEFAULT_RATE;
  const a = FREQUENCY_MULTIPLIERS[state.frequency] ?? 1.0;
  return Math.round(b * a);
}

/**
 * The lowest published per-visit rate for a service (the honest "from" price),
 * derived from the rate tables so cards and snapshots can never drift from the
 * engine. Standard resolves to the studio rate; deep clean to the studio flat.
 */
export function fromPrice(serviceType: ServiceType): number {
  const table = serviceType === "deep_clean" ? DEEP_CLEAN_RATES : STANDARD_BASE_RATES;
  return Math.min(...Object.values(table));
}

export function serviceTypeLabel(serviceType: ServiceType): string {
  return serviceType === "deep_clean" ? "Tarnshire Deep Clean" : "Standard Clean";
}

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}
