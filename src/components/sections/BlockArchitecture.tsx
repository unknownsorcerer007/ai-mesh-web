"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion-primitives";
import { cn } from "@/lib/utils";

/*
  THE block architecture (the thing the user said not to break).
  12 independent feature blocks + core layer + shared layer.
  Fault-isolated: one block going red does not crash the server.

  Interactive: click a block to see what it does. Each block card has a
  health-pulse dot (the per-block health check from core/health.ts).
*/

type Block = {
  id: string;
  name: string;
  layer: "core" | "shared" | "block";
  desc: string;
  depends: string;
};

const BLOCKS: Block[] = [
  { id: "auth", name: "auth", layer: "block", desc: "GitHub OAuth + personal access tokens. Bearer auth middleware.", depends: "→ security, db" },
  { id: "security", name: "security", layer: "block", desc: "Ed25519, HMAC tokens, prompt-injection detection, rate-limiting.", depends: "→ (pure)" },
  { id: "groups", name: "groups", layer: "block", desc: "CRUD, membership, join requests, invite codes, roles.", depends: "→ auth, security" },
  { id: "messages", name: "messages", layer: "block", desc: "Routing, WebSocket live delivery, offline inbox.", depends: "→ relay, auth, logs" },
  { id: "relay", name: "relay", layer: "block", desc: "NATS JetStream: streams, durable consumers, pending messages.", depends: "→ config" },
  { id: "mcp", name: "mcp", layer: "block", desc: "Universal MCP server. 18 tools, 3 transports, per-tool rate limits.", depends: "→ groups, messages, approval" },
  { id: "approval", name: "approval", layer: "block", desc: "Human-in-the-loop. Self-approval guard. Audit trail.", depends: "→ groups, security, relay" },
  { id: "threading", name: "threading", layer: "block", desc: "Reply threads, non-destructive fetch.", depends: "→ messages, security" },
  { id: "search", name: "search", layer: "block", desc: "Cursor-paginated message search by query, sender, type.", depends: "→ db" },
  { id: "reactions", name: "reactions", layer: "block", desc: "Emoji reactions, presentation-validated, rate-limited.", depends: "→ db" },
  { id: "webhooks", name: "webhooks", layer: "block", desc: "GitHub, GitLab, Slack. HMAC-SHA256 signature-verified.", depends: "→ groups, relay" },
  { id: "logs", name: "logs", layer: "block", desc: "Audit logging, monthly files, admin-only, async writes.", depends: "→ (filesystem)" },
  { id: "notifications", name: "notifications", layer: "block", desc: "Per-user notifications, desktop + webhook, unread count.", depends: "→ db" },
  { id: "config", name: "config", layer: "core", desc: "Core. Single source of truth, env parsing, production validation.", depends: "→ (root)" },
  { id: "db", name: "db", layer: "shared", desc: "Shared. SQLite WAL, schema, foreign keys, busy_timeout.", depends: "→ (root)" },
];

const LAYER_META = {
  core: { label: "Core layer", hint: "infrastructure, no business logic" },
  shared: { label: "Shared layer", hint: "pure utilities, no block imports" },
  block: { label: "Block layer", hint: "12 independent features, DAG, no cycles" },
} as const;

export function BlockArchitecture() {
  const [active, setActive] = useState<string | null>("mcp");
  const activeBlock = BLOCKS.find((b) => b.id === active);

  return (
    <section id="architecture" className="py-20 sm:py-28 border-y border-border bg-secondary/20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="max-w-[680px] mb-12">
          <p className="text-sm text-muted-foreground mb-3">The block architecture</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
            Twelve blocks.
            <br />
            <span className="text-muted-foreground">One fails, the rest keep serving.</span>
          </h2>
          <p className="mt-5 text-[15px] text-muted-foreground max-w-[56ch]">
            Every block registers in its own try/catch. A crash in one is
            isolated to its own health check. The server stays up.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-start">
          {/* Block grid */}
          <StaggerGroup
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            stagger={0.04}
          >
            {BLOCKS.map((b) => {
              const isActive = active === b.id;
              const isCore = b.layer === "core";
              const isShared = b.layer === "shared";
              return (
                <StaggerItem key={b.id}>
                  <button
                    type="button"
                    onClick={() => setActive(isActive ? null : b.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "w-full text-left rounded-xl border p-4 transition-colors",
                      "hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                      isActive
                        ? "border-primary/60 bg-primary/8"
                        : isCore
                        ? "border-border bg-background/50"
                        : isShared
                        ? "border-border bg-background/50"
                        : "border-border bg-card"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[13px] text-foreground">{b.name}</span>
                      {/* health pulse dot */}
                      <span className="relative flex w-2 h-2">
                        <span
                          className={cn(
                            "absolute inset-0 rounded-full opacity-60",
                            isCore ? "bg-foreground/50" : isShared ? "bg-foreground/50" : "bg-primary"
                          )}
                        />
                        {!isCore && !isShared && (
                          <motion.span
                            className="absolute inset-0 rounded-full bg-primary"
                            animate={{ opacity: [0.4, 0, 0.4], scale: [1, 2.2, 1] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "inline-block text-[10px] tracking-[0.06em] uppercase",
                        isCore || isShared ? "text-muted-foreground/60" : "text-primary/70"
                      )}
                    >
                      {b.layer}
                    </span>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-24">
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-6 min-h-[200px]">
                {activeBlock ? (
                  <motion.div
                    key={activeBlock.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-lg text-foreground">{activeBlock.name}</span>
                      <span className="text-[10px] tracking-[0.06em] uppercase text-primary/70 bg-primary/10 rounded px-1.5 py-0.5">
                        {LAYER_META[activeBlock.layer].label}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">{activeBlock.desc}</p>
                    <p className="mt-4 font-mono text-xs text-muted-foreground">
                      {activeBlock.depends}
                    </p>
                    <p className="mt-4 text-xs text-muted-foreground/70">
                      {LAYER_META[activeBlock.layer].hint}
                    </p>
                  </motion.div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Select a block to see what it owns and what it depends on.
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
