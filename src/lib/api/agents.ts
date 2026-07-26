import { apiGet, apiPatch, apiPost, apiPut } from "@/lib/api/client";
import { Agent, AgentSummary, UpsertAgentRequest } from "@/lib/types/agent";

export const agentsApi = {
  listActive: () => apiGet<AgentSummary[]>("/agents"),
  listAll: () => apiGet<Agent[]>("/admin/agents"),
  create: (payload: UpsertAgentRequest) => apiPost<Agent>("/admin/agents", payload),
  update: (id: number, payload: UpsertAgentRequest) => apiPut<Agent>(`/admin/agents/${id}`, payload),
  setActive: (id: number, active: boolean) => apiPatch<Agent>(`/admin/agents/${id}/active`, { active }),
};
