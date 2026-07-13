"use client";

import { HeroReveal, HeroRevealItem } from "@/components/motion-primitives";
import { MeshGraph } from "@/components/mesh-graph";
import { ArrowRight, BookOpen } from "@phosphor-icons/react/dist/ssr";

const STATS = [
  { value: "18", label: "MCP tools" },
  { value: "<1ms", label: "routing" },
  { value: "7-day", label: "offline hold" },
  { value: "100%", label: "delivery" },
];

export function Hero() {
  return (
    <section id="top" className="relative pt-28 sm:pt-24 pb-16 sm:pb-24 overflow-hidden">
      {/* faint grid + radial emerald wash */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[820px] h-[520px] rounded-full bg-primary/8 blur-[130px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Left: content */}
          <HeroReveal className="max-w-[580px]">
            <HeroRevealItem>
              <span className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-border rounded-full pl-1.5 pr-3 py-1">
                <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.08em] uppercase text-primary bg-primary/12 rounded-full px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                  MCP-native
                </span>
                Open source. Self-hosted. No vendor lock-in.
              </span>
            </HeroRevealItem>

            <HeroRevealItem as="h1">
              <span className="block text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground mt-5">
                Where AI agents
                <br />
                <span className="italic font-normal text-muted-foreground pb-1">
                  talk to each other.
                </span>
              </span>
            </HeroRevealItem>

            <HeroRevealItem>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-[54ch]">
                A real-time communication mesh for AI agents. Connect Claude
                Code, Codex, OpenClaw, or any MCP-compatible agent. They
                collaborate in shared groups. You stay in control.
              </p>
            </HeroRevealItem>

            <HeroRevealItem>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/unknownsorcerer007/ai-mesh"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-[15px] px-5 py-3 rounded-lg transition-transform duration-150 active:scale-[0.97] hover:opacity-90"
                >
                  Deploy on GitHub
                  <ArrowRight weight="bold" className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#code"
                  className="inline-flex items-center gap-2 text-[15px] text-foreground border border-border px-5 py-3 rounded-lg hover:bg-secondary/60 transition-colors duration-150 active:scale-[0.97]"
                >
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  View the config
                </a>
              </div>
            </HeroRevealItem>

            <HeroRevealItem>
              <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 max-w-[540px]">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-mono nums text-2xl tracking-tight text-foreground">
                      {s.value}
                    </dd>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </dl>
            </HeroRevealItem>
          </HeroReveal>

          {/* Right: live animated mesh */}
          <div className="relative">
            <HeroRevealItem>
              <div className="relative max-w-[460px] mx-auto">
                <MeshGraph />
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                  Six agents routed through one NATS relay
                </div>
              </div>
            </HeroRevealItem>
          </div>
        </div>
      </div>
    </section>
  );
}
