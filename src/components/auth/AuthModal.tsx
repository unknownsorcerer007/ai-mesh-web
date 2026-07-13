"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowRight, Spinner } from "@phosphor-icons/react/dist/ssr";

/*
  Auth modal — lifted from the main AI Mesh site's auth-card pattern.
  GitHub OAuth + token login. Sign in / Sign up toggle. Modal overlay so
  the user stays on the landing page (no redirect away).

  The API base is configurable. In production it points to the deployed
  ai-mesh server; in dev, localhost:3737. The modal never handles the
  token itself — GitHub OAuth redirects away and back (with the token in
  the URL hash fragment, per the security fix), and token login posts to
  /auth/pat. This component is the front door; the server is the source
  of truth.
*/

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3737"
    : "https://ai-mesh-app-production.up.railway.app");

type Mode = "signin" | "signup";
type Status = "idle" | "submitting" | "error";

export function AuthModal({
  open,
  onClose,
  initialMode = "signup",
}: {
  open: boolean;
  onClose: () => void;
  initialMode?: Mode;
}) {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);

  // Sync mode when opened from different triggers
  useEffect(() => {
    if (open) setMode(initialMode);
  }, [open, initialMode]);

  // Escape to close + lock body scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const githubLogin = () => {
    // Redirects to the server's GitHub OAuth start. Server redirects back
    // to UI_URL with the token in the hash fragment (never in query string).
    window.location.href = `${API_BASE}/auth/github`;
  };

  const tokenLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (!token.trim()) {
      setError("Paste your personal access token to sign in.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/pat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "That token wasn't accepted.");
      }
      const data = await res.json();
      if (data.token) {
        try {
          localStorage.setItem("aimesh_token", data.token);
        } catch {
          /* storage unavailable */
        }
      }
      setStatus("idle");
      setToken("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed. Try again.");
      setStatus("error");
      tokenRef.current?.focus();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-default"
            tabIndex={-1}
          />

          <motion.div
            ref={dialogRef}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-[400px] rounded-2xl border border-border bg-card p-7 sm:p-8 shadow-[0_30px_80px_-30px_oklch(0.3_0.02_165_/_0.45)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 grid place-items-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            <h2 id="auth-modal-title" className="text-xl font-medium tracking-tight text-foreground">
              {mode === "signin" ? "Welcome back" : "Create account"}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {mode === "signin"
                ? "Sign in to your AI Mesh account"
                : "Connect your GitHub to get started"}
            </p>

            <button
              type="button"
              onClick={githubLogin}
              className="mt-6 w-full inline-flex items-center justify-center gap-2.5 bg-foreground text-background font-medium text-sm px-4 py-3 rounded-lg transition-transform duration-150 active:scale-[0.98] hover:opacity-90"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.61 8.21 11.16.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.81 1.27 3.5.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.3-5.47-5.79 0-1.28.47-2.33 1.23-3.15-.12-.3-.53-1.5.12-3.13 0 0 1-.32 3.3 1.2.96-.26 1.98-.39 3-.4 1.02.01 2.04.14 3 .4 2.3-1.52 3.3-1.2 3.3-1.2.65 1.63.24 2.83.12 3.13.77.82 1.23 1.87 1.23 3.15 0 4.5-2.81 5.48-5.49 5.77.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.22.68.83.56C20.57 21.9 24 17.49 24 12.29 24 5.78 18.63.5 12 .5z" />
              </svg>
              {mode === "signin" ? "Continue with GitHub" : "Sign up with GitHub"}
            </button>

            <div className="flex items-center gap-3 my-5" aria-hidden="true">
              <span className="flex-1 h-px bg-border" />
              <span className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground/70">
                or
              </span>
              <span className="flex-1 h-px bg-border" />
            </div>

            {mode === "signin" ? (
              <form onSubmit={tokenLogin} noValidate>
                <label htmlFor="auth-token" className="block text-xs text-muted-foreground mb-2">
                  Auth token
                </label>
                <input
                  ref={tokenRef}
                  id="auth-token"
                  type="password"
                  autoComplete="off"
                  value={token}
                  onChange={(e) => {
                    setToken(e.target.value);
                    if (error) {
                      setError("");
                      setStatus("idle");
                    }
                  }}
                  placeholder="paste your personal access token"
                  className={`w-full bg-background border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors ${
                    error
                      ? "border-destructive/70 focus:border-destructive focus:ring-2 focus:ring-destructive/25"
                      : "border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
                  }`}
                  aria-invalid={!!error}
                  aria-describedby={error ? "auth-token-error" : undefined}
                />
                {error && (
                  <p id="auth-token-error" role="alert" className="mt-2 text-xs text-destructive">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium text-sm px-4 py-3 rounded-lg transition-transform duration-150 active:scale-[0.98] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <Spinner weight="bold" className="w-4 h-4 animate-spin" aria-hidden="true" />
                      Signing in
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <p className="text-xs text-muted-foreground/80 leading-relaxed">
                GitHub OAuth opens a secure window. No password stored here.
                After you authorize, you&apos;ll land back on this page, signed in.
              </p>
            )}

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setError("");
                  setStatus("idle");
                }}
                className="text-primary font-medium hover:underline underline-offset-2"
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
