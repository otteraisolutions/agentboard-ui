import { apiGet, apiPatch, apiPost } from "@/lib/api/client";
import { AdminUser, Role } from "@/lib/types/auth";

export const adminUsersApi = {
  list: () => apiGet<AdminUser[]>("/admin/users"),
  create: (payload: { email: string; password: string; fullName: string; role: Role }) =>
    apiPost<AdminUser>("/admin/users", payload),
  updateRole: (id: number, role: Role) => apiPatch<AdminUser>(`/admin/users/${id}/role`, { role }),
  setActive: (id: number, active: boolean) => apiPatch<AdminUser>(`/admin/users/${id}/active`, { active }),
};
