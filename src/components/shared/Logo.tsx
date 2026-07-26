import { cn } from "@/lib/utils";

/**
 * Marca de red/nodos inspirada en el logo de Agentboard: un nodo central con
 * un anillo de nodos satélite conectados, más un par de nodos orbitando afuera.
 * Usa currentColor para heredar el verde de marca según el contexto (texto/ícono).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
      aria-hidden="true"
    >
      {/* Órbita exterior */}
      <path
        d="M50 6 C 74 10, 92 26, 90 50 C 92 74, 74 90, 50 94"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M50 6 C 26 10, 8 26, 10 50 C 8 74, 26 90, 50 94"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="50" cy="6" r="5" fill="currentColor" opacity="0.55" />
      <circle cx="50" cy="94" r="5" fill="currentColor" opacity="0.55" />

      {/* Anillo interno hexagonal */}
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <line x1="50" y1="50" x2="82" y2="50" />
        <line x1="50" y1="50" x2="66" y2="22.3" />
        <line x1="50" y1="50" x2="34" y2="22.3" />
        <line x1="50" y1="50" x2="18" y2="50" />
        <line x1="50" y1="50" x2="34" y2="77.7" />
        <line x1="50" y1="50" x2="66" y2="77.7" />
        <path d="M82 50 L66 22.3 L34 22.3 L18 50 L34 77.7 L66 77.7 Z" opacity="0.5" />
      </g>

      <circle cx="82" cy="50" r="6.5" fill="currentColor" />
      <circle cx="66" cy="22.3" r="6.5" fill="currentColor" />
      <circle cx="34" cy="22.3" r="6.5" fill="currentColor" />
      <circle cx="18" cy="50" r="6.5" fill="currentColor" />
      <circle cx="34" cy="77.7" r="6.5" fill="currentColor" />
      <circle cx="66" cy="77.7" r="6.5" fill="currentColor" />

      <circle cx="50" cy="50" r="15" fill="currentColor" />
    </svg>
  );
}
