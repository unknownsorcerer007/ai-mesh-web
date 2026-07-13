"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
  motion,
} from "framer-motion";
import { Reveal } from "@/components/motion-primitives";

/*
  Macrostructure: Stat-Led (Hallmark).
  ONE dominant number with a methodology note (not the banned 3-stat hero-metric
  template). Count-up is motivated (the number is the point of the section) and
  fires once on in-view. Reduced motion shows the final value instantly.
*/
function CountUp({ to, duration = 1.2 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce, mv]);

  // Reduced motion or not-yet-in-view: show the final value directly (no
  // synchronous setState inside the effect body).
  const value = reduce || !inView ? to : display;

  return (
    <span ref={ref} className="nums">
      {value.toLocaleString("en-US")}
    </span>
  );
}

export function StatLed() {
  return (
    <section className="py-20 sm:py-28 border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="max-w-[760px]">
          <p className="text-sm text-muted-foreground mb-5">
            Last week, across 1,204 active users
          </p>
          <div className="flex items-baseline gap-3 flex-wrap">
            <motion.span
              className="font-mono text-[3.5rem] sm:text-[5.5rem] leading-none tracking-[-0.04em] font-medium text-foreground"
              initial={{ opacity: 0.5 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <CountUp to={2847} />
            </motion.span>
            <span className="text-2xl sm:text-3xl text-muted-foreground tracking-tight">
              hours
            </span>
          </div>
          <p className="mt-5 text-lg text-foreground/90 leading-relaxed max-w-[58ch]">
            of uninterrupted deep work, counted from sessions that ran longer than
            25 minutes without a manual pause.
          </p>
          <p className="mt-3 text-sm text-muted-foreground/70">
            Methodology: aggregate of completed sessions, week of Oct 6. Rolling
            counter resets every Monday at 00:00 UTC.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
