"use client";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion-primitives";

/*
  REAL content from FIXES_APPLIED.md — 18 security fixes the project
  actually shipped, grouped by severity. Each is a one-line summary of
  the before/after. This is the trust story, not marketing.
*/
type Fix = { title: string; before: string };

const CRITICAL: Fix[] = [
  { title: "Token blacklist repaired", before: "require() crashed in ESM; logout did nothing" },
  { title: "Per-connection MCP identity", before: "two clients shared one user id" },
  { title: "Session secret enforced", before: "dev default bypassed prod validation" },
  { title: "Token TTL respected", before: "MCP ignored the configured lifetime" },
  { title: "Clean request returns", before: "double responses after 415 / errors" },
  { title: "Correct DB path in Docker", before: "leftover pulse.db from old name" },
];

const HIGH: Fix[] = [
  { title: "Webhook signatures verified", before: "anyone with the URL could spoof events" },
  { title: "Token moved to hash fragment", before: "logged in history, access logs, Referer" },
  { title: "Deprecated X-XSS-Protection removed", before: "could introduce XSS in old IE" },
];

const MEDIUM: Fix[] = [
  { title: "Dead /messages/purge removed", before: "auth'd then returned ok, did nothing" },
  { title: "Async audit logging", before: "appendFileSync blocked the event loop" },
  { title: "Correct rejection type", before: "said member_joined with status rejected" },
  { title: "Periodic OAuth state cleanup", before: "ran once at startup, then never" },
  { title: "Dropped unused @hono/node-server", before: "postinstall hack for nothing" },
  { title: "Removed unused execFileSync", before: "imported but never called" },
  { title: "Thread reply sender_ai field", before: "agent replies lost identity in threads" },
  { title: "as any casts fixed", before: "null deref possible in critical paths" },
  { title: "Control-char stripping + length caps", before: "on every publish path" },
];

export function SecurityFixes() {
  return (
    <section className="py-20 sm:py-28 border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="max-w-[680px] mb-12">
          <p className="text-sm text-muted-foreground mb-3">18 fixes, shipped and documented</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
            Security is a
            <br />
            <span className="text-muted-foreground">changelog, not a claim.</span>
          </h2>
          <p className="mt-5 text-[15px] text-muted-foreground max-w-[56ch]">
            Every fix is in <code className="font-mono text-[13px] text-foreground">FIXES_APPLIED.md</code> with
            the before-state, the impact, and the diff. Audit it before you
            self-host.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-3">
          <FixColumn label="Critical" tone="destructive" fixes={CRITICAL} />
          <FixColumn label="High" tone="warn" fixes={HIGH} />
          <FixColumn label="Medium" tone="muted" fixes={MEDIUM} />
        </div>
      </div>
    </section>
  );
}

function FixColumn({
  label,
  tone,
  fixes,
}: {
  label: string;
  tone: "destructive" | "warn" | "muted";
  fixes: Fix[];
}) {
  const dot =
    tone === "destructive"
      ? "bg-destructive"
      : tone === "warn"
      ? "bg-yellow-500"
      : "bg-muted-foreground/50";
  return (
    <StaggerGroup stagger={0.04}>
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-2 h-2 rounded-full ${dot}`} aria-hidden="true" />
        <h3 className="text-sm font-medium text-foreground">{label}</h3>
        <span className="text-xs text-muted-foreground/70 ml-auto nums">{fixes.length} fixes</span>
      </div>
      <ul className="space-y-3">
        {fixes.map((f) => (
          <StaggerItem key={f.title}>
            <li className="rounded-xl border border-border bg-card p-4">
              <div className="text-sm font-medium text-foreground">{f.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                before: {f.before}
              </div>
            </li>
          </StaggerItem>
        ))}
      </ul>
    </StaggerGroup>
  );
}
