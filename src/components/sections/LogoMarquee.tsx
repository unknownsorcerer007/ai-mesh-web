"use client";

import { Reveal } from "@/components/motion-primitives";

/*
  The ONE allowed marquee per page (taste-skill §5).
  Placement: under the hero, never inside it.
  Logos only, no category labels (LOGO-ONLY rule).
  Honest framing: tools Halcyon silences/integrates with, not implied endorsement.
  Pauses on hover, halts under reduced motion (globals.css).
*/
const TOOLS = [
  { slug: "slack", name: "Slack" },
  { slug: "github", name: "GitHub" },
  { slug: "linear", name: "Linear" },
  { slug: "notion", name: "Notion" },
  { slug: "figma", name: "Figma" },
  { slug: "sentry", name: "Sentry" },
  { slug: "visualstudiocode", name: "VS Code" },
  { slug: "discord", name: "Discord" },
  { slug: "googledocs", name: "Google Docs" },
  { slug: "apple", name: "Apple" },
];

export function LogoMarquee() {
  const row = [...TOOLS, ...TOOLS];
  return (
    <section className="py-10 border-y border-border bg-background/60" aria-label="Integrations">
      <Reveal className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <p className="text-center text-xs text-muted-foreground/70 mb-7 tracking-wide">
          Halcyon silences the tools that interrupt you
        </p>
        <div
          className="relative overflow-hidden marquee-paused"
          role="list"
          aria-label="Supported integrations"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max marquee-track gap-12 items-center">
            {row.map((t, i) => (
              <div
                key={`${t.slug}-${i}`}
                role="listitem"
                className="flex items-center gap-2.5 text-muted-foreground/60 hover:text-foreground/80 transition-colors shrink-0"
              >
                {/* real SVG logos via Simple Icons CDN */}
                <img
                  src={`https://cdn.simpleicons.org/${t.slug}/ffffff`}
                  alt=""
                  width="20"
                  height="20"
                  className="opacity-70"
                  loading="lazy"
                />
                <span className="text-sm font-medium tracking-tight">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
