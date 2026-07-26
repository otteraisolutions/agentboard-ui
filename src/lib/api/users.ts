import { apiGet } from "@/lib/api/client";
import { buildQuery } from "@/lib/api/query";
import { ConversationSummary, UserProfile } from "@/lib/types/conversation";
import { CursorPage } from "@/lib/types/pagination";

export const usersApi = {
  search: (agentKey: string, params: { phoneNumber?: string; documentType?: string; documentNumber?: string }) =>
    apiGet<UserProfile>(`/agents/${agentKey}/users${buildQuery(params)}`),
  getById: (agentKey: string, userId: string) => apiGet<UserProfile>(`/agents/${agentKey}/users/${userId}`),
  conversations: (agentKey: string, userId: string, cursor?: string, limit = 20) =>
    apiGet<CursorPage<ConversationSummary>>(`/agents/${agentKey}/users/${userId}/conversations${buildQuery({ cursor, limit })}`),
};
