import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { UseConnectToBot } from "@/hooks/use-bot-status";

interface BotStatusProps {
  botId: string;
}

const BotStatus = ({ botId }: BotStatusProps) => {
  const status = UseConnectToBot(botId);
  return (
    <header className="rounded-xl h-10 w-full">
      <Suspense fallback={<Skeleton className="h-full w-full" />}>
        {status ? (
          <div className="flex flex-row justify-between items-center">
            <div className="">
              <div>CPU:</div>
              <div>{status.cpuPercent}%</div>
            </div>
            <div className="">
              <div>Memória:</div>
              <div>
                {(status.memoryUsage / 1024 / 1024).toFixed(2)} MiB /{" "}
                {(status.memoryLimit / 1024 / 1024).toFixed(2)} MiB (
                {status.memoryPercent}%)
              </div>
            </div>
            <div>{status.status}</div>
          </div>
        ) : (
          <Skeleton className="h-full w-full" />
        )}
      </Suspense>
    </header>
  );
};

export default BotStatus;
