"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { notesApi } from "@/lib/api/notes";
import { ConversationNote } from "@/lib/types/conversation";

export function ConversationNotesPanel({
  agentKey,
  conversationId,
  initialNotes,
}: {
  agentKey: string;
  conversationId: string;
  initialNotes: ConversationNote[];
}) {
  const [notes, setNotes] = useState(initialNotes);
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!body.trim()) return;
    setIsSubmitting(true);
    try {
      const note = await notesApi.create(agentKey, conversationId, body.trim());
      setNotes((prev) => [note, ...prev]);
      setBody("");
    } catch {
      toast.error("No se pudo guardar la nota");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">Notas</h2>
      <div className="flex flex-col gap-2">
        <Textarea
          placeholder="Agregar una nota sobre esta conversación..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
        />
        <Button size="sm" className="self-end" onClick={handleSubmit} disabled={isSubmitting || !body.trim()}>
          Guardar nota
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {notes.length === 0 && <p className="text-sm text-muted-foreground">Sin notas todavía.</p>}
        {notes.map((note) => (
          <div key={note.id} className="rounded-xl bg-card p-3 text-sm shadow-clay-sm">
            <p className="whitespace-pre-wrap">{note.body}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {note.authorName} · {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
