"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface DateRange {
  dateFrom?: string;
  dateTo?: string;
}

const PRESETS = [
  { value: "all", label: "Todo el tiempo" },
  { value: "today", label: "Hoy" },
  { value: "7d", label: "Últimos 7 días" },
  { value: "30d", label: "Últimos 30 días" },
  { value: "90d", label: "Últimos 90 días" },
];

export function presetToRange(preset: string): DateRange {
  if (preset === "all") return {};
  const days = preset === "today" ? 0 : preset === "7d" ? 7 : preset === "30d" ? 30 : 90;
  const from = new Date();
  from.setDate(from.getDate() - days);
  from.setHours(0, 0, 0, 0);
  return { dateFrom: from.toISOString() };
}

export function DateRangeFilter({ value, onChange }: { value: string; onChange: (preset: string) => void }) {
  return (
    <div className="flex items-end gap-2">
      <div className="flex flex-col gap-1.5">
        <Label>Periodo</Label>
        <Select value={value} onValueChange={(next) => next && onChange(next)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRESETS.map((preset) => (
              <SelectItem key={preset.value} value={preset.value}>
                {preset.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
