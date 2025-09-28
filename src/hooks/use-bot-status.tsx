import { BotMetricsType } from "@/types/bot.dto";
import { buildWebSocketUrl } from "@/utils";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function UseConnectToBot(botId: string) {
  const [botMetrics, setBotMetrics] = useState<BotMetricsType | null>(null);
  useEffect(() => {
    if (!botId) return;

    setBotMetrics(null);

    const ws = new WebSocket(
      buildWebSocketUrl(`${apiUrl!}/api/ws-metrics?botId=${botId}`)
    );

    ws.onopen = () => {
      console.log("WebSocket métricas conectado");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setBotMetrics(data);
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
  return botMetrics;
}
