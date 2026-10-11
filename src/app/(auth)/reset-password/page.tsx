import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Logo } from "@/components/shared/Logo";

export default function ResetPasswordPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 shadow-clay">
          <Logo className="size-10" />
        </div>
        <h1 className="font-heading text-2xl font-bold">Restablecer contraseña</h1>
        <p className="text-sm text-muted-foreground">Elige una contraseña nueva para tu cuenta.</p>
      </div>
      <div className="w-full max-w-sm rounded-3xl bg-card p-8 shadow-clay-lg">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Cargando...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
