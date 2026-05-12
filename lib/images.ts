// Semantic alias map for /public/img/*.jpg
// Numeric filenames map to sections of 06_image_prompts.md.
// Components must reference IMAGES.<key>, never raw paths.
export const IMAGES = {
  // Slice 1 — homepage and brand surface
  splitHome: "/img/1-1.jpg",
  splitBusiness: "/img/1-2.jpg",
  heroHome: "/img/1-3.jpg",
  heroBusiness: "/img/1-4.jpg",
  about: "/img/1-5.jpg",
  footerAtmosphere: "/img/1-6.jpg",

  // Slice 2 — B2B sector heroes
  sectorOffices: "/img/2-1.jpg",
  sectorGyms: "/img/2-2.jpg",
  sectorRetail: "/img/2-3.jpg",
  sectorEducation: "/img/2-4.jpg",
  sectorHospitality: "/img/2-5.jpg",
  sectorHealthcare: "/img/2-6.jpg",

  // Slice 3 — domestic services + areas
  serviceRegular: "/img/3-1.jpg",
  serviceDeep: "/img/3-2.jpg",
  serviceEndOfTenancy: "/img/3-3.jpg",
  serviceOven: "/img/3-4.jpg",
  serviceAirbnb: "/img/3-5.jpg",
  areaM20: "/img/3-6.jpg",
  areaM21: "/img/3-7.jpg",
  areaM14: "/img/3-8.jpg",
  areaWaitlist: "/img/3-9.jpg",

  // Slice 5 — editorial
  almanacGeneric: "/img/4-1.jpg",
} as const;

export type ImageKey = keyof typeof IMAGES;
