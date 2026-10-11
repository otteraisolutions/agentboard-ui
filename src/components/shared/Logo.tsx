import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.jpg"
      alt="Agentboard"
      width={128}
      height={128}
      className={cn("rounded-md object-cover", className)}
    />
  );
}
