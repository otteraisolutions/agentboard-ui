export type Role = "ADMIN" | "VIEWER";

export interface AdminUser {
  id: number;
  email: string;
  fullName: string;
  role: Role;
  active: boolean;
  superAdmin: boolean;
  allowedAgentKeys: string[];
  createdAt: string;
  lastLoginAt: string | null;
}
