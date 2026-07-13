"use client";

import { useReducedMotion, motion } from "framer-motion";
import { useMemo } from "react";

/*
  The signature animated mesh graph — AI Mesh's hero visual.
  Metaphor made literal: 6 agent nodes orbit a central NATS relay node.
  Data packets travel along edges (message routing). The relay pulses
  a heartbeat ring. Everything is transform/opacity where possible,
  gated by prefers-reduced-motion (static mesh under reduced).

  Performance: 6 packets animating cx/cy. Acceptable for a hero; kept
  off the scroll path (fires once on mount, runs in hero only).
*/

type Node = { id: string; x: number; y: number; r: number; label?: string };

const CX = 210;
const CY = 210;

// 6 agent nodes in a hexagon — precomputed & rounded to avoid SSR/CSR
// floating-point serialization mismatches (hydration errors).
const OUTER: Node[] = [
  { id: "a1", x: 360, y: 210, r: 6 },
  { id: "a2", x: 285, y: 80, r: 6 },
  { id: "a3", x: 135, y: 80, r: 6 },
  { id: "a4", x: 60, y: 210, r: 6 },
  { id: "a5", x: 135, y: 340, r: 6 },
  { id: "a6", x: 285, y: 340, r: 6 },
];

const RELAY: Node = { id: "relay", x: CX, y: CY, r: 13 };

// Edges: 6 spokes + 6 ring + 2 cross
const EDGES: [string, string][] = [
  ...OUTER.map((n) => ["relay", n.id]),
  ...OUTER.map((n, i) => [n.id, OUTER[(i + 1) % OUTER.length].id]),
  [OUTER[0].id, OUTER[3].id],
  [OUTER[1].id, OUTER[4].id],
];

const NODE_MAP: Record<string, Node> = {
  relay: RELAY,
  ...Object.fromEntries(OUTER.map((n) => [n.id, n])),
};

// Packets: which edge, direction (to id), duration, delay, color
const PACKETS = [
  { from: "a1", to: "relay", dur: 2.2, delay: 0 },
  { from: "relay", to: "a3", dur: 2.6, delay: 0.4 },
  { from: "a5", to: "relay", dur: 2.0, delay: 0.8 },
  { from: "relay", to: "a6", dur: 2.4, delay: 1.2 },
  { from: "a2", to: "a4", dur: 3.0, delay: 0.6 },
  { from: "relay", to: "a1", dur: 2.3, delay: 1.6 },
];

export function MeshGraph({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // Stable per-node pulse phase so they don't all blink in unison
  const phases = useMemo(
    () => OUTER.map((_, i) => (i * 0.5) % 2),
    []
  );

  return (
    <div className={className}>
      <svg
        viewBox="0 0 420 420"
        className="w-full h-auto"
        role="img"
        aria-label="Animated mesh topology: six agent nodes connected to a central relay, with data packets traveling along the edges."
      >
        <defs>
          <radialGradient id="mesh-bg-glow" cx="210" cy="210" r="180">
            <stop offset="0%" stopColor="oklch(0.78 0.17 165)" stopOpacity="0.18" />
            <stop offset="60%" stopColor="oklch(0.78 0.17 165)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="oklch(0.78 0.17 165)" stopOpacity="0" />
          </radialGradient>
          <filter id="packet-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.17 165)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="oklch(0.78 0.17 165)" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* ambient glow */}
        <circle cx={CX} cy={CY} r="180" fill="url(#mesh-bg-glow)" />

        {/* edges */}
        <g stroke="oklch(0.78 0.17 165)" strokeOpacity="0.22" strokeWidth="1">
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODE_MAP[a].x}
              y1={NODE_MAP[a].y}
              x2={NODE_MAP[b].x}
              y2={NODE_MAP[b].y}
            />
          ))}
        </g>

        {/* outer agent nodes (pulsing) */}
        {OUTER.map((n, i) => (
          <g key={n.id}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.r + 5}
              fill="oklch(0.78 0.17 165)"
              fillOpacity={0.12}
              animate={reduce ? { opacity: 0.12 } : { opacity: [0.06, 0.22, 0.06], scale: [0.9, 1.15, 0.9] }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: phases[i] }
              }
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="oklch(0.78 0.17 165)"
              animate={reduce ? {} : { opacity: [0.7, 1, 0.7] }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: phases[i] }
              }
            />
            <circle cx={n.x} cy={n.y} r={n.r - 2.5} fill="oklch(0.16 0.03 165)" fillOpacity={0.6} />
          </g>
        ))}

        {/* center relay node */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={RELAY.r + 8}
          fill="none"
          stroke="oklch(0.78 0.17 165)"
          strokeOpacity={0.4}
          strokeWidth={1}
          animate={reduce ? {} : { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={reduce ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        <circle
          cx={CX}
          cy={CY}
          r={RELAY.r + 3}
          fill="oklch(0.78 0.17 165)"
          fillOpacity={0.15}
          stroke="oklch(0.78 0.17 165)"
          strokeOpacity={0.6}
          strokeWidth={1}
        />
        <circle cx={CX} cy={CY} r={RELAY.r - 3} fill="oklch(0.78 0.17 165)" />
        <circle cx={CX} cy={CY} r={RELAY.r - 6} fill="oklch(0.96 0.01 165)" fillOpacity={0.85} />

        {/* data packets traveling along edges */}
        {!reduce &&
          PACKETS.map((p, i) => {
            const a = NODE_MAP[p.from];
            const b = NODE_MAP[p.to];
            return (
              <motion.circle
                key={i}
                r={3}
                fill="oklch(0.85 0.19 165)"
                filter="url(#packet-glow)"
                initial={{ cx: a.x, cy: a.y, opacity: 0 }}
                animate={{
                  cx: [a.x, b.x, b.x],
                  cy: [a.y, b.y, b.y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: p.dur,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.1, 0.8, 1],
                }}
              />
            );
          })}
      </svg>
    </div>
  );
}
