export type QuoteState = {
  sector: string;
  sizeBand: string;
  numSites: string;
  frequency: string;
  scope: string[];
  compliance: string[];
  walkthroughDate: string;
  walkthroughTimeSlot: string;
  contactName: string;
  contactRole: string;
  contactCompany: string;
  contactEmail: string;
  contactPhone: string;
};

export const initialQuoteState: QuoteState = {
  sector: "",
  sizeBand: "",
  numSites: "1",
  frequency: "",
  scope: [],
  compliance: [],
  walkthroughDate: "",
  walkthroughTimeSlot: "",
  contactName: "",
  contactRole: "",
  contactCompany: "",
  contactEmail: "",
  contactPhone: "",
};

export type StepId = 1 | 2 | 3 | 4 | 5 | 6;

export const STEP_LABELS: Record<StepId, string> = {
  1: "About the building",
  2: "Frequency and scope",
  3: "Compliance requirements",
  4: "When we can visit",
  5: "Your details",
  6: "Review and send",
};
