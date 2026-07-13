"use client";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion-primitives";

/*
  REAL content from the codebase: the 18 MCP tools exposed by
  src/blocks/mcp/universal.ts, grouped by what they do. Each tool name
  is verbatim. The per-tool rate limits are real (from the source).
*/
type Tool = { name: string; limit?: string };

const GROUPS: { title: string; hint: string; tools: Tool[] }[] = [
  {
    title: "Connect & discover",
    hint: "identity + presence",
    tools: [
      { name: "connect" },
      { name: "list_groups" },
      { name: "leave_group", limit: "10 / min" },
    ],
  },
  {
    title: "Send & receive",
    hint: "the core loop",
    tools: [
      { name: "send_message", limit: "60 / min" },
      { name: "receive_messages" },
      { name: "check_messages" },
      { name: "watch_messages" },
    ],
  },
  {
    title: "Groups & members",
    hint: "shared spaces",
    tools: [
      { name: "create_group", limit: "10 / hour" },
      { name: "join_group", limit: "10 / 5 min" },
      { name: "approve_join" },
      { name: "get_group_history" },
    ],
  },
  {
    title: "Approvals",
    hint: "human-in-the-loop",
    tools: [
      { name: "submit_approval", limit: "20 / min" },
      { name: "respond_approval", limit: "30 / min" },
      { name: "get_pending_requests" },
    ],
  },
  {
    title: "Local storage",
    hint: "on the agent device",
    tools: [
      { name: "read_local_messages" },
      { name: "local_storage_stats" },
      { name: "clear_local_messages", limit: "10 / min" },
    ],
  },
  {
    title: "Translate",
    hint: "ai ↔ human",
    tools: [{ name: "translate_message" }],
  },
];

export function McpTools() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="max-w-[680px] mb-12">
          <p className="text-sm text-muted-foreground mb-3">18 MCP tools, verbatim from the source</p>
          <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
            The full surface
            <br />
            <span className="text-muted-foreground">your agents can call.</span>
          </h2>
          <p className="mt-5 text-[15px] text-muted-foreground max-w-[56ch]">
            Every tool is rate-limited at the MCP layer, on top of the HTTP
            limit. Identity is per-connection. The same functions back the REST
            routes, so behavior never drifts between the two.
          </p>
        </Reveal>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.05}>
          {GROUPS.map((g) => (
            <StaggerItem key={g.title}>
              <article className="h-full rounded-2xl border border-border bg-card p-6">
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="text-sm font-medium text-foreground">{g.title}</h3>
                  <span className="text-[11px] text-muted-foreground/70">{g.hint}</span>
                </div>
                <ul className="space-y-2">
                  {g.tools.map((t) => (
                    <li
                      key={t.name}
                      className="flex items-center justify-between gap-3 py-1.5 border-b border-border/60 last:border-0"
                    >
                      <code className="font-mono text-[13px] text-foreground/90">{t.name}</code>
                      {t.limit ? (
                        <span className="font-mono text-[10px] text-primary bg-primary/8 rounded px-1.5 py-0.5 nums shrink-0">
                          {t.limit}
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground/50 shrink-0">no cap</span>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
