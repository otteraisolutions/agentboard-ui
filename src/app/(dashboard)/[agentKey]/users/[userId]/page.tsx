"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UserDetailCard } from "@/components/users/UserDetailCard";
import { ConversationsTable } from "@/components/conversations/ConversationsTable";
import { usersApi } from "@/lib/api/users";
import { UserProfile } from "@/lib/types/conversation";
import { ConversationSummary } from "@/lib/types/conversation";

export default function UserDetailPage({ params }: { params: Promise<{ agentKey: string; userId: string }> }) {
  const { agentKey, userId } = use(params);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([usersApi.getById(agentKey, userId), usersApi.conversations(agentKey, userId)])
      .then(([userProfile, conversationPage]) => {
        setUser(userProfile);
        setConversations(conversationPage.items);
      })
      .finally(() => setIsLoading(false));
  }, [agentKey, userId]);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground py-8 text-center">Cargando usuario...</p>;
  }

  if (!user) {
    return <p className="text-sm text-muted-foreground py-8 text-center">Usuario no encontrado.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Link href={`/${agentKey}/users`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground w-fit">
        <ArrowLeft className="size-4" />
        Volver a la búsqueda
      </Link>

      <UserDetailCard agentKey={agentKey} user={user} />

      <div>
        <h2 className="mb-2 text-sm font-medium">Conversaciones</h2>
        <ConversationsTable agentKey={agentKey} items={conversations} />
      </div>
    </div>
  );
}
