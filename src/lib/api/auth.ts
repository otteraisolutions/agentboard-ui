import { apiGet } from "@/lib/api/client";
import { AdminUser } from "@/lib/types/auth";
import { ApiError } from "@/lib/api/client";

export async function login(email: string, password: string): Promise<AdminUser> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new ApiError(response.status, data.message ?? "No se pudo iniciar sesión");
  }
  return data.user as AdminUser;
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}

export const me = () => apiGet<AdminUser>("/auth/me");
