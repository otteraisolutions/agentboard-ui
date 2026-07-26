import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "@/components/conversations/MessageBubble";
import { ChatMessage } from "@/lib/types/conversation";

export function ConversationTimeline({ messages }: { messages: ChatMessage[] }) {
  if (messages.length === 0) {
    return <p className="text-sm text-muted-foreground py-8 text-center">Sin mensajes.</p>;
  }

  return (
    <ScrollArea className="h-[60vh] rounded-2xl bg-card p-4 shadow-clay-inset">
      <div className="flex flex-col gap-3">
        {messages.map((message) => (
          <MessageBubble key={message.messageId} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
}
