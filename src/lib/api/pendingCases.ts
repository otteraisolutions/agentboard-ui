import { apiGet } from "@/lib/api/client";
import { buildQuery } from "@/lib/api/query";
import { PendingCase } from "@/lib/types/pendingCase";
import { CursorPage } from "@/lib/types/pagination";

export const pendingCasesApi = {
  list: (agentKey: string, status: string, cursor?: string, limit = 20) =>
    apiGet<CursorPage<PendingCase>>(`/agents/${agentKey}/pending-cases${buildQuery({ status, cursor, limit })}`),
  getById: (agentKey: string, caseId: string) =>
    apiGet<PendingCase>(`/agents/${agentKey}/pending-cases/${caseId}`),
};
