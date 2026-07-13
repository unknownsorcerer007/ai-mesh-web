"use client";

import { useState, useRef, useEffect } from "react";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "error" | "success";

/*
  Newsletter form demonstrating impeccable form-validation craft:
  - Label above input (never placeholder-as-label)
  - Validate on blur, re-validate on input once invalid
  - Preserve input on error
  - Error message answers what + how to fix
  - Loading / error / success states (3 of the 8 interactive states)
  - aria-describedby wiring, role="alert" on inline error
  - Button disabled while submitting, specific label
*/
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const valid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  // Once invalid, re-validate on input so the error clears the moment it's fixed.
  useEffect(() => {
    if (touched && error && valid(email)) {
      setError("");
      if (status === "error") setStatus("idle");
    }
  }, [email, touched, error, status]);

  const validate = () => {
    if (!email) {
      setError("Email is required to send the dispatch.");
      return false;
    }
    if (!valid(email)) {
      setError("That doesn't look like an email. Check for a missing @ or domain.");
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (status === "submitting") return;
    if (!validate()) {
      setStatus("error");
      inputRef.current?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Server couldn't process the request.");
      }
      setStatus("success");
      setEmail("");
      setTouched(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? `${err.message} Try again in a moment.`
          : "Something went wrong. Try again in a moment."
      );
      setStatus("error");
      inputRef.current?.focus();
    }
  };

  return (
    <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 sm:px-12 py-12 sm:py-16">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        <div>
          <h2 className="text-[1.7rem] sm:text-[2rem] leading-[1.1] tracking-[-0.02em] font-medium text-foreground">
            The dispatch
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed max-w-[44ch]">
            One short email every other Friday. What we shipped, what we learned
            about focus, and the one shortcut worth remembering.
          </p>
        </div>

        <div>
          {status === "success" ? (
            <div
              role="status"
              className="rounded-xl border border-primary/30 bg-primary/8 p-5 text-sm text-foreground"
            >
              You&apos;re on the list. The next dispatch ships the second Friday
              of the month.
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-3">
              <div>
                <label
                  htmlFor="nl-email"
                  className="block text-xs tracking-wide text-muted-foreground mb-2"
                >
                  Email address
                </label>
                <input
                  ref={inputRef}
                  id="nl-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => {
                    setTouched(true);
                    if (email) validate();
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? "nl-error" : "nl-hint"}
                  placeholder="you@studio.dev"
                  className={cn(
                    "w-full bg-background border rounded-lg px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors",
                    "focus:border-primary/60 focus:ring-2 focus:ring-primary/25",
                    error
                      ? "border-destructive/70 focus:border-destructive focus:ring-destructive/25"
                      : "border-border"
                  )}
                />
              </div>

              {error ? (
                <p id="nl-error" role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              ) : (
                <p id="nl-hint" className="text-xs text-muted-foreground/70">
                  No tracking pixels. Unsubscribe in one click.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-sm px-5 py-3 rounded-lg transition-transform duration-150 active:scale-[0.97] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <Spinner
                      weight="bold"
                      className="w-4 h-4 animate-spin"
                      aria-hidden="true"
                    />
                    Subscribing
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Reveal>
  );
}
