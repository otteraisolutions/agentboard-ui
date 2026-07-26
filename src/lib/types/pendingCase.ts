export type PendingCaseStatus = "PENDING" | "IN_PROGRESS" | "SOLVED" | "CANCELLED";

export interface PendingCase {
  caseId: string;
  caseCode: string | null;
  conversationId: string | null;
  userPhone: string | null;
  originalQuestion: string | null;
  status: PendingCaseStatus | string;
  lawyerId: string | null;
  createdAt: string | null;
  resolvedAt: string | null;
}
