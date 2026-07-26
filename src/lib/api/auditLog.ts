import { apiGet } from "@/lib/api/client";
import { buildQuery } from "@/lib/api/query";
import { AuditLogEntry, SpringPage } from "@/lib/types/auditLog";

export const auditLogApi = {
  list: (params: { actorId?: number; action?: string; agentKey?: string; page?: number; size?: number } = {}) =>
    apiGet<SpringPage<AuditLogEntry>>(`/admin/audit-log${buildQuery(params)}`),
};
