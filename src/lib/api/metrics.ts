import { apiGet } from "@/lib/api/client";
import { buildQuery } from "@/lib/api/query";
import { AgentMetrics } from "@/lib/types/metrics";

export const metricsApi = {
  get: (agentKey: string, params: { dateFrom?: string; dateTo?: string } = {}) =>
    apiGet<AgentMetrics>(`/agents/${agentKey}/metrics${buildQuery(params)}`),
};
