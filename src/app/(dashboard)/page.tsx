"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { agentsApi } from "@/lib/api/agents";
import { AgentSummary } from "@/lib/types/agent";
import { DateRangeFilter, presetToRange } from "@/components/shared/DateRangeFilter";
import { AgentMetricsSummary } from "@/components/dashboard/AgentMetricsSummary";

export default function DashboardOverviewPage() {
  const [agents, setAgents] = useState<AgentSummary[] | null>(null);
  const [preset, setPreset] = useState("all");
  const { dateFrom } = presetToRange(preset);

  useEffect(() => {
    agentsApi.listActive().then(setAgents).catch(() => setAgents([]));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Resumen</h1>
        <p className="text-sm text-muted-foreground">Selecciona un agente para ver sus conversaciones</p>
      </div>

      <DateRangeFilter value={preset} onChange={setPreset} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents === null && <p className="text-sm text-muted-foreground">Cargando agentes...</p>}
        {agents?.length === 0 && <p className="text-sm text-muted-foreground">No hay agentes configurados todavía.</p>}
        {agents?.map((agent) => (
          <Link key={agent.agentKey} href={`/${agent.agentKey}/conversations`}>
            <Card className="h-full transition-colors hover:bg-accent/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="size-5" />
                  {agent.displayName}
                </CardTitle>
                <CardDescription>{agent.description ?? "Sin descripción"}</CardDescription>
              </CardHeader>
              <CardContent>
                <AgentMetricsSummary agentKey={agent.agentKey} dateFrom={dateFrom} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
