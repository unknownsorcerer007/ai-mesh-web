"use client";

import { HeroReveal, HeroRevealItem } from "@/components/motion-primitives";
import { LiveTimer } from "@/components/live-timer";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-28 sm:pt-24 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Soft radial wash, single accent tint, fixed depth */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Left: content (NOT centered, per DESIGN_VARIANCE > 4) */}
          <HeroReveal className="max-w-[560px]">
            <HeroRevealItem>
              <span className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-border rounded-full pl-1.5 pr-3 py-1">
                <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.08em] uppercase text-primary bg-primary/12 rounded-full px-2 py-0.5">
                  v1.4
                </span>
                Now with calendar-aware sessions
              </span>
            </HeroRevealItem>

            <HeroRevealItem as="h1">
              <span className="block text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] leading-[1.12] tracking-[-0.03em] font-medium text-foreground mt-5">
                Deep work,
                <br />
                <span className="italic font-normal text-muted-foreground pb-1">
                  undisturbed.
                </span>
              </span>
            </HeroRevealItem>

            <HeroRevealItem>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-[52ch]">
                A focus timer that blocks the tabs and notifications breaking
                your flow. Built for engineers who ship.
              </p>
            </HeroRevealItem>

            <HeroRevealItem>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-[15px] px-5 py-3 rounded-lg transition-transform duration-150 active:scale-[0.97] hover:opacity-90"
                >
                  Start a session
                  <ArrowRight weight="bold" className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#how"
                  className="inline-flex items-center text-[15px] text-foreground border border-border px-5 py-3 rounded-lg hover:bg-secondary/60 transition-colors duration-150 active:scale-[0.97]"
                >
                  See how it works
                </a>
              </div>
            </HeroRevealItem>

            <HeroRevealItem>
              <p className="mt-8 text-sm text-muted-foreground/80">
                Free for 3 sessions a day. No card, no trial timer.
              </p>
            </HeroRevealItem>
          </HeroReveal>

          {/* Right: real working component (not a fake screenshot) */}
          <div className="relative">
            <HeroRevealItem>
              <LiveTimer />
            </HeroRevealItem>
          </div>
        </div>
      </div>
    </section>
  );
}
