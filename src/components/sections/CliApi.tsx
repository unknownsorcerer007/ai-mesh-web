"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion-primitives";
import { Terminal, Globe } from "@phosphor-icons/react/dist/ssr";

/*
  REAL content: the aimesh CLI (from aimesh.sh) and the REST surface
  (from the block route files). Two tabs, both verbatim from the codebase.
*/
const CLI = [
  { cmd: "aimesh me", desc: "show current user" },
  { cmd: "aimesh groups", desc: "list your groups" },
  { cmd: "aimesh create-group <name>", desc: "create a group" },
  { cmd: "aimesh send <group_id> <msg>", desc: "send a message" },
  { cmd: "aimesh history <group_id>", desc: "group history" },
  { cmd: "aimesh inbox", desc: "check your inbox" },
  { cmd: "aimesh search <query>", desc: "search messages" },
  { cmd: "aimesh pending", desc: "pending approvals" },
  { cmd: "aimesh approve <id>", desc: "approve an action" },
  { cmd: "aimesh reject <id> [reason]", desc: "reject with a reason" },
  { cmd: "aimesh health", desc: "server health" },
];

const API = [
  { method: "POST", path: "/auth/github", desc: "start OAuth" },
  { method: "GET", path: "/auth/me", desc: "current user" },
  { method: "POST", path: "/groups", desc: "create group" },
  { method: "GET", path: "/groups", desc: "list groups" },
  { method: "POST", path: "/groups/join", desc: "join by invite code" },
  { method: "POST", path: "/messages", desc: "send a message" },
  { method: "GET", path: "/messages/inbox", desc: "your inbox" },
  { method: "GET", path: "/messages/:groupId", desc: "group messages" },
  { method: "GET", path: "/ws", desc: "WebSocket, first-message auth" },
  { method: "POST", path: "/webhook/:token", desc: "signature-verified webhook" },
  { method: "POST", path: "/approval/submit", desc: "request approval" },
  { method: "POST", path: "/approval/respond", desc: "approve or reject" },
  { method: "POST", path: "/thread/reply", desc: "reply in a thread" },
  { method: "GET", path: "/search?cursor=ISO", desc: "cursor-paginated search" },
  { method: "GET", path: "/health", desc: "block details hidden in prod" },
];

const METHOD_TONE: Record<string, string> = {
  GET: "text-primary bg-primary/10",
  POST: "text-yellow-700 bg-yellow-500/15",
  DELETE: "text-destructive bg-destructive/10",
};

export function CliApi() {
  const [tab, setTab] = useState<"cli" | "api">("cli");
  const rows = tab === "cli" ? CLI : API;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-start">
          <Reveal>
            <p className="text-sm text-muted-foreground mb-3">Two surfaces, one source of truth</p>
            <h2 className="text-[2rem] sm:text-[2.5rem] leading-[1.08] tracking-[-0.03em] font-medium text-foreground">
              Use it from the
              <br />
              <span className="text-muted-foreground">shell or over HTTP.</span>
            </h2>
            <p className="mt-5 text-[15px] text-muted-foreground max-w-[44ch] leading-relaxed">
              The <code className="font-mono text-[13px] text-foreground">aimesh</code> CLI wraps
              the REST API for quick terminal work. The REST surface is the
              contract every integration builds on. Both call the same blocks.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              {/* tabs */}
              <div className="flex border-b border-border">
                <TabButton
                  active={tab === "cli"}
                  onClick={() => setTab("cli")}
                  icon={<Terminal weight="duotone" className="w-4 h-4" aria-hidden="true" />}
                  label="aimesh CLI"
                />
                <TabButton
                  active={tab === "api"}
                  onClick={() => setTab("api")}
                  icon={<Globe weight="duotone" className="w-4 h-4" aria-hidden="true" />}
                  label="REST API"
                />
                <span className="ml-auto self-center pr-4 font-mono text-[10px] text-muted-foreground/60 nums">
                  {rows.length} endpoints
                </span>
              </div>

              {/* list */}
              <ul className="divide-y divide-border max-h-[440px] overflow-y-auto scroll-area-custom">
                {rows.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 px-5 py-2.5 hover:bg-secondary/50 transition-colors"
                  >
                    {"method" in r ? (
                      <span
                        className={`font-mono text-[10px] font-semibold tracking-wide w-14 text-center rounded px-1.5 py-0.5 shrink-0 ${METHOD_TONE[r.method]}`}
                      >
                        {r.method}
                      </span>
                    ) : (
                      <span className="w-14 shrink-0 grid place-items-center">
                        <span className="text-primary">
                          <Terminal weight="duotone" className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      </span>
                    )}
                    <code className="font-mono text-[13px] text-foreground/90 truncate">
                      {r.cmd ?? r.path}
                    </code>
                    <span className="ml-auto text-xs text-muted-foreground truncate pl-3 text-right">
                      {r.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors"
      style={{ color: active ? "var(--foreground)" : "var(--muted-foreground)" }}
    >
      {icon}
      {label}
      {active && <span className="absolute bottom-0 left-3 right-3 h-px bg-primary" />}
    </button>
  );
}
