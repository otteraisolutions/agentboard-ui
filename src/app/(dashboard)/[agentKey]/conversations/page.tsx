"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConversationFilters } from "@/components/conversations/ConversationFilters";
import { ConversationsTable } from "@/components/conversations/ConversationsTable";
import { conversationsApi, ListConversationsParams } from "@/lib/api/conversations";
import { ConversationSummary } from "@/lib/types/conversation";

export default function ConversationsPage({ params }: { params: Promise<{ agentKey: string }> }) {
  const { agentKey } = use(params);
  const [filters, setFilters] = useState<ListConversationsParams>({});
  const [items, setItems] = useState<ConversationSummary[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setIsLoading(true);
      conversationsApi
        .list(agentKey, filters)
        .then((page) => {
          if (cancelled) return;
          setItems(page.items);
          setCursor(page.nextCursor);
        })
        .finally(() => {
          if (!cancelled) setIsLoading(false);
        });
    });
    return () => {
      cancelled = true;
    };
  }, [agentKey, filters]);

  async function loadMore() {
    if (!cursor) return;
    const page = await conversationsApi.list(agentKey, { ...filters, cursor });
    setItems((prev) => [...prev, ...page.items]);
    setCursor(page.nextCursor);
  }

  return (
    <div className="flex flex-col gap-4">
      <ConversationFilters initial={filters} onChange={setFilters} />
      {isLoading ? (
        <p className="text-sm text-muted-foreground py-8 text-center">Cargando conversaciones...</p>
      ) : (
        <>
          <ConversationsTable agentKey={agentKey} items={items} />
          {cursor && (
            <div className="flex justify-center">
              <Button variant="outline" onClick={loadMore}>
                Cargar más
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
