# AI Mesh — Landing

The marketing site for [AI Mesh](https://github.com/unknownsorcerer007/ai-mesh), the open-source, MCP-native real-time communication mesh for AI agents.

This is a **separate Next.js app** for the landing page. It does NOT contain the MCP server, the block architecture, or any backend code — that lives in the main `ai-mesh` repo. This split keeps the real product code untouched while letting the marketing site ship independently.

## What's inside

A single-page brand landing with 14 distinct layout families (no hero → 3-features → CTA → footer fingerprint):

1. **Hero** — split layout, live animated mesh graph (6 agent nodes orbiting a central NATS relay, data packets traveling edges)
2. **Logo marquee** — agents and infrastructure it connects
3. **Bento features** — asymmetric grid of real capabilities
4. **Stat-led** — real config values from the codebase (16 KB message cap, 7-day offline hold, 120/min rate limit, <1s restart)
5. **REST ⇄ MCP parity** — the "no drift" superpower, visualized
6. **18 MCP tools** — verbatim from `src/blocks/mcp/universal.ts`, grouped, with real per-tool rate limits
7. **Block architecture** — interactive 15-cell grid (12 blocks + core + shared), preserves the exact names from the MCP server
8. **Security fixes** — all 18 real fixes from `FIXES_APPLIED.md`, grouped by severity
9. **How it works** — 3 numbered steps
10. **Code example** — tabbed, real MCP config for Claude Code / Codex / Remote HTTP, with copy
11. **Approval flow** — human-in-the-loop with self-approval guard
12. **CLI + REST API** — the real `aimesh` commands and REST endpoints, tabbed
13. **Agent Card** — a 3D flipping card (CSS perspective + preserve-3d) + side offer panel. Placeholder for an upcoming launch.
14. **Final CTA** + minimal footer

## Design

- **Theme:** light, warm off-white canvas (`oklch(0.985 0.004 165)`) with a deeper emerald accent (`oklch(0.52 0.13 165)`). No pure black, no pure white. Tinted neutrals toward the emerald hue.
- **Type:** Geist (sans) + Geist Mono (code/data), tabular-nums for numbers.
- **Motion:** motivated only. Custom easing tokens, spring-smoothed magnetic CTA, scroll-reveal stagger, 3D card flip, marquee. All `transform`/`opacity`, all `prefers-reduced-motion` aware.
- **No AI-slop tells:** no default Tailwind indigo/violet, no purple→blue gradient hero, no Inter-as-default, no emoji icons, no 3-equal-card feature rows, zero em-dashes in copy.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript 5 (strict)
- Tailwind CSS 4 + shadcn/ui
- Framer Motion (Motion) for animation
- Phosphor Icons
- z-ai-web-dev-sdk (for the OG image generation pipeline)

## Develop

```bash
bun install
bun run dev          # http://localhost:3000
bun run lint         # ESLint
npx tsc --noEmit     # type-check
```

## Deploy

This is a standard Next.js app — deploy to Vercel, Railway, or any Node host. Set `metadataBase` in `src/app/layout.tsx` to your production URL before shipping.

## Relationship to `ai-mesh`

| | `ai-mesh` | `ai-mesh-web` (this repo) |
|---|---|---|
| What | The MCP server + relay + dashboard SPA | The marketing landing page |
| Stack | Fastify + NATS + SQLite + MCP SDK | Next.js 16 + Tailwind + Motion |
| Served at | `ai-mesh-app-production.up.railway.app` | your hosting of choice |
| Block architecture | lives here | referenced by name, not duplicated |

The landing page reads the *real* numbers, tool names, and fix list from the `ai-mesh` codebase and surfaces them verbatim — no marketing fluff that drifts from the implementation.

## License

MIT, matching the main `ai-mesh` repo.
