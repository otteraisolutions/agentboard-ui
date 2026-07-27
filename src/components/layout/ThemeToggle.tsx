"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

function subscribe() {
  return () => {};
}

// true en el cliente tras hidratar, false en el snapshot del servidor - evita el
// mismatch de hidratación sin necesitar un useEffect que haga setState directo.
function useHasMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();

  if (!mounted) {
    return <Button variant="ghost" size="icon" aria-label="Cambiar tema" disabled />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
