import ProgressBar from "@/components/ui/progress-bar";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: number;
  unit?: string;
  subtitle?: string;
  className?: string;
}

const MetricCard = ({
  icon: Icon,
  iconColor,
  label,
  value,
  unit = "%",
  subtitle,
  className,
}: MetricCardProps) => {
  return (
    <div
      className={cn(
        "w-full p-3 space-y-2 bg-card border rounded-sm",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">
            {value}
            {unit}
          </div>
          {subtitle && (
            <div className="text-xs text-muted-foreground">{subtitle}</div>
          )}
        </div>
      </div>
      <ProgressBar
        value={Number(value)}
        height={6}
        className="bg-slate-100 dark:bg-slate-800"
      />
    </div>
  );
};

export default MetricCard;
