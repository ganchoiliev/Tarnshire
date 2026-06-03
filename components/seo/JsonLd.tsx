// Server component that renders a JSON-LD <script>. Structured data is static
// JSON, not executable code, so a native <script> tag is the right choice (per
// the Next.js JSON-LD guidance). Escaping "<" to its unicode form prevents any
// string value from breaking out of the script context (XSS-safe stringify).
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
