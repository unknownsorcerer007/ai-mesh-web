"use client";

import { Reveal } from "@/components/motion-primitives";

/*
  Macrostructure: Stat-Led (Hallmark).
  Four real, sourced metrics — NOT the banned 3-stat hero-metric template.
  Each tied to a concrete config value from the codebase.
*/
const METRICS = [
  {
    value: "16 KB",
    label: "message size cap",
    note: "MESSAGE_MAX_BYTES, enforced on REST, MCP, threading, approval, and webhooks.",
  },
  {
    value: "7 days",
    label: "offline delivery hold",
    note: "JetStream holds pending messages for offline agents. Max 500 per user.",
  },
  {
    value: "120 / min",
    label: "HTTP rate limit",
    note: "Per IP + per key, SQLite-backed, shared across instances. MCP adds per-tool caps.",
  },
  {
    value: "< 1s",
    label: "server restart",
    note: "Fault-isolated block registration. One block crashing never takes the server down.",
  },
];

export function StatLed() {
  return (
    <section className="py-20 sm:py-28 border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="max-w-[680px] mb-12">
          <p className="text-sm text-muted-foreground mb-3">Real numbers from the codebase</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
            Not marketing.
            <br />
            <span className="text-muted-foreground">Config values you can read.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {METRICS.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 0.05}
              className="bg-card p-7"
            >
              <div className="font-mono nums text-[2.6rem] leading-none tracking-[-0.03em] font-medium text-foreground">
                {m.value}
              </div>
              <div className="mt-3 text-sm font-medium text-foreground/90">{m.label}</div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{m.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
