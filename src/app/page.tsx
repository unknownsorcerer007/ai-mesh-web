import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { BentoFeatures } from "@/components/sections/BentoFeatures";
import { StatLed } from "@/components/sections/StatLed";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonial } from "@/components/sections/Testimonial";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { NewsletterForm } from "@/components/sections/NewsletterForm";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

/*
  Halcyon — a focus timer for engineers who ship.

  Design Read (taste-skill §0):
  "Reading this as: a single-page brand landing for a developer-focused
  deep-work tool, with a dark, warm-minimal language and restrained motion,
  built on Next.js 16 + Tailwind v4 + shadcn + Motion."

  Dials: DESIGN_VARIANCE 7 · MOTION_INTENSITY 6 · VISUAL_DENSITY 4
  Register: Brand (impeccable). Macrostructure: Bento + Stat-Led hybrid (Hallmark).

  Structural variety across the page (≥ 4 layout families):
  1. Hero — split (content left, live timer right)
  2. LogoMarquee — single horizontal marquee
  3. BentoFeatures — asymmetric bento grid
  4. StatLed — single dominant number
  5. HowItWorks — vertical numbered timeline
  6. Testimonial — single pull quote
  7. Pricing — 3 tiers, one elevated
  8. Faq — custom grid-rows accordion
  9. Newsletter — 2-col form band
  10. FinalCta — full-width centered banner
  11. Footer — 4-col minimal (mt-auto sticky-to-bottom)

  Skills applied: taste-skill (anti-slop, brief inference, pre-flight),
  emilkowalski (animation decision framework, springs, magnetic hover),
  impeccable (OKLCH warm palette, font discipline, form states, copy denylist),
  open-design (Hallmark macrostructures, craft rules, real component preview).
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
        <HowItWorks />
        <Testimonial />
        <Pricing />
        <Faq />
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <NewsletterForm />
          </div>
        </section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
