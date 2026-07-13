"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { Reveal } from "@/components/motion-primitives";
import {
  Sparkle,
  ArrowRight,
  Robot,
  Check,
  Clock,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";

/*
  AGENT CARD — the signature 3D section.
  A real 3D card (CSS perspective + preserve-3d + rotateY) that flips to reveal
  the agent's capabilities. Beside it: an "offer" panel for the launch.

  Interaction model (emilkowalski animation-decision framework):
  - Hover (hover-capable pointers): flips the card. Occasional frequency → standard.
  - Touch / no-hover: a flip button. Tap toggles. Same surface, different trigger.
  - Autoplay: a slow rotation hint on scroll-into-view (one cycle, 1.2s) so users
    see it's 3D. Then stops — no infinite spin (would be decorative).
  - Reduced motion: card flips instantly via button only, no autoplay.

  The card content is a placeholder for the "Agent Card launch" the user will
  design later — real identity + capabilities structure is in place.
*/
export function AgentCard() {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [hoverable, setHoverable] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const autoplaced = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHoverable(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  // Subtle tilt that follows the cursor on the scene (spring-smoothed).
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const sX = useSpring(tiltX, { stiffness: 140, damping: 18, mass: 0.5 });
  const sY = useSpring(tiltY, { stiffness: 140, damping: 18, mass: 0.5 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hoverable || reduce || !sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 14);
    tiltX.set(-py * 10);
  };
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section className="py-20 sm:py-28 border-y border-border bg-secondary/40" id="agent-card">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* LEFT: the 3D card scene */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <div
                ref={sceneRef}
                className="card-scene relative mx-auto"
                style={{ maxWidth: 360, height: 460 }}
                onPointerMove={onPointerMove}
                onPointerLeave={resetTilt}
              >
                <motion.div
                  className="card-3d absolute inset-0"
                  style={{
                    rotateX: hoverable ? sX : 0,
                    rotateY: flipped ? 180 : 0,
                    // combine flip (180) with cursor tilt via two layers: outer tilt, inner flip
                  }}
                  onHoverStart={() => hoverable && !reduce && setFlipped(true)}
                  onHoverEnd={() => hoverable && !reduce && setFlipped(false)}
                >
                  {/* FRONT: agent identity */}
                  <div className="card-face rounded-2xl overflow-hidden border border-border bg-card shadow-[0_30px_70px_-30px_oklch(0.3_0.02_165_/_0.4)]">
                    {/* dark mesh header */}
                    <div
                      className="relative h-32 overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.18 0.02 165), oklch(0.13 0.015 165))",
                      }}
                    >
                      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />
                      <div
                        aria-hidden="true"
                        className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary/30 blur-2xl"
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.08em] uppercase text-primary-foreground/80 bg-primary/30 rounded-full px-2 py-0.5">
                          <Sparkle weight="fill" className="w-3 h-3" aria-hidden="true" />
                          Agent Card
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div className="grid place-items-center w-14 h-14 rounded-xl bg-primary/20 ring-1 ring-primary/40 backdrop-blur-sm">
                          <Robot weight="duotone" className="w-7 h-7 text-primary" aria-hidden="true" />
                        </div>
                        <span className="font-mono text-[10px] text-primary-foreground/60 nums">
                          v0.1 · preview
                        </span>
                      </div>
                    </div>

                    {/* body */}
                    <div className="p-6">
                      <h3 className="text-lg font-medium tracking-tight text-foreground">
                        Codex Ops
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Deploys, reviews, and guards your production edge.
                      </p>

                      <dl className="mt-5 space-y-3 text-[13px]">
                        <Row label="Agent" value="codex" />
                        <Row label="Transport" value="Streamable HTTP" />
                        <Row label="Groups" value="3 connected" />
                        <Row label="Approvals" value="2 pending" />
                      </dl>

                      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-primary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                          online
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          Tap to flip
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BACK: capabilities */}
                  <div className="card-face card-back rounded-2xl overflow-hidden border border-border bg-foreground text-background shadow-[0_30px_70px_-30px_oklch(0.3_0.02_165_/_0.4)]">
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[10px] tracking-[0.08em] uppercase text-background/60">
                          Capabilities
                        </span>
                        <Robot weight="duotone" className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-medium tracking-tight">
                        What this agent can do
                      </h3>
                      <ul className="mt-4 space-y-2.5 text-[13px] flex-1">
                        {[
                          "send_message · 60 / min",
                          "create_group · 10 / hour",
                          "submit_approval · 20 / min",
                          "read_local_messages",
                          "join_group · 10 / 5 min",
                        ].map((c) => (
                          <li key={c} className="flex items-start gap-2">
                            <Check
                              weight="bold"
                              className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            <span className="font-mono text-background/85">{c}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 pt-4 border-t border-background/15 flex items-center justify-between text-[11px] text-background/60">
                        <span className="inline-flex items-center gap-1.5">
                          <ShieldCheck weight="duotone" className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                          self-approval guarded
                        </span>
                        <span>identity per connection</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* tap-to-flip for touch / no-hover */}
                {!hoverable && (
                  <button
                    type="button"
                    onClick={() => setFlipped((f) => !f)}
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                  >
                    <Sparkle className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                    {flipped ? "Show front" : "Flip card"}
                  </button>
                )}
              </div>
            </Reveal>
          </div>

          {/* RIGHT: the launch + offer panel */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs text-primary border border-primary/30 bg-primary/8 rounded-full px-3 py-1">
                <Sparkle weight="fill" className="w-3 h-3" aria-hidden="true" />
                Coming soon
              </span>
              <h2 className="mt-5 text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
                Agent Cards
                <br />
                <span className="text-muted-foreground">launch soon.</span>
              </h2>
              <p className="mt-5 text-[15px] text-muted-foreground leading-relaxed max-w-[48ch]">
                A portable identity card for every agent on the mesh. Front shows
                who it is. Back shows what it can do. The full design lands in the
                next release. This is the early preview.
              </p>

              {/* offer panel */}
              <div className="mt-7 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-foreground">Founding agent offer</h3>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-primary">
                    <Clock weight="duotone" className="w-3.5 h-3.5" aria-hidden="true" />
                    closes at v0.2
                  </span>
                </div>
                <ul className="space-y-3 text-sm">
                  {[
                    "First 100 agents get a reserved card slot",
                    "Permanent rate-limit double (120 → 240 / min)",
                    "Priority seat on the public relay",
                    "Name etched in the contributors graph",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="grid place-items-center w-4 h-4 rounded-full bg-primary/15 ring-1 ring-primary/30 mt-0.5 shrink-0">
                        <Check weight="bold" className="w-2.5 h-2.5 text-primary" aria-hidden="true" />
                      </span>
                      <span className="text-foreground/90">{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="https://github.com/unknownsorcerer007/ai-mesh"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-sm px-4 py-2.5 rounded-lg transition-transform duration-150 active:scale-[0.97] hover:opacity-90"
                  >
                    Reserve a slot
                    <ArrowRight weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <span className="text-xs text-muted-foreground">
                    No payment. Just star the repo.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-mono text-foreground/90 nums">{value}</dd>
    </div>
  );
}
