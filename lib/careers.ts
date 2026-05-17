export type CareersFormState = {
  name: string;
  email: string;
  phone: string;
  boroughPreference: string;
  experienceMonths: string;
  languages: string[];
  hoursPerWeek: string;
  whyTarnshire: string;
  rightToWork: string;
  dbsWilling: string;
  selfEmployedOk: string;
  references: string;
  anythingElse: string;
};

export const initialCareersState: CareersFormState = {
  name: "",
  email: "",
  phone: "",
  boroughPreference: "",
  experienceMonths: "",
  languages: [],
  hoursPerWeek: "",
  whyTarnshire: "",
  rightToWork: "",
  dbsWilling: "",
  selfEmployedOk: "",
  references: "",
  anythingElse: "",
};

export const BOROUGH_OPTIONS = [
  { value: "m20", label: "M20 Didsbury", helper: "South Manchester, family homes and indie offices." },
  { value: "m21", label: "M21 Chorlton", helper: "Beech Road, Edge Lane, small offices, restaurants." },
  { value: "m14", label: "M14 Withington", helper: "Withington Village, Burton Road, university-adjacent." },
  { value: "any", label: "Any of the three", helper: "Happy to work across all launch postcodes." },
];

export const EXPERIENCE_OPTIONS = [
  {
    value: "lt_6",
    label: "Less than 6 months",
    helper: "Tarnshire requires 6 months minimum — applications below this don't progress at v1.",
  },
  { value: "6_12", label: "6–12 months" },
  { value: "12_24", label: "1–2 years" },
  { value: "gt_24", label: "2+ years" },
];

export const LANGUAGE_OPTIONS = [
  { value: "english", label: "English" },
  { value: "polish", label: "Polish" },
  { value: "romanian", label: "Romanian" },
  { value: "spanish", label: "Spanish" },
  { value: "portuguese", label: "Portuguese" },
  { value: "hindi", label: "Hindi" },
  { value: "urdu", label: "Urdu" },
  { value: "other", label: "Something else" },
];

export const HOURS_OPTIONS = [
  { value: "lt_10", label: "Less than 10 hours" },
  { value: "10_20", label: "10–20 hours" },
  { value: "20_30", label: "20–30 hours" },
  { value: "gt_30", label: "30+ hours" },
];

export const YES_NO_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const RTW_OPTIONS = [
  { value: "yes", label: "Yes", helper: "We'll verify your documentation at the interview." },
  { value: "no", label: "No", helper: "Tarnshire only contracts UK right-to-work holders." },
];

export const DBS_OPTIONS = [
  {
    value: "yes",
    label: "Yes",
    helper: "Tarnshire pays for the DBS check. Enhanced DBS for any education-sector work.",
  },
  {
    value: "no",
    label: "No",
    helper: "DBS clearance is non-negotiable for every Tarnshire contractor.",
  },
];

export const SELF_EMPLOYED_OPTIONS = [
  {
    value: "yes",
    label: "Yes, happy with self-employed",
    helper: "You bill us; you set your own hours; you manage your own tax.",
  },
  {
    value: "no",
    label: "I'd prefer employment",
    helper: "Tarnshire operates a contractor model at v1. Worth knowing for when we hire employees later.",
  },
];
