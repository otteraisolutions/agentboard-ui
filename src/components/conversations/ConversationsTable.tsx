import Link from "next/link";
import { MessageSquareText, UserRound } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConversationSummary } from "@/lib/types/conversation";

export function ConversationsTable({ agentKey, items }: { agentKey: string; items: ConversationSummary[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground py-8 text-center">No hay conversaciones para los filtros seleccionados.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-card p-2 shadow-clay">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teléfono</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Tema</TableHead>
            <TableHead>Mensajes</TableHead>
            <TableHead>Iniciada</TableHead>
            <TableHead>Último mensaje</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((conversation) => (
            <TableRow key={conversation.conversationId}>
              <TableCell className="font-medium">{conversation.phoneNumber}</TableCell>
              <TableCell className="text-muted-foreground">{conversation.userName ?? "—"}</TableCell>
              <TableCell>
                <StatusBadge status={conversation.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">{conversation.topic ?? "—"}</TableCell>
              <TableCell>{conversation.messageCount ?? "—"}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(conversation.startedAt)}</TableCell>
              <TableCell className="text-muted-foreground">{formatDate(conversation.lastMessageAt)}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-1.5">
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    aria-label="Ver conversación"
                    title="Ver conversación"
                    nativeButton={false}
                    render={<Link href={`/${agentKey}/conversations/${conversation.conversationId}`} />}
                  >
                    <MessageSquareText className="size-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon-sm"
                    aria-label="Ver perfil del usuario"
                    title="Ver perfil del usuario"
                    disabled={!conversation.userId}
                    nativeButton={!conversation.userId}
                    render={conversation.userId ? <Link href={`/${agentKey}/users/${conversation.userId}`} /> : undefined}
                  >
                    <UserRound className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}
