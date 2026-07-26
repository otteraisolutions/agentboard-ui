import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Logo } from "@/components/shared/Logo";

export default function LoginPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 shadow-clay">
          <Logo className="size-10" />
        </div>
        <h1 className="font-heading text-2xl font-bold">Agentboard</h1>
        <p className="text-sm text-muted-foreground">Panel de administración de agentes de chat</p>
      </div>
      <div className="w-full max-w-sm rounded-3xl bg-card p-8 shadow-clay-lg">
        <LoginForm />
      </div>
    </div>
  );
}
