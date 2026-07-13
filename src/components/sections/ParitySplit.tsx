"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion-primitives";
import { Terminal, Globe } from "@phosphor-icons/react/dist/ssr";

/*
  The engineering superpower: REST and MCP are two equal surfaces
  over the SAME block functions. "No drift" — sanitization, rate-limiting,
  injection detection, membership checks, and self-approval guards can
  never diverge between the two paths. This is what the user said NOT to break.

  Visual: two panels (REST left, MCP right) both arrow into a shared
  "blocks" core. Animated dots flow down both arrows into the core
  to show parity. Reduced motion: static.
*/
const BLOCKS = ["groups", "messages", "approval", "threading", "search", "reactions"];

export function ParitySplit() {
  const reduce = useReducedMotion();
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="max-w-[680px] mb-12">
          <p className="text-sm text-muted-foreground mb-3">Why there&apos;s no drift</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
            Two doors.
            <br />
            <span className="text-muted-foreground">One set of blocks.</span>
          </h2>
          <p className="mt-5 text-[15px] text-muted-foreground max-w-[56ch]">
            REST routes and MCP tools call the same exported block functions.
            Security, membership, and self-approval guards live in one place.
            Add a rule once, it applies to both surfaces.
          </p>
        </Reveal>

        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
            <div className="grid md:grid-cols-[1fr_auto_1.2fr] gap-6 md:gap-8 items-stretch">
              {/* REST panel */}
              <SurfacePanel
                icon={<Globe weight="duotone" className="w-5 h-5" aria-hidden="true" />}
                title="REST"
                sub="HTTP routes"
                items={["POST /messages", "POST /groups", "POST /approval/submit", "GET /search"]}
              />

              {/* center: animated convergence */}
              <div className="flex md:flex-col items-center justify-center gap-3 py-2 md:py-0">
                <Conduit reduce={reduce} />
                <div className="rounded-lg bg-primary/12 ring-1 ring-primary/25 px-3 py-1.5 text-[11px] font-mono text-primary tracking-wide">
                  same fn
                </div>
                <Conduit reduce={reduce} />
              </div>

              {/* MCP panel */}
              <SurfacePanel
                icon={<Terminal weight="duotone" className="w-5 h-5" aria-hidden="true" />}
                title="MCP"
                sub="18 tools, 3 transports"
                items={["send_message", "create_group", "submit_approval", "search_messages"]}
                align="right"
              />
            </div>

            {/* the shared blocks core */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-xs tracking-[0.08em] uppercase text-muted-foreground/70 mb-4 text-center">
                Shared block functions
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {BLOCKS.map((b) => (
                  <span
                    key={b}
                    className="font-mono text-xs bg-secondary/70 border border-border rounded-md px-2.5 py-1 text-foreground/85"
                  >
                    {b}
                  </span>
                ))}
                <span className="font-mono text-xs bg-secondary/70 border border-border rounded-md px-2.5 py-1 text-muted-foreground">
                  + 6 more
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SurfacePanel({
  icon,
  title,
  sub,
  items,
  align = "left",
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  items: string[];
  align?: "left" | "right";
}) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-5">
      <div className={`flex items-center gap-3 mb-4 ${align === "right" ? "md:justify-end" : ""}`}>
        <span className="grid place-items-center w-9 h-9 rounded-lg bg-secondary ring-1 ring-border text-foreground/80">
          {icon}
        </span>
        <div>
          <div className="text-sm font-medium text-foreground">{title}</div>
          <div className="text-xs text-muted-foreground">{sub}</div>
        </div>
      </div>
      <ul className={`space-y-1.5 ${align === "right" ? "md:text-right" : ""}`}>
        {items.map((it) => (
          <li
            key={it}
            className="font-mono text-xs text-muted-foreground"
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Conduit({ reduce }: { reduce: boolean | null }) {
  // A vertical (desktop) / horizontal (mobile) line with a traveling dot.
  return (
    <div className="relative h-8 md:h-16 w-16 md:w-px bg-border md:bg-border">
      <div className="absolute inset-0 md:static md:h-px md:w-16 md:bg-border bg-border" />
      {!reduce && (
        <motion.span
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary md:left-auto md:top-auto md:translate-x-0 md:translate-y-0"
          style={{ top: "0%" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
