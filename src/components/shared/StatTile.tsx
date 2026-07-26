import { formatCompactNumber } from "@/lib/utils/format";

export function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl bg-card px-3 py-2 shadow-clay-sm">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-heading text-xl font-semibold" title={value.toLocaleString("es-CO")}>
        {formatCompactNumber(value)}
      </span>
    </div>
  );
}
