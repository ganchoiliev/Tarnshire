"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { loginAction } from "./actions";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await loginAction(password);
      if (result.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(result.error ?? "Login failed");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-[var(--color-ink)] font-medium"
          style={{ fontSize: "var(--text-body-sm)" }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!error}
          className="w-full bg-[var(--color-bone)] border rounded-[var(--radius-sm)] px-4 py-3 text-[var(--color-ink)] transition-colors duration-[var(--duration-fast)] focus:outline-none focus:border-[var(--color-mineral)]"
          style={{
            borderColor: error ? "var(--color-signal)" : "var(--color-neutral-100)",
            fontFamily: "var(--font-sans-loaded), var(--font-sans)",
            fontSize: "var(--text-body)",
          }}
        />
        {error ? (
          <p
            className="text-[var(--color-signal)]"
            style={{ fontSize: "var(--text-caption)" }}
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </div>
      <div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className={isPending ? "opacity-60 cursor-wait pointer-events-none" : ""}
        >
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </form>
  );
}
