export type BookingState = {
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
  { value: "monthly", label: "Monthly", helper: "Less frequent — small premium." },
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

export function calculatePricePerVisit(bedrooms: string, frequency: string): number {
  const base: Record<string, number> = {
    studio: 35,
    "1": 42,
    "2": 42,
    "3": 52,
    "4": 62,
    "5_plus": 72,
  };
  const adjust: Record<string, number> = {
    weekly: 1.0,
    fortnightly: 1.0,
    monthly: 1.05,
    one_off: 1.5,
  };
  const b = base[bedrooms] ?? 42;
  const a = adjust[frequency] ?? 1.0;
  return Math.round(b * a);
}

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}
