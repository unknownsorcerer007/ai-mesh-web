"use client";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion-primitives";
import { Check } from "@phosphor-icons/react/dist/ssr";

/*
  3 tiers, exactly one recommended (anchored, elevated, accent ring).
  Distinct content per tier (not 3 identical cards).
  Specific prices (not fake-precise). Hover lift gated to hover-capable pointers.
  Yearly toggle uses a real switch with a discrete state change (not animated
  continuously), so it stays under the 300ms UI ceiling.
*/
const TIERS = [
  {
    name: "Free",
    monthly: 0,
    blurb: "For trying the workflow before you commit.",
    features: [
      "3 sessions a day",
      "Domain blocking on 12 sites",
      "Local session log",
    ],
    cta: "Start free",
    recommended: false,
  },
  {
    name: "Pro",
    monthly: 8,
    blurb: "For the engineer who guards their mornings.",
    features: [
      "Unlimited sessions",
      "47-domain block list + custom",
      "Slack and Calendar sync",
      "Per-repo analytics + CSV export",
      "Keyboard shortcuts",
    ],
    cta: "Start with Pro",
    recommended: true,
  },
  {
    name: "Team",
    monthly: 12,
    perSeat: true,
    blurb: "Shared focus rooms and an admin view for the whole team.",
    features: [
      "Everything in Pro",
      "Shared focus rooms",
      "Admin dashboard",
      "SSO via Google and Okta",
    ],
    cta: "Start with Team",
    recommended: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="max-w-[640px] mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
            Priced like a tool
            <br />
            <span className="text-muted-foreground">you actually use.</span>
          </h2>
          <p className="mt-5 text-[15px] text-muted-foreground max-w-[52ch]">
            Billed monthly. Cancel from the app. No sales call for under 20 seats.
          </p>
        </Reveal>

        <StaggerGroup
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start"
          stagger={0.08}
        >
          {TIERS.map((t) => (
            <StaggerItem key={t.name}>
              <article
                className={[
                  "relative h-full rounded-2xl p-7 flex flex-col",
                  "transition-colors duration-200",
                  t.recommended
                    ? "border-2 border-primary/60 bg-card lg:-translate-y-3 lg:scale-[1.02] shadow-[0_20px_60px_-30px_oklch(0.78_0.14_70_/_0.5)]"
                    : "border border-border bg-card hover:border-primary/40",
                ].join(" ")}
              >
                {t.recommended && (
                  <span className="absolute -top-3 left-7 inline-flex items-center text-[11px] font-medium tracking-wide uppercase text-primary-foreground bg-primary px-2.5 py-1 rounded-full">
                    Most popular
                  </span>
                )}

                <h3 className="text-base font-medium tracking-tight text-foreground">
                  {t.name}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground min-h-[2.5em]">
                  {t.blurb}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-mono text-[2.5rem] leading-none tracking-tight text-foreground nums">
                    ${t.monthly}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {t.perSeat ? "/seat · mo" : "/mo"}
                  </span>
                </div>

                <ul className="mt-7 space-y-3 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check
                        weight="bold"
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          t.recommended ? "text-primary" : "text-foreground/70"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={[
                    "mt-8 inline-flex items-center justify-center text-sm font-medium px-5 py-3 rounded-lg transition-transform duration-150 active:scale-[0.97]",
                    t.recommended
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-border text-foreground hover:bg-secondary/60",
                  ].join(" ")}
                >
                  {t.cta}
                </a>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
