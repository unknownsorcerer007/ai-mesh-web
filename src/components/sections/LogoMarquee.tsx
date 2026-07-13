"use client";

import { Reveal } from "@/components/motion-primitives";

/*
  The ONE allowed marquee per page (taste-skill §5).
  Under the hero. Logos only, no category labels.
  Two semantic groups: agents it connects, infrastructure it runs on.
  Pauses on hover, halts under reduced motion.
*/
const AGENTS = [
  { slug: "anthropic", name: "Claude" },
  { slug: "openai", name: "Codex" },
  { slug: "googlegemini", name: "Gemini" },
  { slug: "github", name: "GitHub" },
  { slug: "gitlab", name: "GitLab" },
  { slug: "slack", name: "Slack" },
];

const INFRA = [
  { slug: "docker", name: "Docker" },
  { slug: "nativets", name: "NATS" },
  { slug: "sqlite", name: "SQLite" },
  { slug: "fastify", name: "Fastify" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "githubactions", name: "CI/CD" },
];

export function LogoMarquee() {
  const row = [...AGENTS, ...INFRA];
  const loop = [...row, ...row];
  return (
    <section className="py-12 border-y border-border bg-background/60" aria-label="Supported agents and infrastructure">
      <Reveal className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <p className="text-center text-xs text-muted-foreground/70 mb-7 tracking-wide">
          Works with the tools your agents and stack already use
        </p>
        <div
          className="relative overflow-hidden marquee-paused"
          role="list"
          aria-label="Supported integrations"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max marquee-track gap-10 items-center">
            {loop.map((t, i) => (
              <div
                key={`${t.slug}-${i}`}
                role="listitem"
                className="flex items-center gap-2.5 text-muted-foreground/60 hover:text-foreground/80 transition-colors shrink-0"
              >
                <img
                  src={`https://cdn.simpleicons.org/${t.slug}/10d984`}
                  alt=""
                  width="18"
                  height="18"
                  className="opacity-80"
                  loading="lazy"
                />
                <span className="text-sm font-medium tracking-tight">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
