// Structured slot for real, verifiable customer reviews. INTENTIONALLY EMPTY.
//
// Tarnshire shows social proof only once genuine, consented reviews exist — no
// invented testimonials, no placeholder names, no fabricated counts or star
// ratings. Add real entries here (with the attribution the customer agreed to)
// and the homepage Reviews section renders itself automatically; until then it
// renders nothing at all.
export type Review = {
  /** The customer's own words, verbatim and with their consent. */
  quote: string;
  /** Attribution exactly as the customer agreed to it, e.g. "Sarah, Didsbury". */
  attribution: string;
  /** Optional postcode district for honest local context, e.g. "M20". */
  area?: string;
};

export const reviews: Review[] = [];
