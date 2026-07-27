"use client";

import { useEffect, useState } from "react";
import { metricsApi } from "@/lib/api/metrics";
import { AgentMetrics } from "@/lib/types/metrics";
import { StatTile } from "@/components/shared/StatTile";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";

export function AgentMetricsSummary({ agentKey, dateFrom }: { agentKey: string; dateFrom?: string }) {
  const [metrics, setMetrics] = useState<AgentMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setIsLoading(true);
      metricsApi
        .get(agentKey, { dateFrom })
        .then((data) => {
          if (!cancelled) setMetrics(data);
        })
        .catch(() => {
          if (!cancelled) setMetrics(null);
        })
        .finally(() => {
          if (!cancelled) setIsLoading(false);
        });
    });
    return () => {
      cancelled = true;
    };
  }, [agentKey, dateFrom]);

  if (isLoading) {
    return (
      <div className="flex gap-2">
        <Skeleton className="h-16 w-24 rounded-xl" />
        <Skeleton className="h-16 w-24 rounded-xl" />
      </div>
    );
  }

  if (!metrics) {
    return <p className="text-xs text-muted-foreground">No se pudieron cargar las métricas.</p>;
  }

  const statusEntries = Object.entries(metrics.conversationsByStatus);
  const pendingEntries = metrics.pendingCasesByStatus ? Object.entries(metrics.pendingCasesByStatus) : null;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <StatTile label="Conversaciones" value={metrics.totalConversations} />
        <StatTile label="Mensajes" value={metrics.totalMessages} />
      </div>

      {statusEntries.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {statusEntries.map(([status, count]) => (
            <div key={status} className="flex items-center gap-1">
              <StatusBadge status={status} />
              <span className="text-xs text-muted-foreground">{count}</span>
            </div>
          ))}
        </div>
      )}

      {pendingEntries && pendingEntries.some(([, count]) => count > 0) && (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Casos pendientes</span>
          <div className="flex flex-wrap gap-1.5">
            {pendingEntries.map(([status, count]) => (
              <div key={status} className="flex items-center gap-1">
                <StatusBadge status={status} />
                <span className="text-xs text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
