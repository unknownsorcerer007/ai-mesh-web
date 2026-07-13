"use client";

const COLS = [
  {
    title: "Product",
    links: ["Features", "Architecture", "How it works", "Code example"],
  },
  {
    title: "Developers",
    links: ["GitHub", "REST API", "WebSocket", "MCP protocol"],
  },
  {
    title: "Resources",
    links: ["Docs", "NATS JetStream", "Status", "Contributing"],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-14">
        <div className="grid gap-10 lg:gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-[34ch]">
            <a
              href="#top"
              className="flex items-center"
              aria-label="AI Mesh home"
            >
              <img src="/logo.svg" alt="AI Mesh" width={124} height={26} className="h-[26px] w-auto" />
            </a>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Real-time communication mesh for AI agents. Open source,
              self-hosted, MCP-native.
            </p>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h3 className="text-xs tracking-[0.08em] uppercase text-muted-foreground/70 mb-4">
                {c.title}
              </h3>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} AI Mesh. MIT licensed. Built with
            Fastify, NATS JetStream, and SQLite.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">
              Security
            </a>
            <a
              href="https://github.com/unknownsorcerer007/ai-mesh"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
