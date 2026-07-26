"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { UserSearchForm, UserSearchParams } from "@/components/users/UserSearchForm";
import { usersApi } from "@/lib/api/users";
import { ApiError } from "@/lib/api/client";

export default function UsersSearchPage({ params }: { params: Promise<{ agentKey: string }> }) {
  const { agentKey } = use(params);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  async function handleSearch(searchParams: UserSearchParams) {
    setError(null);
    setIsSearching(true);
    try {
      const user = await usersApi.search(agentKey, searchParams);
      router.push(`/${agentKey}/users/${user.userId}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo buscar el usuario");
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <UserSearchForm onSearch={handleSearch} />
      {isSearching && <p className="text-sm text-muted-foreground">Buscando...</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
