"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { agentsApi } from "@/lib/api/agents";
import { AgentSummary } from "@/lib/types/agent";

interface AgentContextValue {
  agent: AgentSummary | null;
  isLoading: boolean;
}

const AgentContext = createContext<AgentContextValue>({ agent: null, isLoading: true });

export function AgentProvider({ agentKey, children }: { agentKey: string; children: React.ReactNode }) {
  const [agent, setAgent] = useState<AgentSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    agentsApi
      .listActive()
      .then((agents) => {
        if (!cancelled) {
          setAgent(agents.find((a) => a.agentKey === agentKey) ?? null);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [agentKey]);

  return <AgentContext.Provider value={{ agent, isLoading }}>{children}</AgentContext.Provider>;
}

export function useAgent() {
  return useContext(AgentContext);
}
