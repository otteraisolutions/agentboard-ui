export interface AgentSummary {
  agentKey: string;
  displayName: string;
  description: string | null;
  supportsPendingCases: boolean;
}

export interface Agent {
  id: number;
  agentKey: string;
  displayName: string;
  description: string | null;
  awsRegion: string;
  dynamoUsersTable: string;
  dynamoConversationsTable: string;
  dynamoMessagesTable: string;
  dynamoPendingCasesTable: string | null;
  supportsPendingCases: boolean;
  conversationTtlDays: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertAgentRequest {
  agentKey: string;
  displayName: string;
  description?: string;
  awsRegion: string;
  dynamoUsersTable: string;
  dynamoConversationsTable: string;
  dynamoMessagesTable: string;
  dynamoPendingCasesTable?: string;
  supportsPendingCases: boolean;
  conversationTtlDays: number;
}
