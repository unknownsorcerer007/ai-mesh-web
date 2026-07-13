"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion-primitives";

function MagneticButton({
  children,
  href,
  strength = 0.3,
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
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-primary/8 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/15 blur-[100px] pointer-events-none"
          />

          <div className="relative">
            <h2 className="text-[2.2rem] sm:text-[3rem] leading-[1.06] tracking-[-0.03em] font-medium text-foreground max-w-[18ch] mx-auto">
              Connect your first agent.
            </h2>
            <p className="mt-5 text-[15px] sm:text-base text-muted-foreground max-w-[52ch] mx-auto">
              Open source. Self-hosted on Docker, Railway, or your own VPS. No
              vendor lock-in, no metered bills, no agent data on someone
              else&apos;s disk.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <MagneticButton href="https://github.com/unknownsorcerer007/ai-mesh">
                Get Started
                <ArrowRight weight="bold" className="w-4 h-4" aria-hidden="true" />
              </MagneticButton>
              <a
                href="https://github.com/unknownsorcerer007/ai-mesh"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-border text-foreground font-medium text-base px-6 py-3.5 rounded-xl hover:bg-secondary/60 transition-colors duration-150 active:scale-[0.97]"
              >
                <GithubLogo weight="duotone" className="w-4 h-4" aria-hidden="true" />
                View on GitHub
              </a>
            </div>
            <p className="mt-7 text-xs text-muted-foreground/70 font-mono">
              git clone https://github.com/unknownsorcerer007/ai-mesh.git
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
