"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!token) {
    return (
      <div className="flex w-full max-w-sm flex-col gap-4 text-center">
        <p className="text-sm text-destructive">Este enlace no es válido. Solicita uno nuevo.</p>
        <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
          Solicitar enlace
        </Link>
      </div>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(token as string, newPassword);
      router.push("/login");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo restablecer la contraseña");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="new-password">Contraseña nueva</Label>
        <Input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          minLength={8}
          required
          autoComplete="new-password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirm-password">Confirmar contraseña</Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={8}
          required
          autoComplete="new-password"
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Restablecer contraseña"}
      </Button>
    </form>
  );
}
