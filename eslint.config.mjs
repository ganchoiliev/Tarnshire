import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Supabase Edge Functions run on Deno, not Next.js/Node. They legitimately
    // use `@ts-nocheck` (for unresolvable Deno + esm.sh URL imports) and the
    // Deno `any`-typed runtime, both of which the Next config flags. Deno has
    // its own toolchain (`deno lint`/`deno check`), so exclude them here rather
    // than weaken the app ruleset. tsconfig.json already excludes `supabase`.
    "supabase/functions/**",
  ]),
]);

export default eslintConfig;
