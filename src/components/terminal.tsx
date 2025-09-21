"use client";

import { useEffect, useRef, useState } from "react";
import { useXTerm } from "react-xtermjs";
import { FitAddon } from "@xterm/addon-fit";

type TerminalOutputProps = {
  botId: string;
};

export default function TerminalOutput({ botId }: TerminalOutputProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { instance, ref } = useXTerm();
  const wsRef = useRef<WebSocket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "error" | "closed"
  >("connecting");

  useEffect(() => {
    if (!instance || !apiUrl) {
      instance?.writeln("Erro: Configuração incompleta");
      return;
    }

    const fitAddon = new FitAddon();
    instance.loadAddon(fitAddon);

    const handleResize = () => {
      try {
        fitAddon.fit();
      } catch (error) {
        console.warn("Erro ao redimensionar terminal:", error);
      }
    };

    // Determina protocolo WebSocket baseado no protocolo da página
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${apiUrl?.replace(
      /^https?:\/\//,
      ""
    )}/api/ws-terminal?botId=${botId}`;

    instance.writeln("🔄 Conectando ao bot...");
    setConnectionStatus("connecting");

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;
      ws.binaryType = "arraybuffer";

      ws.onopen = () => {
        instance.clear(); // Limpa terminal ao conectar
        instance.writeln("✅ Conectado ao bot!\r\n");
        setConnectionStatus("connected");
      };

      ws.onmessage = (event) => {
        try {
          let data: string;

          if (typeof event.data === "string") {
            data = event.data;
          } else {
            // Para dados binários, decodifica como UTF-8
            data = new TextDecoder("utf-8").decode(event.data);
          }

          // Normaliza quebras de linha para o xterm
          // Substitui \n por \r\n para quebras corretas
          data = data.replace(/\r?\n/g, "\r\n");

          // Processa caracteres especiais de controle
          data = data.replace(/\r\r\n/g, "\r\n"); // Remove \r duplicados

          instance.write(data);
        } catch (error) {
          console.error("Erro ao processar mensagem:", error);
          instance.writeln("\r\n[Erro ao processar dados]");
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        instance.writeln("\r\n❌ [Erro de conexão WebSocket]");
        setConnectionStatus("error");
      };

      ws.onclose = (event) => {
        const reason = event.reason || "Conexão encerrada";
        instance.writeln(`\r\n🔌 [${reason}] - Código: ${event.code}`);
        setConnectionStatus("closed");

        // Limpa referência
        wsRef.current = null;
      };

      // Envia dados do terminal para WebSocket
      instance.onData((data) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(data);
        }
      });
    } catch (error) {
      console.error("Erro ao criar WebSocket:", error);
      instance.writeln(`\r\n❌ [Erro ao conectar: ${error}]`);
      setConnectionStatus("error");
    }

    // Event listener para redimensionamento
    window.addEventListener("resize", handleResize);
    handleResize(); // Ajusta tamanho inicial
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (wsRef.current) {
        wsRef.current.close(1000, "Componente desmontado");
        wsRef.current = null;
      }
    };
  }, [instance, apiUrl, botId]);

  return (
    <div className="w-full h-full relative">
      <div
        ref={ref}
        className="w-full h-full rounded-xl bg-black/90 p-2 overflow-hidden"
        style={{
          fontFamily: "Fira Code, Courier New, monospace",
          fontSize: "14px",
          lineHeight: "1.2",
        }}
      />
      {connectionStatus !== "connected" && (
        <div className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-background/80 backdrop-blur-sm border">
          Status: {connectionStatus === "connecting" && "🔄 Conectando..."}
          {connectionStatus === "error" && "❌ Erro"}
          {connectionStatus === "closed" && "🔌 Desconectado"}
        </div>
      )}
    </div>
  );
}
