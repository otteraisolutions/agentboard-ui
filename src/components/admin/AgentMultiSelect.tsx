"use client";

import { Agent } from "@/lib/types/agent";

export function AgentMultiSelect({
  agents,
  selectedIds,
  onChange,
  disabled,
}: {
  agents: Agent[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  disabled?: boolean;
}) {
  function toggle(id: number) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((agentId) => agentId !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-input p-3">
      {agents.length === 0 && <p className="text-sm text-muted-foreground">No hay agentes configurados.</p>}
      {agents.map((agent) => (
        <label key={agent.id} className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={selectedIds.includes(agent.id)}
            onChange={() => toggle(agent.id)}
            disabled={disabled}
            className="size-4 rounded border-input"
          />
          {agent.displayName}
        </label>
      ))}
    </div>
  );
}
