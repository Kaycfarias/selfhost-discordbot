/**
 * Decodifica dados recebidos via WebSocket (string ou ArrayBuffer)
 */
export function decodeWebSocketData(data: string | ArrayBuffer): string {
  return typeof data === "string"
    ? data
    : new TextDecoder("utf-8").decode(data);
}

/**
 * Constrói a URL do WebSocket baseada no protocolo da página atual
 */
export function buildWebSocketUrl(apiUrl: string): string {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const cleanApiUrl = apiUrl.replace(/^https?:\/\//, "");
  return `${protocol}//${cleanApiUrl}`;
}

/**
 * Verifica se o WebSocket está pronto para enviar dados
 */
export function isWebSocketReady(ws: WebSocket): boolean {
  return ws.readyState === WebSocket.OPEN;
}
