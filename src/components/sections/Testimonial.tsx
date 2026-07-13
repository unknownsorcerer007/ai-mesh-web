"use client";

import { Reveal } from "@/components/motion-primitives";
import { Quotes } from "@phosphor-icons/react/dist/ssr";

/*
  Layout family: single large pull quote (NOT a 3-card testimonial grid).
  Quote body ≤ 3 lines. Specific, not generic. Name + role (no fake company).
*/
export function Testimonial() {
  return (
    <section className="py-20 sm:py-28 border-y border-border bg-secondary/20">
      <div className="mx-auto max-w-[920px] px-5 sm:px-8">
        <Reveal className="text-center">
          <Quotes
            weight="fill"
            className="w-9 h-9 text-primary/60 mx-auto mb-7"
            aria-hidden="true"
          />
          <blockquote className="text-[1.6rem] sm:text-[2.1rem] leading-[1.32] tracking-[-0.02em] text-foreground font-medium">
            Halcyon blocked the Twitter tab I didn&apos;t realize I was opening 40
            times a day. The first week I got the migration PR out the door.
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 ring-1 ring-border grid place-items-center text-sm font-medium text-foreground/80"
              aria-hidden="true"
            >
              LM
            </span>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">Léa Marchetti</div>
              <div className="text-sm text-muted-foreground">Staff Engineer</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
