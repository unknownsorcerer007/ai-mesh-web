"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion-primitives";
import { Robot, User, ShieldWarning, Check, X } from "@phosphor-icons/react/dist/ssr";

/*
  Human-in-the-loop approval flow, visualized.
  Agent submits → admin approves/rejects. The self-approval guard
  (requester cannot approve own request) is the trust feature.
  Animated step progression on scroll-into-view. Reduced motion: static.
*/
export function ApprovalFlow() {
  const reduce = useReducedMotion();
  return (
    <section className="py-20 sm:py-28 border-t border-border">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="max-w-[680px] mb-12">
          <p className="text-sm text-muted-foreground mb-3">Human-in-the-loop</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
            Agents propose.
            <br />
            <span className="text-muted-foreground">Humans dispose.</span>
          </h2>
          <p className="mt-5 text-[15px] text-muted-foreground max-w-[56ch]">
            Critical actions queue for human sign-off. The agent that submits a
            request can never approve it. Every decision is logged.
          </p>
        </Reveal>

        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
              {/* step 1: agent submits */}
              <FlowCard
                step="01"
                icon={<Robot weight="duotone" className="w-5 h-5" aria-hidden="true" />}
                title="Agent submits"
                body="Codex opens an approval request: deploy api-gateway v1.4.2 to production."
                tone="agent"
                reduce={reduce}
              />

              {/* step 2: guard */}
              <FlowCard
                step="02"
                icon={<ShieldWarning weight="duotone" className="w-5 h-5" aria-hidden="true" />}
                title="Self-approval guard"
                body="The same agent cannot respond. The request waits for a different admin identity."
                tone="guard"
                reduce={reduce}
              />

              {/* step 3: human responds */}
              <FlowCard
                step="03"
                icon={<User weight="duotone" className="w-5 h-5" aria-hidden="true" />}
                title="Human responds"
                body="An admin approves or rejects with a reason. The decision is written to the audit log."
                tone="human"
                reduce={reduce}
              />
            </div>

            {/* outcome row */}
            <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center justify-center gap-3">
              <OutcomePill
                icon={<Check weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />}
                label="approve → action runs"
                tone="ok"
              />
              <OutcomePill
                icon={<X weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />}
                label="reject → reason logged"
                tone="no"
              />
              <span className="text-xs text-muted-foreground/70">
                POST /approval/respond &middot; full history at GET /approval/history
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FlowCard({
  step,
  icon,
  title,
  body,
  tone,
  reduce,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  tone: "agent" | "guard" | "human";
  reduce: boolean | null;
}) {
  const accent =
    tone === "guard"
      ? "bg-yellow-500/12 ring-yellow-500/25 text-yellow-400"
      : tone === "human"
      ? "bg-primary/12 ring-primary/25 text-primary"
      : "bg-secondary ring-border text-foreground/80";

  return (
    <motion.div
      className="rounded-xl border border-border bg-background/50 p-5"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`grid place-items-center w-9 h-9 rounded-lg ring-1 ${accent}`}>
          {icon}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground nums tracking-wide">
          {step}
        </span>
      </div>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{body}</p>
    </motion.div>
  );
}

function OutcomePill({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone: "ok" | "no";
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
        tone === "ok"
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-destructive/30 bg-destructive/10 text-destructive"
      }`}
    >
      {icon}
      {label}
    </span>
  );
}
