"use client";

import { useState } from "react";
import { KeyRound, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChangePasswordDialog } from "@/components/layout/ChangePasswordDialog";

export function UserMenu() {
  const { user, logout } = useAuth();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="flex max-w-full items-center gap-2 overflow-hidden group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0"
          >
            <User className="size-4 shrink-0" />
            <span className="truncate text-sm group-data-[collapsible=icon]:hidden">{user.fullName}</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="truncate" title={user.email}>
              {user.email}
            </p>
            <div className="text-xs font-normal text-muted-foreground">{user.role}</div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setChangePasswordOpen(true)}>
          <KeyRound className="size-4" />
          Cambiar contraseña
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="size-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <ChangePasswordDialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen} />
    </>
  );
}
