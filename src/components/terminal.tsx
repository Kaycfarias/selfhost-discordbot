"use client";

import { TerminalOutputProps } from "@/types/terminal.types";
import { useTerminal } from "@/hooks/use-terminal";
import { ConnectionStatusIndicator } from "./connection-status-indicator";

export default function TerminalOutput({ botId }: TerminalOutputProps) {
  const { terminalRef, status } = useTerminal(botId);

  return (
    <div className="w-full h-full border rounded-xl overflow-hidden">
      <div ref={terminalRef} className="relative h-full w-full">
        <ConnectionStatusIndicator status={status} />
      </div>
    </div>
  );
}
