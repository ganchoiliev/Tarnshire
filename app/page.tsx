import { Wordmark } from "@/components/brand/Wordmark";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <Wordmark size="xl" href={null} />
      <p
        className="mt-8 text-center max-w-md"
        style={{
          fontFamily: "var(--font-sans-loaded), var(--font-sans)",
          fontSize: "var(--text-body-lg)",
          color: "var(--color-neutral-500)",
          lineHeight: 1.55,
        }}
      >
        Premium cleaning across Greater Manchester.
        <br />
        Coming soon.
      </p>
      <div
        className="mt-12 inline-block uppercase"
        style={{
          fontFamily: "var(--font-sans-loaded), var(--font-sans)",
          fontSize: "var(--text-label)",
          letterSpacing: "var(--tracking-label)",
          fontWeight: 500,
          color: "var(--color-mineral)",
        }}
      >
        Manchester · Est. 2026
      </div>
    </main>
  );
}
