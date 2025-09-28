import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import CpuUsageBar from "./cpu-usage-bar";
import RamUsageBar from "./ram-usage-bar";
import BotStatus from "./bot-status";
import { BotMetricsType } from "@/types/bot.dto";

interface BotStatsProps {
  botMetrics: BotMetricsType | null;
  className?: string;
}

const BotMetrics = ({ botMetrics, className }: BotStatsProps) => {
  return (
    <div className={cn(`rounded-xl space-y-1`, className)}>
      {botMetrics ? (
        <>
          <BotStatus
            status={botMetrics.status}
            uptime={botMetrics.uptime}
          />
          <CpuUsageBar cpuPercent={Number(botMetrics.cpuPercent)} />

          <RamUsageBar
            memoryUsage={botMetrics.memoryUsage}
            memoryLimit={botMetrics.memoryLimit}
            memoryPercent={Number(botMetrics.memoryPercent)}
          />
        </>
      ) : (
        <Skeleton className="h-full w-full" />
      )}
    </div>
  );
};

export default BotMetrics;
