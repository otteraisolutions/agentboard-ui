"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/lib/api/auth";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await forgotPassword(email);
    } finally {
      // Se muestra el mismo mensaje exista o no el email, para no revelar cuentas.
      setIsSubmitting(false);
      setSent(true);
    }
  }

  if (sent) {
    return (
      <div className="flex w-full max-w-sm flex-col gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          Si <span className="font-medium text-foreground">{email}</span> tiene una cuenta, te enviamos un correo con
          instrucciones para restablecer tu contraseña.
        </p>
        <Link href="/login" className="text-sm font-medium text-primary hover:underline">
          Volver a iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
      </Button>
      <Link href="/login" className="text-center text-sm text-muted-foreground hover:text-foreground">
        Volver a iniciar sesión
      </Link>
    </form>
  );
}
