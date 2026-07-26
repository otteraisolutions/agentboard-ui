import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "@/lib/types/conversation";

export function UserDetailCard({ agentKey, user, linkToDetail }: { agentKey: string; user: UserProfile; linkToDetail?: boolean }) {
  const content = (
    <Card className="h-full transition-colors hover:bg-accent/50">
      <CardHeader>
        <CardTitle>{user.name ?? user.phoneNumber ?? user.userId}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
        <Field label="Teléfono" value={user.phoneNumber} />
        <Field label="Documento" value={user.documentType && user.documentNumber ? `${user.documentType} ${user.documentNumber}` : null} />
        <Field label="Email" value={user.email} />
        <Field label="Etapa del flujo" value={user.flowStep} />
        <Field label="Identificado" value={boolLabel(user.isIdentified)} />
        <Field label="Registrado" value={boolLabel(user.isRegistered)} />
        <Field label="Habeas data" value={boolLabel(user.habeasDataAccepted)} />
      </CardContent>
    </Card>
  );

  if (!linkToDetail) return content;

  return <Link href={`/${agentKey}/users/${user.userId}`}>{content}</Link>;
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p>{value ?? "—"}</p>
    </div>
  );
}

function boolLabel(value: boolean | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  return value ? "Sí" : "No";
}
