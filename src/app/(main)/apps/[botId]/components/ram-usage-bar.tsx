import { MemoryStick } from "lucide-react";
import MetricCard from "./metric-card";

interface RamUsageBarProps {
  memoryUsage: number;
  memoryLimit: number;
  memoryPercent: number;
}

const RamUsageBar = ({
  memoryUsage,
  memoryLimit,
  memoryPercent,
}: RamUsageBarProps) => {
  const subtitle = `${(memoryUsage / 1024 / 1024).toFixed(0)} MB / ${(
    memoryLimit /
    1024 /
    1024
  ).toFixed(0)} MB`;

  return (
    <MetricCard
      icon={MemoryStick}
      iconColor="text-purple-500"
      label="Memória"
      value={memoryPercent}
      subtitle={subtitle}
    />
  );
};

export default RamUsageBar;
