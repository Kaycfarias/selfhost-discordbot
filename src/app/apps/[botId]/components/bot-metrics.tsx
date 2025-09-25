import { Skeleton } from "@/components/ui/skeleton";
import { UseConnectToBot } from "@/hooks/use-bot-status";
import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import CpuUsageBar from "./cpu-usage-bar";
import RamUsageBar from "./ram-usage-bar";

interface BotStatsProps {
  botId: string;
  className?: string;
}

const BotStatus = ({ botId, className }: BotStatsProps) => {
  const botStats = UseConnectToBot(botId);
  return (
    <Card className={cn(`rounded-xl`, className)}>
      {botStats ? (
        <>
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
    </Card>
  );
};

export default BotStatus;
