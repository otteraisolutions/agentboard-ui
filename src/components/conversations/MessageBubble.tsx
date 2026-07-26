import { cn } from "@/lib/utils";
import { ChatMessage } from "@/lib/types/conversation";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.sender === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-clay-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-card text-foreground",
        )}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        <p className={cn("mt-1 text-[10px] opacity-70", isUser ? "text-primary-foreground" : "text-muted-foreground")}>
          {formatDate(message.createdAt)}
        </p>
      </div>
    </div>
  );
}

function formatDate(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}
