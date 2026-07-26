/** Formato compacto para valores de stat tile: 1,284 / 12.9K / 4.2M */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("es-CO", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}
