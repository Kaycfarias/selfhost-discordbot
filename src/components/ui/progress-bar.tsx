import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0..100
  height?: number; // px
  animated?: boolean;
  className?: string;
  barColor?: string; // Tailwind color class, e.g., "bg-blue-500"
}

const ProgressBar = ({
  value,
  height = 8,
  animated = false,
  className,
  barColor = "bg-indigo-600",
}: ProgressBarProps) => {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "relative w-full bg-slate-200 rounded-lg overflow-hidden",
        className
      )}
      style={{ height }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
      aria-valuetext={`${safeValue} percent`}
    >
      <div
        className={cn(
          "h-full rounded-lg transition-all duration-500 ease-out",
          barColor,
          animated && "progress-bar-animated"
        )}
        style={{
          width: `${safeValue}%`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      />
    </div>
  );
};
export default ProgressBar;
