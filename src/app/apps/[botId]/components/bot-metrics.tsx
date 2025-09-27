import { Skeleton } from "@/components/ui/skeleton";
import { UseConnectToBot } from "@/hooks/use-bot-status";

import { cn } from "@/lib/utils";
import CpuUsageBar from "./cpu-usage-bar";
import RamUsageBar from "./ram-usage-bar";
import BotStatus from "./bot-status";

interface BotStatsProps {
  botId: string;
  className?: string;
}

const BotMetrics = ({ botId, className }: BotStatsProps) => {
  const botStats = UseConnectToBot(botId);
  return (
    <div className={cn(`rounded-xl space-y-1`, className)}>
      {botStats ? (
        <>
          <BotStatus status={botStats.status} uptime={botStats.uptime} />
          <CpuUsageBar cpuPercent={Number(botStats.cpuPercent)} />

          <RamUsageBar
            memoryUsage={botStats.memoryUsage}
            memoryLimit={botStats.memoryLimit}
            memoryPercent={Number(botStats.memoryPercent)}
          />
        </>
      ) : (
        <Skeleton className="h-full w-full" />
      )}
    </div>
  );
};

export default BotMetrics;
