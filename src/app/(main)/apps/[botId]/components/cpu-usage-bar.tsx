import { Cpu } from "lucide-react";
import MetricCard from "./metric-card";

interface CpuUsageBarProps {
  cpuPercent: number;
}

const CpuUsageBar = ({ cpuPercent }: CpuUsageBarProps) => {
  return (
    <MetricCard
      icon={Cpu}
      iconColor="text-blue-500"
      label="CPU"
      value={cpuPercent}
    />
  );
};

export default CpuUsageBar;
