import DotIcon from "@/components/ui/dot-icon";

interface BotStatusProps {
  uptime: string;
  status: string;
}

const BotStatus = ({ status, uptime }: BotStatusProps) => {
  const statusColor =
    {
      running: "oklch(72.3% 0.219 149.579)", // green
      exited: "oklch(55.1% 0.027 264.364)", // gray
      paused: "oklch(79.5% 0.184 86.047)", // yellow
      restarting: "oklch(79.5% 0.184 86.047)", // yellow
    }[status] || "gray"; // Cinza padrão para status desconhecido

  return (
    <div className="flex justify-between w-full p-2 space-y-1 bg-card border rounded-sm">
      <div className="flex items-center gap-2">
        <DotIcon color={statusColor} />{" "}
        <p className={`text-md`} style={{ color: statusColor }}>
          {status}
        </p>
      </div>
      <p className="text-md text-right text-muted-foreground">Uptime: {uptime}</p>
    </div>
  );
};

export default BotStatus;
