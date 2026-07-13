"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { Play, Pause, ArrowCounterClockwise, Check } from "@phosphor-icons/react/dist/ssr";

/*
  A real, working focus timer. Not a div-based fake screenshot.
  Demonstrates: motivated motion (ring depletes as time passes),
  press feedback (scale 0.97 on active), full state coverage
  (idle / running / paused / complete), tabular-nums for the readout,
  reduced-motion respect (ring still moves, no decorative jitter).
*/

const SESSION_SECONDS = 25 * 60;

type State = "idle" | "running" | "paused" | "complete";

export function LiveTimer() {
  const reduce = useReducedMotion();
  const [state, setState] = useState<State>("idle");
  const [remaining, setRemaining] = useState(SESSION_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (state !== "running") return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          stop();
          setState("complete");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return stop;
  }, [state, stop]);

  const toggle = () => {
    if (state === "complete") return;
    setState((s) => (s === "running" ? "paused" : "running"));
  };

  const reset = () => {
    stop();
    setState("idle");
    setRemaining(SESSION_SECONDS);
  };

  const progress = 1 - remaining / SESSION_SECONDS;
  const R = 92;
  const C = 2 * Math.PI * R;
  const mm = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0");
  const ss = (remaining % 60).toString().padStart(2, "0");

  const statusLabel: Record<State, string> = {
    idle: "Ready",
    running: "In session",
    paused: "Paused",
    complete: "Session complete",
  };

  return (
    <div className="relative w-full max-w-[360px] mx-auto">
      {/* Ambient glow, single accent use on this surface */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-2xl pointer-events-none"
      />

      <div className="relative rounded-2xl border border-border bg-card/80 p-7 sm:p-9 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                state === "running"
                  ? "bg-primary"
                  : state === "complete"
                  ? "bg-emerald-400"
                  : "bg-muted-foreground/50"
              }`}
              aria-hidden="true"
            />
            {statusLabel[state]}
          </span>
          <span className="text-[11px] tracking-[0.08em] uppercase text-muted-foreground/70">
            Deep work
          </span>
        </div>

        <div className="relative grid place-items-center py-2">
          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            className="-rotate-90"
            aria-hidden="true"
          >
            <circle
              cx="110"
              cy="110"
              r={R}
              fill="none"
              stroke="oklch(1 0 0 / 0.06)"
              strokeWidth="6"
            />
            <motion.circle
              cx="110"
              cy="110"
              r={R}
              fill="none"
              stroke="oklch(0.78 0.14 70)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: C * progress }}
              transition={
                reduce
                  ? { duration: 0.3 }
                  : { duration: 0.9, ease: [0.23, 1, 0.32, 1] }
              }
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="font-mono nums text-[2.6rem] leading-none tracking-tight text-foreground tabular-nums">
                {mm}:{ss}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {state === "complete"
                  ? "Take a 5-minute break"
                  : `${Math.round((1 - progress) * 100)}% remaining`}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={toggle}
            disabled={state === "complete"}
            aria-label={state === "running" ? "Pause session" : "Start session"}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-sm px-5 py-2.5 rounded-lg transition-transform duration-150 active:scale-[0.97] hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {state === "running" ? (
              <>
                <Pause weight="fill" className="w-4 h-4" aria-hidden="true" />
                Pause
              </>
            ) : state === "complete" ? (
              <>
                <Check weight="bold" className="w-4 h-4" aria-hidden="true" />
                Done
              </>
            ) : (
              <>
                <Play weight="fill" className="w-4 h-4" aria-hidden="true" />
                {state === "paused" ? "Resume" : "Start session"}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset timer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors duration-150 active:scale-[0.97]"
          >
            <ArrowCounterClockwise className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 pt-5 border-t border-border text-[11px] text-muted-foreground/70 text-center">
          Blocks 47 distracting domains while running.
        </div>
      </div>
    </div>
  );
}
