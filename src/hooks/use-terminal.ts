import { useEffect, useRef, useState } from "react";
import { useXTerm } from "react-xtermjs";
import { FitAddon } from "@xterm/addon-fit";
import { ConnectionStatus, TerminalInstance } from "@/types/terminal.types";
import { SYSTEM_MESSAGE_INDICATORS } from "@/constants/terminal.constants";
import {
  formatCurrentDateTime,
  processColorCodes,
} from "@/utils/terminal-utils";
import { processTerminalDataWithDateTime } from "@/services/terminal-processor-service";
import {
  buildWebSocketUrl,
  decodeWebSocketData,
  isWebSocketReady,
} from "@/services/websocket-client";

export function useTerminalResize(instance: TerminalInstance | null) {
  useEffect(() => {
    if (!instance) return;

    const fitAddon = new FitAddon();
    instance.loadAddon(fitAddon);

    const handleResize = () => {
      try {
        fitAddon.fit();
      } catch (error) {
        console.warn("Erro ao redimensionar terminal:", error);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [instance]);
}

export function useTerminalWebSocket(
  instance: TerminalInstance | null,
  apiUrl: string | undefined,
  botId: string,
  setConnectionStatus: (status: ConnectionStatus) => void
) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!instance || !apiUrl) {
      if (instance)
        writeSystemMessage(instance, "Erro: Configuração incompleta");
      return;
    }

    connectToBot(
      buildWebSocketUrl(`${apiUrl}/api/ws-terminal?botId=${botId}`),
      instance,
      wsRef,
      setConnectionStatus
    );

    return () => cleanupWebSocket(wsRef);
  }, [instance, apiUrl, botId, setConnectionStatus]);

  return wsRef;
}

export function useTerminal(botId: string) {
  const { instance, ref } = useXTerm();
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useTerminalResize(instance);
  useTerminalWebSocket(instance, apiUrl, botId, setStatus);

  return {
    terminalRef: ref,
    status,
    isConnected: status === "connected",
  };
}

function writeSystemMessage(instance: TerminalInstance, message: string) {
  const timestamp = formatCurrentDateTime();
  const coloredTimestamp = processColorCodes(timestamp, "gray");
  instance.writeln(`${coloredTimestamp} ${message}`);
}

function connectToBot(
  wsUrl: string,
  instance: TerminalInstance,
  wsRef: React.RefObject<WebSocket | null>,
  setConnectionStatus: (status: ConnectionStatus) => void
) {
  writeSystemMessage(
    instance,
    `${SYSTEM_MESSAGE_INDICATORS[0]} Conectando ao bot...`
  );
  setConnectionStatus("connecting");

  try {
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    ws.binaryType = "arraybuffer";

    ws.onopen = () => {
      instance.clear();
      writeSystemMessage(
        instance,
        `${SYSTEM_MESSAGE_INDICATORS[1]} Conectado ao bot!\r\n`
      );
      setConnectionStatus("connected");
    };

    ws.onmessage = (event) => {
      try {
        const rawData = decodeWebSocketData(event.data);
        const processedData = processTerminalDataWithDateTime(rawData);
        instance.write(processedData);
      } catch (error) {
        console.error("Erro ao processar mensagem:", error);
        writeSystemMessage(instance, "\r\n[Erro ao processar dados]");
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      writeSystemMessage(
        instance,
        `\r\n${SYSTEM_MESSAGE_INDICATORS[2]} [Erro de conexão WebSocket]`
      );
      setConnectionStatus("error");
    };

    ws.onclose = (event) => {
      const reason = event.reason || "Conexão encerrada";
      writeSystemMessage(
        instance,
        `\r\n${SYSTEM_MESSAGE_INDICATORS[3]} [${reason}] - Código: ${event.code}`
      );
      setConnectionStatus("closed");
      wsRef.current = null;
    };

    instance.onData((data: string) => {
      if (isWebSocketReady(ws)) ws.send(data);
    });
  } catch (error) {
    console.error("Erro ao criar WebSocket:", error);
    writeSystemMessage(
      instance,
      `\r\n${SYSTEM_MESSAGE_INDICATORS[2]} [Erro ao conectar: ${error}]`
    );
    setConnectionStatus("error");
  }
}

function cleanupWebSocket(wsRef: React.RefObject<WebSocket | null>) {
  if (wsRef.current) {
    wsRef.current.close(1000, "Componente desmontado");
    wsRef.current = null;
  }
}
