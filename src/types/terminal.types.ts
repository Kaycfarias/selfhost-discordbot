// Types relacionados ao terminal
export type ConnectionStatus = "connecting" | "connected" | "error" | "closed";

// Usando any temporariamente para compatibilidade com react-xtermjs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TerminalInstance = any;

export type TerminalOutputProps = {
  botId: string;
};

export interface ConnectionStatusIndicatorProps {
  status: ConnectionStatus;
}
