import { apiDelete, apiGet, apiPost } from "@/lib/api/client";
import { ConversationNote } from "@/lib/types/conversation";

export const notesApi = {
  list: (agentKey: string, conversationId: string) =>
    apiGet<ConversationNote[]>(`/agents/${agentKey}/conversations/${conversationId}/notes`),
  create: (agentKey: string, conversationId: string, body: string) =>
    apiPost<ConversationNote>(`/agents/${agentKey}/conversations/${conversationId}/notes`, { body }),
  remove: (agentKey: string, conversationId: string, noteId: number) =>
    apiDelete<void>(`/agents/${agentKey}/conversations/${conversationId}/notes/${noteId}`),
};
