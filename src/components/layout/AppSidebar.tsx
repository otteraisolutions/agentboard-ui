"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, LayoutDashboard, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { agentsApi } from "@/lib/api/agents";
import { AgentSummary } from "@/lib/types/agent";
import { UserMenu } from "@/components/layout/UserMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Logo } from "@/components/shared/Logo";
import { useAuth } from "@/lib/auth/AuthContext";

export function AppSidebar() {
  const [agents, setAgents] = useState<AgentSummary[]>([]);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    agentsApi.listActive().then(setAgents).catch(() => setAgents([]));
  }, []);

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2 overflow-hidden px-2 py-1.5 font-heading text-base font-bold group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 shadow-clay-sm">
            <Logo className="size-5" />
          </div>
          <span className="truncate group-data-[collapsible=icon]:hidden">Agentboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/"}
                  render={
                    <Link href="/">
                      <LayoutDashboard />
                      <span>Resumen</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Agentes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {agents.map((agent) => (
                <SidebarMenuItem key={agent.agentKey}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(`/${agent.agentKey}`)}
                    render={
                      <Link href={`/${agent.agentKey}/conversations`}>
                        <Bot />
                        <span>{agent.displayName}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user?.role === "ADMIN" && (
          <SidebarGroup>
            <SidebarGroupLabel>Administración</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={pathname === "/admin/users"}
                    render={
                      <Link href="/admin/users">
                        <Users />
                        <span>Usuarios</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:flex-col">
          <UserMenu />
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
