import { apiGet } from "@/lib/api/client";
import { buildQuery } from "@/lib/api/query";
import { ChatMessage, ConversationDetail, ConversationSummary } from "@/lib/types/conversation";
import { CursorPage } from "@/lib/types/pagination";

export interface ListConversationsParams {
  phoneNumber?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  cursor?: string;
  limit?: number;
}

export const conversationsApi = {
  list: (agentKey: string, params: ListConversationsParams = {}) =>
    apiGet<CursorPage<ConversationSummary>>(`/agents/${agentKey}/conversations${buildQuery(params)}`),
  detail: (agentKey: string, conversationId: string) =>
    apiGet<ConversationDetail>(`/agents/${agentKey}/conversations/${conversationId}`),
  messages: (agentKey: string, conversationId: string) =>
    apiGet<ChatMessage[]>(`/agents/${agentKey}/conversations/${conversationId}/messages`),
};
