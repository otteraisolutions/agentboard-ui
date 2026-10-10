"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AgentMultiSelect } from "@/components/admin/AgentMultiSelect";
import { adminUsersApi } from "@/lib/api/adminUsers";
import { AdminUser, Role } from "@/lib/types/auth";
import { Agent } from "@/lib/types/agent";

export function AdminUsersTable({
  users,
  agents,
  currentUserId,
  isSuperAdmin,
  onChange,
}: {
  users: AdminUser[];
  agents: Agent[];
  currentUserId: number;
  isSuperAdmin: boolean;
  onChange: (user: AdminUser) => void;
}) {
  const [pendingId, setPendingId] = useState<number | null>(null);

  async function handleAgentsChange(user: AdminUser, agentIds: number[]) {
    setPendingId(user.id);
    try {
      const updated = await adminUsersApi.updateAgents(user.id, agentIds);
      onChange(updated);
    } catch {
      toast.error("No se pudieron actualizar los agentes");
    } finally {
      setPendingId(null);
    }
  }

  async function handleRoleChange(user: AdminUser, role: Role) {
    setPendingId(user.id);
    try {
      const updated = await adminUsersApi.updateRole(user.id, role);
      onChange(updated);
    } catch {
      toast.error("No se pudo actualizar el rol");
    } finally {
      setPendingId(null);
    }
  }

  async function handleToggleActive(user: AdminUser) {
    setPendingId(user.id);
    try {
      const updated = await adminUsersApi.setActive(user.id, !user.active);
      onChange(updated);
    } catch {
      toast.error("No se pudo actualizar el estado");
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-card p-2 shadow-clay">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Agentes</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {user.fullName}
                  {user.superAdmin && <Badge variant="secondary">Semilla</Badge>}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{user.email}</TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onValueChange={(next) => next && handleRoleChange(user, next as Role)}
                  disabled={pendingId === user.id || user.id === currentUserId}
                >
                  <SelectTrigger className="w-32" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VIEWER">Viewer</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {user.superAdmin ? (
                  <Badge variant="secondary">Todos</Badge>
                ) : (
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button variant="outline" size="sm" disabled={pendingId === user.id || !isSuperAdmin}>
                          {user.allowedAgentKeys.length > 0
                            ? `${user.allowedAgentKeys.length} agente(s)`
                            : "Sin agentes"}
                        </Button>
                      }
                    />
                    <PopoverContent>
                      <AgentMultiSelect
                        agents={agents}
                        selectedIds={agents
                          .filter((agent) => user.allowedAgentKeys.includes(agent.agentKey))
                          .map((agent) => agent.id)}
                        onChange={(ids) => handleAgentsChange(user, ids)}
                        disabled={pendingId === user.id}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={user.active ? "default" : "outline"}>{user.active ? "Activo" : "Inactivo"}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pendingId === user.id || user.id === currentUserId}
                  onClick={() => handleToggleActive(user)}
                >
                  {user.active ? "Desactivar" : "Activar"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
