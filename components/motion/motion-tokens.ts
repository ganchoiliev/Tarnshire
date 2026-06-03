// Motion tokens — JS mirrors of the CSS custom properties in app/globals.css.
//
// Framer Motion and Lenis need literal JS values (seconds, bezier tuples) and
// cannot read CSS custom properties, so these are kept in 1:1 sync with the
// --ease-*, --duration-* and --spacing-* tokens defined in @theme. If a value
// changes in globals.css, change it here too.

// --ease-emphasis: cubic-bezier(0.22, 1, 0.36, 1)
export const EASE_EMPHASIS: [number, number, number, number] = [0.22, 1, 0.36, 1];
// --ease-standard: cubic-bezier(0.32, 0.08, 0.24, 1)
export const EASE_STANDARD: [number, number, number, number] = [0.32, 0.08, 0.24, 1];

// --duration-* expressed in seconds for Framer Motion (CSS tokens are in ms).
export const DURATION_FAST = 0.18; // --duration-fast: 180ms
export const DURATION_BASE = 0.32; // --duration-base: 320ms
export const DURATION_SLOW = 0.56; // --duration-slow: 560ms

// Entrance travel distance, in px. Mirrors --spacing-4 (24px). Transform-only,
// so entrances never affect layout (zero CLS).
export const REVEAL_DISTANCE = 24;

// Delay between staggered siblings, in seconds.
export const STAGGER_STEP = 0.08;
