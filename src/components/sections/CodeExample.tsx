"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion-primitives";
import { Copy, Check, Terminal } from "@phosphor-icons/react/dist/ssr";

/*
  Real MCP config (verbatim from the AI Mesh README). Mac-style window.
  Copy button with full interaction cycle (idle → copied → idle).
  Code uses warm-on-dark tokens, no rainbow syntax highlighting.
*/

const CONFIG = `{
  "mcpServers": {
    "ai-mesh": {
      "command": "node",
      "args": ["./dist/blocks/mcp/entry.js"]
    }
  }
}`;

const TABS = [
  { id: "claude", label: "Claude Code", file: "claude_desktop_config.json" },
  { id: "codex", label: "Codex", file: "~/.codex/config.toml" },
  { id: "remote", label: "Remote (HTTP)", file: "shell" },
];

const SNIPPETS: Record<string, string> = {
  claude: CONFIG,
  codex: `codex mcp set ai-mesh \\
  '{"command":"node","args":["dist/blocks/mcp/entry.js"]}'`,
  remote: `openclaw mcp set ai-mesh \\
  '{"url":"https://your-server.com/mcp",
    "transport":"streamable-http"}'`,
};

export function CodeExample() {
  const [tab, setTab] = useState("claude");
  const [copied, setCopied] = useState(false);
  const active = TABS.find((t) => t.id === tab)!;
  const code = SNIPPETS[tab];

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
    <section id="code" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-center">
          <Reveal>
            <p className="text-sm text-muted-foreground mb-3">One config line</p>
            <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
              Connect any agent
              <br />
              <span className="text-muted-foreground">in under a minute.</span>
            </h2>
            <p className="mt-5 text-[15px] text-muted-foreground max-w-[44ch] leading-relaxed">
              The same MCP server speaks stdio for local agents and Streamable
              HTTP for remote ones. Pick the transport that matches your setup.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Terminal weight="duotone" className="w-4 h-4 text-primary" aria-hidden="true" />
              18 tools, per-tool rate limits, identity per connection.
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-[0_24px_60px_-30px_oklch(0.78_0.17_165_/_0.25)]">
              {/* mac window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/60">
                <span className="w-3 h-3 rounded-full bg-destructive/70" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-primary/70" aria-hidden="true" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">{active.file}</span>
                <button
                  type="button"
                  onClick={copy}
                  className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-secondary/60"
                  aria-label="Copy config"
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
              <pre className="p-5 text-[13px] leading-relaxed font-mono overflow-x-auto scroll-area-custom">
                <code>
                  {tab === "claude" ? <HighlightedJson code={code} /> : <HighlightedShell code={code} />}
                </code>
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HighlightedJson({ code }: { code: string }) {
  // lightweight JSON tokenizer
  const tokens = code.match(/("(?:\\.|[^"\\])*")\s*:|"(?:\\.|[^"\\])*"|[{}[\],]|\s+|\S/g) ?? [];
  return (
    <>
      {tokens.map((t, i) => {
        if (/^"[^"]*"\s*:?$/.test(t)) {
          const [k, ...rest] = t.split(":");
          return (
            <span key={i}>
              <span className="tok-prop">{k}</span>
              {rest.length ? <span className="tok-punc">:</span> : null}
            </span>
          );
        }
        if (/^"/.test(t)) return <span key={i} className="tok-str">{t}</span>;
        if (/[{}[\],]/.test(t)) return <span key={i} className="tok-punc">{t}</span>;
        return <span key={i}>{t}</span>;
      })}
    </>
  );
}

function HighlightedShell({ code }: { code: string }) {
  return (
    <>
      {code.split("\n").map((line, i) => (
        <span key={i} className="block">
          {line.startsWith("#") || line.startsWith("//") ? (
            <span className="tok-com">{line}</span>
          ) : (
            line.split(/(\s+)/).map((part, j) =>
              part.startsWith('"') || part.startsWith("'") ? (
                <span key={j} className="tok-str">{part}</span>
              ) : /^(codex|openclaw|claude|mcp)$/.test(part) ? (
                <span key={j} className="tok-key">{part}</span>
              ) : (
                <span key={j}>{part}</span>
              )
            )
          )}
          {i < code.split("\n").length - 1 ? "" : ""}
        </span>
      ))}
    </>
  );
}
