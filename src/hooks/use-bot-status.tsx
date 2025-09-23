import { buildWebSocketUrl } from "@/utils";
import { useEffect, useState } from "react";

interface BotStats {
  botId: string;
  timestamp: string;
  cpuPercent: string;
  memoryUsage: number;
  memoryLimit: number;
  memoryPercent: string;
  networkRx: number;
  networkTx: number;
  status: string;
  uptime: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function UseConnectToBot(botId: string) {
  const [botStats, setBotStats] = useState<BotStats | null>(null);
  useEffect(() => {
    if (!botId) return;

    setBotStats(null);

    const ws = new WebSocket(
      buildWebSocketUrl(`${apiUrl!}/api/ws-metrics?botId=${botId}`)
    );

    ws.onopen = () => {
      console.log("WebSocket métricas conectado");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setBotStats(data);
      } catch {
        console.error("Erro ao parsear dados do WebSocket");
      }
    };

    ws.onerror = (err) => {
      console.error("Erro no WebSocket:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket métricas desconectado");
    };

    return () => {
      ws.close();
    };
  }, [botId]);
  return botStats;
}
