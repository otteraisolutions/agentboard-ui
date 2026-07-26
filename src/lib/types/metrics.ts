export interface AgentMetrics {
  agentKey: string;
  totalConversations: number;
  conversationsByStatus: Record<string, number>;
  totalMessages: number;
  pendingCasesByStatus: Record<string, number> | null;
}
