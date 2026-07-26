"use client";

import { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AgentProvider, useAgent } from "@/lib/agent/AgentContext";

function AgentTabs({ agentKey }: { agentKey: string }) {
  const pathname = usePathname();
  const { agent, isLoading } = useAgent();

  // "Casos pendientes" se habilita en la Fase 2 del roadmap (junto con el segundo agente),
  // aunque agent.supportsPendingCases ya viaje en el DTO desde la Fase 1.
  const tabs = [
    { href: `/${agentKey}/conversations`, label: "Conversaciones" },
    { href: `/${agentKey}/users`, label: "Usuarios" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{isLoading ? "Cargando..." : agent?.displayName ?? agentKey}</h1>
        {agent?.description && <p className="text-sm text-muted-foreground">{agent.description}</p>}
      </div>
      <nav className="flex gap-1 border-b">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "px-3 py-2 text-sm border-b-2 -mb-px",
              pathname.startsWith(tab.href)
                ? "border-primary font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function AgentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ agentKey: string }>;
}) {
  const { agentKey } = use(params);

  return (
    <AgentProvider agentKey={agentKey}>
      <div className="flex flex-col gap-6">
        <AgentTabs agentKey={agentKey} />
        {children}
      </div>
    </AgentProvider>
  );
}
