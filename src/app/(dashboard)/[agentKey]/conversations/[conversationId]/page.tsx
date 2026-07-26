"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConversationTimeline } from "@/components/conversations/ConversationTimeline";
import { ConversationNotesPanel } from "@/components/conversations/ConversationNotesPanel";
import { conversationsApi } from "@/lib/api/conversations";
import { ConversationDetail } from "@/lib/types/conversation";

export default function ConversationDetailPage({
  params,
}: {
  params: Promise<{ agentKey: string; conversationId: string }>;
}) {
  const { agentKey, conversationId } = use(params);
  const [detail, setDetail] = useState<ConversationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    conversationsApi
      .detail(agentKey, conversationId)
      .then(setDetail)
      .finally(() => setIsLoading(false));
  }, [agentKey, conversationId]);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground py-8 text-center">Cargando conversación...</p>;
  }

  if (!detail) {
    return <p className="text-sm text-muted-foreground py-8 text-center">Conversación no encontrada.</p>;
  }

  const { conversation, user } = detail;

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/${agentKey}/conversations`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground w-fit">
        <ArrowLeft className="size-4" />
        Volver a conversaciones
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold">{conversation.phoneNumber}</h2>
        <StatusBadge status={conversation.status} />
        {user?.name && <span className="text-sm text-muted-foreground">{user.name}</span>}
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-muted-foreground">Iniciada</dt>
          <dd>{formatDate(conversation.startedAt)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Último mensaje</dt>
          <dd>{formatDate(conversation.lastMessageAt)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Mensajes</dt>
          <dd>{conversation.messageCount ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Tema</dt>
          <dd>{conversation.topic ?? "—"}</dd>
        </div>
      </dl>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ConversationTimeline messages={detail.messages} />
        </div>
        <div>
          <ConversationNotesPanel agentKey={agentKey} conversationId={conversationId} initialNotes={detail.notes} />
        </div>
      </div>
    </div>
  );
}

function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}
