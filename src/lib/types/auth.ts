export type Role = "ADMIN" | "VIEWER";

export interface AdminUser {
  id: number;
  email: string;
  fullName: string;
  role: Role;
  active: boolean;
  superAdmin: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}
