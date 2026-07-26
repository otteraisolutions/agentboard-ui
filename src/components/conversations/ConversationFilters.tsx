"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListConversationsParams } from "@/lib/api/conversations";

const STATUS_OPTIONS = ["active", "completed", "expired", "closed"];

export function ConversationFilters({
  initial,
  onChange,
}: {
  initial: ListConversationsParams;
  onChange: (params: ListConversationsParams) => void;
}) {
  const [phoneNumber, setPhoneNumber] = useState(initial.phoneNumber ?? "");
  const [status, setStatus] = useState(initial.status ?? "");
  const [dateFrom, setDateFrom] = useState(initial.dateFrom ?? "");
  const [dateTo, setDateTo] = useState(initial.dateTo ?? "");

  function apply() {
    onChange({
      phoneNumber: phoneNumber || undefined,
      status: status || undefined,
      dateFrom: dateFrom ? new Date(dateFrom).toISOString() : undefined,
      dateTo: dateTo ? new Date(dateTo).toISOString() : undefined,
    });
  }

  function clear() {
    setPhoneNumber("");
    setStatus("");
    setDateFrom("");
    setDateTo("");
    onChange({});
  }

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-2xl bg-card p-4 shadow-clay">
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
      <div className="flex flex-col gap-1.5">
        <Label>Estado</Label>
        <Select value={status || "all"} onValueChange={(value) => setStatus(!value || value === "all" ? "" : value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dateFrom">Desde</Label>
        <Input id="dateFrom" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-40" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dateTo">Hasta</Label>
        <Input id="dateTo" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-40" />
      </div>
      <div className="flex gap-2">
        <Button onClick={apply}>Filtrar</Button>
        <Button variant="outline" onClick={clear}>
          Limpiar
        </Button>
      </div>
    </div>
  );
}
