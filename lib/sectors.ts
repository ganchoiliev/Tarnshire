export type SectorPillar = { title: string; body: string };
export type SectorFAQItem = { question: string; answer: string };

export type SectorData = {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  lede: string;
  metaDescription: string;
  imageKey:
    | "sectorOffices"
    | "sectorGyms"
    | "sectorRetail"
    | "sectorEducation"
    | "sectorHospitality"
    | "sectorHealthcare";
  pillars: SectorPillar[];
  relevantCredentials: string[];
  faq: SectorFAQItem[];
  locked?: boolean;
  lockedNote?: string;
  lockedBody?: string;
};

export const SECTORS: SectorData[] = [
  {
    slug: "offices",
    title: "Office cleaning",
    eyebrow: "Offices",
    headline: "Office cleaning that respects the work being done.",
    lede: "Daily, evening, or pre-opening cleans for boutique studios, professional services, and multi-floor practices across Greater Manchester. Documented schedules, vetted operatives, transparent compliance.",
    metaDescription:
      "Commercial office cleaning across Greater Manchester. Out-of-hours scheduling, documented checklists, same-operative continuity. DBS-checked, fully insured.",
    imageKey: "sectorOffices",
    pillars: [
      {
        title: "Out-of-hours scheduling",
        body: "Pre-opening, post-closing, or weekend windows. Your team never sees the work.",
      },
      {
        title: "Documented checklists",
        body: "Every visit logged. Photos available on request. Compliance evidence for facilities audits.",
      },
      {
        title: "Continuity of operative",
        body: "The same operative on the same building, every visit. They learn the space, you build trust.",
      },
    ],
    relevantCredentials: [
      "DBS-checked operatives",
      "£2M public liability insurance",
      "COSHH-trained",
      "Reference-verified network",
    ],
    faq: [
      {
        question: "Can you clean during business hours?",
        answer:
          "Yes — but most clients prefer pre-opening or post-closing windows so the office is operational without interruption. We work around your team, not through it.",
      },
      {
        question: "What about meeting rooms with confidential materials?",
        answer:
          "Operatives sign room-specific NDAs where required. We can also exclude rooms from the cleaning scope entirely and have the client team handle them.",
      },
      {
        question: "What's the typical office contract minimum?",
        answer:
          "Six months rolling, with a three-month break clause as standard. Shorter trial periods available for new clients.",
      },
      {
        question: "Do you supply equipment and consumables?",
        answer:
          "Equipment yes, included in the contract. Consumables (toilet paper, soap, hand towels) on request — quoted separately at cost-plus.",
      },
    ],
  },
  {
    slug: "gyms",
    title: "Gym & studio cleaning",
    eyebrow: "Gyms & studios",
    headline: "Hygiene standards that hold up to members.",
    lede: "Pre-opening or overnight cleans for boutique fitness, yoga, pilates, and members' studios. Member-facing standards, gym-specific surface protocols, equipment-aware operatives.",
    metaDescription:
      "Commercial gym and studio cleaning across Greater Manchester. Pre-opening readiness, gym-specific surface protocols, equipment-safe products. DBS-checked, fully insured.",
    imageKey: "sectorGyms",
    pillars: [
      {
        title: "Pre-opening readiness",
        body: "Done before the 6am class. Floors dry. Mirrors clear. Towels fresh.",
      },
      {
        title: "Gym-specific surfaces",
        body: "Mat protocols, machine wipe-downs, changing-room hygiene to gym-industry standards.",
      },
      {
        title: "Equipment-aware operatives",
        body: "We know what to clean with what. No chemical damage to rubber, vinyl, or upholstered equipment.",
      },
    ],
    relevantCredentials: [
      "DBS-checked operatives",
      "£2M public liability insurance",
      "COSHH-trained",
      "Reference-verified network",
    ],
    faq: [
      {
        question: "Can you clean before 6am classes?",
        answer:
          "Yes — that's our standard gym-sector slot. Most clients use a 4am–5:45am window so the studio is ready 15 minutes before the first class.",
      },
      {
        question: "Do you handle changing rooms?",
        answer:
          "Yes — showers, lockers, mirrors, floors, and full restroom protocols. Same standard as the main studio space.",
      },
      {
        question: "What about sauna and steam-room cleaning?",
        answer:
          "Yes, with specific protocols. Saunas use dry-clean only; steam rooms get a wet protocol with chemicals appropriate to the surface.",
      },
      {
        question: "Do you handle the gym towel laundry?",
        answer:
          "No — laundry is specialist. We can recommend a vetted partner if your contract needs both.",
      },
    ],
  },
  {
    slug: "retail",
    title: "Retail cleaning",
    eyebrow: "Retail",
    headline: "Retail cleans that show before the shop opens.",
    lede: "Pre-opening cleans for independent boutiques, small chains, and showroom retail. Glass, floors, fitting rooms, point-of-sale areas — everything a customer sees.",
    metaDescription:
      "Commercial retail cleaning across Greater Manchester. Pre-opening windows, display-aware operatives, storefront glass every visit. DBS-checked, fully insured.",
    imageKey: "sectorRetail",
    pillars: [
      {
        title: "Pre-opening windows",
        body: "Done before the shutters lift. Customers never see the work, only the result.",
      },
      {
        title: "Display-aware operatives",
        body: "Trained to clean around merchandise without touching display arrangements. Nothing moved without checking.",
      },
      {
        title: "Storefront glass",
        body: "Outside and inside, every visit. The first impression a customer sees.",
      },
    ],
    relevantCredentials: [
      "DBS-checked operatives",
      "£2M public liability insurance",
      "COSHH-trained",
      "Reference-verified network",
    ],
    faq: [
      {
        question: "What about high-value display areas?",
        answer:
          "Operatives are insured for accidental damage and trained to keep cleaning distance from priced merchandise. High-value items can be excluded from the scope entirely on request.",
      },
      {
        question: "Can you do storefront windows from outside?",
        answer:
          "Yes — ladder work up to two storeys covered under our insurance. Above two storeys we contract specialist access partners.",
      },
      {
        question: "Do you handle stockroom cleaning?",
        answer:
          "Yes — quoted separately from front-of-house. Different scope, different frequency, different operatives if you want them.",
      },
      {
        question: "What's the minimum retail contract?",
        answer:
          "Three months rolling. Most retail clients run weekly or three-times-weekly pre-opening cleans.",
      },
    ],
  },
  {
    slug: "education",
    title: "Education cleaning",
    eyebrow: "Education",
    headline: "School-grade standards. Enhanced DBS, every operative.",
    lede: "Termly, weekly, or daily cleans for independent schools, sixth-form colleges, and adult training centres. Safeguarding-compliant operatives, classroom-aware protocols, holiday deep cleans.",
    metaDescription:
      "Commercial education cleaning across Greater Manchester. Enhanced DBS-cleared operatives, classroom-aware scope, holiday deep cleans. Safeguarding-compliant, fully insured.",
    imageKey: "sectorEducation",
    pillars: [
      {
        title: "Enhanced DBS-cleared operatives",
        body: "Enhanced DBS check on every operative entering an education setting. Documentation on file for safeguarding audits.",
      },
      {
        title: "Classroom-aware scope",
        body: "We work around lesson plans, displays, and pupil work. Nothing moved or discarded without checking with staff.",
      },
      {
        title: "Term-time and holiday scopes",
        body: "Different protocols for term-time daily cleans vs holiday deep cleans. Both quoted separately, both documented.",
      },
    ],
    relevantCredentials: [
      "Enhanced DBS-cleared operatives",
      "£2M public liability insurance",
      "COSHH-trained",
      "Reference-verified network",
      "Safeguarding-aware protocols",
    ],
    faq: [
      {
        question: "Are all operatives Enhanced DBS-cleared?",
        answer:
          "Every operative entering an education setting holds Enhanced DBS clearance, with documentation on file and renewable every three years. No exceptions.",
      },
      {
        question: "Can you do holiday deep cleans?",
        answer:
          "Yes — quoted separately from term-time scope. Usually December and August windows, three to five working days per site depending on size.",
      },
      {
        question: "What about laboratory or workshop spaces?",
        answer:
          "Specialist scope. Quoted separately with material-handling and chemical-storage protocols agreed with your safeguarding lead before first visit.",
      },
      {
        question: "Can you provide safeguarding documentation for audits?",
        answer:
          "Yes — DBS certificates, training records, and insurance documents available within 24 hours of any audit request.",
      },
    ],
  },
  {
    slug: "hospitality",
    title: "Hospitality cleaning",
    eyebrow: "Hospitality",
    headline: "Hospitality cleans that meet hospitality standards.",
    lede: "Pre-opening and overnight cleans for boutique hotels, restaurants, members' clubs, and event venues. Guest-facing standards, hospitality-aware operatives, discrete service.",
    metaDescription:
      "Commercial hospitality cleaning across Greater Manchester. Guest-facing standards, pre-service readiness, discrete operatives. DBS-checked, fully insured.",
    imageKey: "sectorHospitality",
    pillars: [
      {
        title: "Guest-facing standards",
        body: "Cleaning to hotel and restaurant grade. Every surface a guest might touch, every angle they might see.",
      },
      {
        title: "Pre-service readiness",
        body: "Done before doors open. Tables set if scope includes, floors dry, glassware spotless.",
      },
      {
        title: "Discrete operatives",
        body: "When guests are present, our operatives are invisible — quiet, efficient, dressed for the room.",
      },
    ],
    relevantCredentials: [
      "DBS-checked operatives",
      "£2M public liability insurance",
      "COSHH-trained",
      "Reference-verified network",
      "Food-safety awareness for restaurant scopes",
    ],
    faq: [
      {
        question: "Can you clean during service?",
        answer:
          "Yes, with strict protocols, when scope requires. Most hospitality clients prefer pre-service or overnight windows so the guest experience isn't disrupted.",
      },
      {
        question: "Do you handle linens?",
        answer:
          "No — linen processing is specialist. We can hand off to a vetted linen partner if your contract needs both services aligned.",
      },
      {
        question: "Restaurant kitchens?",
        answer:
          "Front-of-house and dining areas to standard. Deep kitchen cleans (extractor canopies, grease traps, gas-line areas) are specialist scope quoted separately.",
      },
      {
        question: "Event venue turnovers?",
        answer:
          "Yes — same-day turnover between events, with documented checklist and photographic before/after evidence on request.",
      },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare cleaning",
    eyebrow: "Healthcare",
    headline: "Healthcare cleaning — opening Q3 2026.",
    lede: "Healthcare-sector engagement opens by referral only in Q3 2026.",
    metaDescription:
      "Tarnshire healthcare cleaning launches Q3 2026. CQC-aligned protocols and BICSc training in progress. By referral only at launch.",
    imageKey: "sectorHealthcare",
    pillars: [],
    relevantCredentials: [],
    faq: [],
    locked: true,
    lockedNote: "By referral · Phase 3 · Q3 2026",
    lockedBody:
      "Healthcare cleaning requires CQC-aligned infection-control protocols, BICSc-trained operatives, and specialist insurance cover. Tarnshire is completing these standards through 2026. Healthcare-sector engagement opens by referral only in Q3 2026. If you have an immediate need for clinical-grade cleaning, contact us and we'll refer you to a vetted partner.",
  },
];

export function getSectorBySlug(slug: string): SectorData | undefined {
  return SECTORS.find((s) => s.slug === slug);
}

export function getActiveSectors(): SectorData[] {
  return SECTORS.filter((s) => !s.locked);
}
