"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion-primitives";
import { Copy, Check, Terminal } from "@phosphor-icons/react/dist/ssr";

/*
  Install section — one command to get the MCP server running locally.
  The command clones, installs, builds, and prints the next step (start).
  Copy button with idle → copied → idle cycle. Tabs for stdio vs HTTP so
  the user can pick the transport that matches their MCP client.
*/

const INSTALL = {
  stdio: `curl -fsSL https://raw.githubusercontent.com/unknownsorcerer007/ai-mesh/main/aimesh.sh -o aimesh.sh && chmod +x aimesh.sh && ./aimesh.sh setup`,
  manual: `git clone https://github.com/unknownsorcerer007/ai-mesh.git && \\
cd ai-mesh && npm install && npm run build && mkdir -p data`,
  docker: `docker run -d -p 3737:3737 \\
  -v $(pwd)/data:/app/data \\
  ghcr.io/unknownsorcerer007/ai-mesh:latest`,
};

const TABS = [
  { id: "stdio", label: "One-line install", file: "shell · recommended" },
  { id: "manual", label: "Manual", file: "shell · 4 steps" },
  { id: "docker", label: "Docker", file: "shell · self-hosted" },
] as const;

type TabId = keyof typeof INSTALL;

export function InstallCommand() {
  const [tab, setTab] = useState<TabId>("stdio");
  const [copied, setCopied] = useState(false);
  const code = INSTALL[tab];
  const active = TABS.find((t) => t.id === tab)!;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section className="py-20 sm:py-28 border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-center">
          <Reveal>
            <p className="text-sm text-muted-foreground mb-3">Install in one command</p>
            <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
              Run the server.
              <br />
              <span className="text-muted-foreground">Connect any agent.</span>
            </h2>
            <p className="mt-5 text-[15px] text-muted-foreground max-w-[44ch] leading-relaxed">
              Clone, install, build. The server speaks stdio for local agents
              and HTTP for remote ones. Point your MCP client at the entry
              file and you&apos;re connected.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Terminal weight="duotone" className="w-4 h-4 text-primary" aria-hidden="true" />
              Entry: <code className="font-mono text-foreground/80">dist/blocks/mcp/entry.js</code>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-[0_24px_60px_-30px_oklch(0.3_0.02_165_/_0.25)]">
              {/* chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/60">
                <span className="w-3 h-3 rounded-full bg-destructive/70" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-primary/70" aria-hidden="true" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">{active.file}</span>
                <button
                  type="button"
                  onClick={copy}
                  className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-secondary/60"
                  aria-label="Copy install command"
                >
                  {copied ? (
                    <>
                      <Check weight="bold" className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* tabs */}
              <div className="flex border-b border-border bg-background/40">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className="px-4 py-2.5 text-xs font-medium transition-colors relative"
                    style={{ color: tab === t.id ? "var(--foreground)" : "var(--muted-foreground)" }}
                  >
                    {t.label}
                    {tab === t.id && (
                      <span className="absolute bottom-0 left-3 right-3 h-px bg-primary" />
                    )}
                  </button>
                ))}
              </div>

              {/* code */}
              <pre className="p-5 text-[13px] leading-relaxed font-mono overflow-x-auto scroll-area-custom text-foreground/90">
                <code>{code}</code>
              </pre>
            </div>

            {/* next-step hint */}
            <p className="mt-4 text-xs text-muted-foreground/80 leading-relaxed">
              After install, start the server with{" "}
              <code className="font-mono text-foreground/80">npm start</code> (HTTP on :3737)
              {tab === "stdio" && " or use the entry directly for stdio"}
              {" — then add the MCP config in your agent."}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
