import { ConnectionStatusIndicatorProps } from "@/types/terminal.types";

/**
 * Componente para exibir o status da conexão
 */
export function ConnectionStatusIndicator({
  status,
}: ConnectionStatusIndicatorProps) {
  const statusConfig = {
    connecting: { text: "🔄 Conectando...", show: true },
    error: { text: "❌ Erro", show: true },
    closed: { text: "🔌 Desconectado", show: true },
    connected: { text: "✅ Conectado", show: true },
  };

  const config = statusConfig[status];

  if (!config.show) {
    return null;
  }

  return (
    <div className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-background/80 backdrop-blur-sm border">
      Status: {config.text}
    </div>
  );
}
