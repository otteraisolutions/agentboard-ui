"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { adminUsersApi } from "@/lib/api/adminUsers";
import { AdminUser } from "@/lib/types/auth";
import { AdminUsersTable } from "@/components/admin/AdminUsersTable";
import { CreateAdminUserDialog } from "@/components/admin/CreateAdminUserDialog";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[] | null>(null);

  useEffect(() => {
    if (user && user.role !== "ADMIN") {
      router.replace("/");
    }
  }, [user, router]);

  useEffect(() => {
    adminUsersApi.list().then(setUsers).catch(() => setUsers([]));
  }, []);

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  function upsert(updated: AdminUser) {
    setUsers((prev) => {
      if (!prev) return [updated];
      const exists = prev.some((u) => u.id === updated.id);
      return exists ? prev.map((u) => (u.id === updated.id ? updated : u)) : [updated, ...prev];
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Usuarios del agentboard</h1>
          <p className="text-sm text-muted-foreground">
            {user.superAdmin
              ? "Como administrador semilla, eres el único que puede crear nuevos usuarios."
              : "Solo el administrador semilla puede crear nuevos usuarios."}
          </p>
        </div>
        {user.superAdmin && <CreateAdminUserDialog onCreated={upsert} />}
      </div>

      {users === null && <p className="text-sm text-muted-foreground">Cargando usuarios...</p>}
      {users && <AdminUsersTable users={users} currentUserId={user.id} onChange={upsert} />}
    </div>
  );
}
