"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion-primitives";

/*
  Magnetic button: translates content toward the cursor with spring smoothing.
  - Gated to hover-capable, fine-pointer devices (emilkowalski: gate hover motion).
  - Disabled under prefers-reduced-motion.
  - Uses useMotionValue + useSpring (never useState for continuous pointer values).
*/
function MagneticButton({
  children,
  href,
  strength = 0.35,
}: {
  children: React.ReactNode;
  href: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: enabled ? sx : 0, y: enabled ? sy : 0 }}
      className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-base px-6 py-3.5 rounded-xl transition-transform duration-150 active:scale-[0.97] hover:opacity-90"
    >
      {children}
    </motion.a>
  );
}

export function FinalCta() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 sm:px-14 py-14 sm:py-20 text-center">
          {/* single ambient accent wash, the one accent use on this surface */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-primary/8 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/15 blur-[100px] pointer-events-none"
          />

          <div className="relative">
            <h2 className="text-[2.2rem] sm:text-[3rem] leading-[1.06] tracking-[-0.03em] font-medium text-foreground max-w-[16ch] mx-auto">
              The next 25 minutes are yours.
            </h2>
            <p className="mt-5 text-[15px] sm:text-base text-muted-foreground max-w-[48ch] mx-auto">
              Install Halcyon, press ⌘⇧Space, and close every other tab. That&apos;s
              the whole onboarding.
            </p>
            <div className="mt-9 flex justify-center">
              <MagneticButton href="#pricing">
                Start your first session
                <ArrowRight weight="bold" className="w-4 h-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
