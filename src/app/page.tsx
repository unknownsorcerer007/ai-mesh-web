import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { BentoFeatures } from "@/components/sections/BentoFeatures";
import { StatLed } from "@/components/sections/StatLed";
import { ParitySplit } from "@/components/sections/ParitySplit";
import { McpTools } from "@/components/sections/McpTools";
import { BlockArchitecture } from "@/components/sections/BlockArchitecture";
import { SecurityFixes } from "@/components/sections/SecurityFixes";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CodeExample } from "@/components/sections/CodeExample";
import { ApprovalFlow } from "@/components/sections/ApprovalFlow";
import { CliApi } from "@/components/sections/CliApi";
import { AgentCard } from "@/components/sections/AgentCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

/*
  AI Mesh — real-time communication mesh for AI agents (v2, light theme).

  Design Read (taste-skill §0):
  "Reading this as: a single-page brand landing for an open-source,
  self-hosted, MCP-native agent communication platform (developer
  audience), light warm off-white canvas with a deeper emerald accent,
  leaning into the mesh-topology metaphor. Content is sourced verbatim
  from the codebase (18 MCP tools, 18 security fixes, aimesh CLI, REST
  endpoints). Built on Next.js 16 + Tailwind v4 + Motion."

  Dials: DESIGN_VARIANCE 8 · MOTION_INTENSITY 7 · VISUAL_DENSITY 5
  Register: Brand. Strategy: Restrained (emerald accent ≤10%).
  Color strategy SHIFT: dark → warm light (user requested lighter palette).

  Structural variety (14 distinct layout families — no repetition):
  1. Hero — split (content left, live animated mesh right)
  2. LogoMarquee — single horizontal marquee
  3. BentoFeatures — asymmetric bento grid
  4. StatLed — 4 real config-value metrics in a divided grid
  5. ParitySplit — twin REST/MCP panels converging on shared blocks
  6. McpTools — 6-group grid of the real 18 MCP tools
  7. BlockArchitecture — interactive 15-cell block grid + detail panel
  8. SecurityFixes — 3-column severity-grouped real fix list
  9. HowItWorks — vertical numbered timeline
  10. CodeExample — mac window with tabbed real MCP config + copy
  11. ApprovalFlow — 3-step human-in-the-loop with outcome pills
  12. CliApi — tabbed CLI/REST surface, scrollable
  13. AgentCard — SIGNATURE 3D flipping card + side offer panel (NEW)
  14. FinalCta — full-width banner with magnetic primary
  + Footer (mt-auto sticky-to-bottom)

  Block architecture preserved (user: "block architecture ko break mat
  karna"): 12 blocks + core + shared by real names in #architecture.
  REST ⇄ MCP parity featured. New sections surface REAL codebase content
  (18 tools, 18 fixes, CLI, API) the user asked for.

  Skills applied: taste-skill (anti-slop, brief inference, structural
  variety), emilkowalski (animation decision framework, springs,
  reduced-motion, 3D card with cursor tilt), impeccable (light OKLCH
  palette, deeper emerald for contrast on light, font discipline Geist,
  copy denylist zero em-dashes, real content not marketing fluff),
  open-design (Hallmark macrostructures, craft rules, real component
  preview not fake screenshot).
*/

export default function Home() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:text-sm"
      >
        Skip to main content
      </a>
      <Nav />
      <main className="flex-1">
        <Hero />
        <LogoMarquee />
        <BentoFeatures />
        <StatLed />
        <ParitySplit />
        <McpTools />
        <BlockArchitecture />
        <SecurityFixes />
        <HowItWorks />
        <CodeExample />
        <ApprovalFlow />
        <CliApi />
        <AgentCard />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
