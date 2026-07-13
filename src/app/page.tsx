import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { BentoFeatures } from "@/components/sections/BentoFeatures";
import { StatLed } from "@/components/sections/StatLed";
import { ParitySplit } from "@/components/sections/ParitySplit";
import { BlockArchitecture } from "@/components/sections/BlockArchitecture";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CodeExample } from "@/components/sections/CodeExample";
import { ApprovalFlow } from "@/components/sections/ApprovalFlow";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

/*
  AI Mesh — real-time communication mesh for AI agents.

  Design Read (taste-skill §0):
  "Reading this as: a single-page brand landing for an open-source,
  self-hosted, MCP-native agent communication platform (developer
  audience), with a dark, signal-relay aesthetic leaning into the
  mesh-topology metaphor, signal-emerald accent on warm near-black,
  technical-but-restrained motion, built on Next.js 16 + Tailwind v4
  + shadcn + Motion."

  Dials: DESIGN_VARIANCE 7 · MOTION_INTENSITY 7 · VISUAL_DENSITY 5
  Register: Brand (impeccable). Color strategy: Committed (emerald).
  Macrostructure: Bento + Stat-Led hybrid (Hallmark).

  Structural variety (11 distinct layout families, no repetition):
  1. Hero — split (content left, live animated mesh right)
  2. LogoMarquee — single horizontal marquee
  3. BentoFeatures — asymmetric bento grid
  4. StatLed — 4 real config-value metrics in a divided grid
  5. ParitySplit — twin REST/MCP panels converging on shared blocks
  6. BlockArchitecture — interactive 15-cell block grid + detail panel
  7. HowItWorks — vertical numbered timeline
  8. CodeExample — mac window with tabbed real MCP config + copy
  9. ApprovalFlow — 3-step human-in-the-loop with outcome pills
  10. FinalCta — full-width banner with magnetic primary
  11. Footer — 4-col minimal (mt-auto sticky-to-bottom)

  Block architecture preserved (user: "block architecture ko break mat
  karna"): the 12 feature blocks + core + shared layers are presented
  by their real names in #architecture. REST ⇄ MCP parity (the
  superpower) is its own section. Nothing renamed, nothing restructured.

  Skills applied: taste-skill (anti-slop, brief inference, pre-flight),
  emilkowalski (animation decision framework, springs, magnetic hover,
  reduced-motion), impeccable (OKLCH emerald palette, font discipline
  Geist, copy denylist zero em-dashes, signal-not-decorative motion),
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
        <BlockArchitecture />
        <HowItWorks />
        <CodeExample />
        <ApprovalFlow />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
