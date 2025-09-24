import { Skeleton } from "./ui/skeleton";
import { UseConnectToBot } from "@/hooks/use-bot-status";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Clock, Cpu, Globe, MemoryStick } from "lucide-react";
import ProgressBar from "./ui/progress-bar";
import { cn } from "@/lib/utils";

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
          <div className="w-full px-2 space-y-2">
            <div className="flex flex-row justify-between items-center">
              <Cpu size={32} color="#ff0000" />
              <p className="text-md text-end">CPU: {botStats.cpuPercent}%</p>
            </div>
            <ProgressBar barColor="bg-red-600" value={Number(75)} />
          </div>

          <div className="w-full px-2 space-y-2">
            <div className="flex flex-row justify-between items-center">
              <MemoryStick size={32} color="#00ff00" />
              <p className="text-md text-end">
                {`RAM: ${(botStats.memoryUsage / 1024 / 1024).toFixed(
                  2
                )} MiB / ${(botStats.memoryLimit / 1024 / 1024).toFixed(
                  2
                )} MiB ${botStats.memoryPercent}%`}
              </p>
            </div>
            <ProgressBar
              barColor="bg-green-600"
              value={Number(botStats.memoryPercent)}
            />
          </div>
        </>
      ) : (
        <Skeleton className="h-full w-full" />
      )}
    </Card>
  );
};

export default BotStatus;
