"use client";

import { TerminalOutputProps } from "@/types/terminal.types";
import { TERMINAL_STYLES } from "@/constants/terminal.constants";
import { useTerminal } from "@/hooks/use-terminal";
import { ConnectionStatusIndicator } from "./connection-status-indicator";

export default function TerminalOutput({ botId }: TerminalOutputProps) {
  // Hook principal que gerencia toda a lógica do terminal
  const { terminalRef, status } = useTerminal(botId);

  return (
    <div className="w-full h-full relative">
      <div
        ref={terminalRef}
        style={TERMINAL_STYLES}
      />
      <ConnectionStatusIndicator status={status} />
    </div>
  );
}
