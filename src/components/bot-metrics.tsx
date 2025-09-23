import { Skeleton } from "./ui/skeleton";
import { UseConnectToBot } from "@/hooks/use-bot-status";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Clock, Cpu, Globe, MemoryStick } from "lucide-react";

interface BotStatsProps {
  botId: string;
}

const BotStatus = ({ botId }: BotStatsProps) => {
  const botStats = UseConnectToBot(botId);
  return (
    <Card className="rounded-xl">
      {botStats ? (
        <div>
          <Button variant={"ghost"}>
            <Cpu />
            CPU: {botStats.cpuPercent}%
          </Button>

          <Button variant={"ghost"}>
            <MemoryStick />
            Memória: {(botStats.memoryUsage / 1024 / 1024).toFixed(2)} MiB /{" "}
            {(botStats.memoryLimit / 1024 / 1024).toFixed(2)} MiB (
            {botStats.memoryPercent}%)
          </Button>
          <Button variant={"ghost"}>
            <Globe /> Status: {botStats.status}
          </Button>
          <Button variant={"ghost"}>
            <Clock /> Uptime: {botStats.uptime}
          </Button>
          

        </div>
      ) : (
        <Skeleton className="h-full w-full" />
      )}
    </Card>
  );
};

export default BotStatus;
