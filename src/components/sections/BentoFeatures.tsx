"use client";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion-primitives";
import {
  Wind,
  ChartBar,
  BellSlash,
  Coffee,
  Keyboard,
} from "@phosphor-icons/react/dist/ssr";

/*
  Macrostructure: Bento Grid (Hallmark).
  5 features → exactly 5 cells, no empty cells, grid-flow-dense.
  Layout families differ from every other section on the page.
  ≥3 cells carry real visual variation (waveform, bar chart, kbd).
  Icons: Phosphor duotone (taste-skill icon guidance).
*/

function FocusWaveform() {
  // Static waveform representing a focus session's intensity curve.
  const bars = [12, 20, 34, 28, 44, 52, 40, 58, 64, 50, 38, 26, 18, 10];
  return (
    <div className="flex items-end gap-1 h-16" aria-hidden="true">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-full bg-primary/30"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

function MiniChart() {
  // Real data viz: deep-work hours per day this week.
  const days = [
    { d: "M", h: 2.1 },
    { d: "T", h: 3.4 },
    { d: "W", h: 4.2 },
    { d: "T", h: 1.8 },
    { d: "F", h: 3.9 },
    { d: "S", h: 2.6 },
    { d: "S", h: 0.4 },
  ];
  const max = Math.max(...days.map((x) => x.h));
  return (
    <div className="flex items-end gap-2 h-16" aria-hidden="true">
      {days.map((x, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-full flex items-end h-full">
            <div
              className="w-full rounded-t-sm bg-foreground/70"
              style={{ height: `${(x.h / max) * 100}%` }}
            />
          </div>
          <span className="text-[9px] text-muted-foreground/60 nums">{x.d}</span>
        </div>
      ))}
    </div>
  );
}

export function BentoFeatures() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="max-w-[640px] mb-12">
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
            Five things Halcyon does
            <br />
            <span className="text-muted-foreground">that a timer can&apos;t.</span>
          </h2>
        </Reveal>

        <StaggerGroup
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 grid-flow-dense auto-rows-[minmax(140px,auto)]"
          stagger={0.07}
        >
          {/* A — big, top-left, 2x2, with waveform */}
          <StaggerItem className="md:col-span-2 lg:row-span-2 lg:col-span-2">
            <article className="h-full rounded-2xl border border-border bg-card p-7 flex flex-col justify-between hover:border-border/80 transition-colors">
              <div>
                <span className="grid place-items-center w-10 h-10 rounded-lg bg-primary/12 ring-1 ring-primary/20 mb-5">
                  <Wind weight="duotone" className="w-5 h-5 text-primary" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-medium tracking-tight text-foreground">
                  Flow mode
                </h3>
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed max-w-[42ch]">
                  Halcyon writes 47 distracting domains to your hosts file for the
                  duration of a session. They stop resolving. You stop reaching for
                  them.
                </p>
              </div>
              <div className="mt-6">
                <FocusWaveform />
                <p className="mt-2 text-[11px] text-muted-foreground/60">
                  A typical 25-minute session, intensity over time
                </p>
              </div>
            </article>
          </StaggerItem>

          {/* B — wide, 2x1, with bar chart */}
          <StaggerItem className="md:col-span-2 lg:col-span-2">
            <article className="h-full rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-border/80 transition-colors">
              <div className="flex items-start gap-4">
                <span className="grid place-items-center w-10 h-10 rounded-lg bg-secondary ring-1 ring-border shrink-0">
                  <ChartBar weight="duotone" className="w-5 h-5 text-foreground/80" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-medium tracking-tight text-foreground">
                    Session analytics
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    Deep-work hours tracked per Git repository. Export to CSV or
                    sync to your standup doc.
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <MiniChart />
              </div>
            </article>
          </StaggerItem>

          {/* C — small, 1x1 */}
          <StaggerItem>
            <article className="h-full rounded-2xl border border-border bg-card p-6 flex flex-col hover:border-border/80 transition-colors">
              <span className="grid place-items-center w-10 h-10 rounded-lg bg-secondary ring-1 ring-border mb-4">
                <BellSlash weight="duotone" className="w-5 h-5 text-foreground/80" aria-hidden="true" />
              </span>
              <h3 className="text-base font-medium tracking-tight text-foreground">
                Slack silence
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                Auto-sets Do Not Disturb for the session. DMs queue, never ping.
              </p>
            </article>
          </StaggerItem>

          {/* D — small, 1x1 */}
          <StaggerItem>
            <article className="h-full rounded-2xl border border-border bg-card p-6 flex flex-col hover:border-border/80 transition-colors">
              <span className="grid place-items-center w-10 h-10 rounded-lg bg-secondary ring-1 ring-border mb-4">
                <Coffee weight="duotone" className="w-5 h-5 text-foreground/80" aria-hidden="true" />
              </span>
              <h3 className="text-base font-medium tracking-tight text-foreground">
                Break reminders
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                A 5-minute break every 52 minutes. Skippable, never naggy.
              </p>
            </article>
          </StaggerItem>

          {/* E — full-width banner, with kbd */}
          <StaggerItem className="md:col-span-2 lg:col-span-4">
            <article className="rounded-2xl border border-border bg-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:border-border/80 transition-colors">
              <div className="flex items-center gap-4">
                <span className="grid place-items-center w-10 h-10 rounded-lg bg-secondary ring-1 ring-border shrink-0">
                  <Keyboard weight="duotone" className="w-5 h-5 text-foreground/80" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-medium tracking-tight text-foreground">
                    Keyboard-first
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Start, pause, and end sessions without leaving the home row.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                <kbd className="font-mono text-sm bg-secondary border border-border rounded-md px-2.5 py-1.5 text-foreground/80 nums">
                  ⌘
                </kbd>
                <kbd className="font-mono text-sm bg-secondary border border-border rounded-md px-2.5 py-1.5 text-foreground/80 nums">
                  ⇧
                </kbd>
                <kbd className="font-mono text-sm bg-secondary border border-border rounded-md px-2.5 py-1.5 text-foreground/80 nums">
                  Space
                </kbd>
              </div>
            </article>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
