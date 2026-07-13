"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion-primitives";

/*
  Layout family: vertical numbered timeline (NOT 3-equal-cards).
  The connecting line draws in on scroll (motivated: shows progression).
  Step labels are the content itself, not "Stage 1 / Stage 2" scaffolding.
*/
const STEPS = [
  {
    n: "01",
    title: "Press ⌘⇧Space",
    body: "Halcyon opens a small prompt. Optionally tag the Git repo you're working in. It takes two seconds, or skip it entirely.",
  },
  {
    n: "02",
    title: "Focus",
    body: "Distracting domains stop resolving in your browser. Slack flips to Do Not Disturb. The timer runs for 25 minutes and the menu bar shows one quiet ring.",
  },
  {
    n: "03",
    title: "Ship",
    body: "When the session ends, Halcyon logs the deep-work hours against the repo and asks what you finished. The answer feeds your weekly standup doc.",
  },
];

export function HowItWorks() {
  const reduce = useReducedMotion();
  return (
    <section id="how" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="max-w-[640px] mb-14">
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
            Three steps. No setup
            <br />
            <span className="text-muted-foreground">wizard, no account import.</span>
          </h2>
        </Reveal>

        <div className="relative pl-8 sm:pl-12">
          {/* Drawing line */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-px bg-border origin-top"
            initial={reduce ? { scaleY: 1, opacity: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />

          <ol className="space-y-10 sm:space-y-12">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.05} className="relative">
                <span
                  className="absolute -left-8 sm:-left-12 top-1 grid place-items-center w-6 h-6 rounded-full bg-background border border-border text-[10px] font-mono text-muted-foreground nums"
                  aria-hidden="true"
                >
                  {s.n}
                </span>
                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed max-w-[58ch]">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
