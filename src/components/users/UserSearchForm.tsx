"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface UserSearchParams {
  phoneNumber?: string;
  documentType?: string;
  documentNumber?: string;
}

export function UserSearchForm({ onSearch }: { onSearch: (params: UserSearchParams) => void }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phoneNumber.trim()) {
      onSearch({ phoneNumber: phoneNumber.trim() });
    } else if (documentType.trim() && documentNumber.trim()) {
      onSearch({ documentType: documentType.trim(), documentNumber: documentNumber.trim() });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3 rounded-2xl bg-card p-4 shadow-clay">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phoneNumber">Teléfono</Label>
        <Input
          id="phoneNumber"
          placeholder="+573001112233"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-48"
        />
      </div>
      <span className="pb-2 text-sm text-muted-foreground">o</span>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="documentType">Tipo de documento</Label>
        <Input
          id="documentType"
          placeholder="CC"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          className="w-28"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="documentNumber">Número de documento</Label>
        <Input
          id="documentNumber"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
          className="w-40"
        />
      </div>
      <Button type="submit">Buscar</Button>
    </form>
  );
}
