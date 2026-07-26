export interface AuditLogEntry {
  id: number;
  actorId: number | null;
  actorEmail: string;
  action: string;
  entityType: string | null;
  entityId: string | null;
  agentKey: string | null;
  metadata: Record<string, unknown> | null;
  ipAddress: string | null;
  createdAt: string;
}

export interface SpringPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
