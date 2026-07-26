export function buildQuery(params: object): string {
  const search = new URLSearchParams();
  const entries = Object.entries(params) as [string, string | number | boolean | undefined | null][];
  for (const [key, value] of entries) {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}
