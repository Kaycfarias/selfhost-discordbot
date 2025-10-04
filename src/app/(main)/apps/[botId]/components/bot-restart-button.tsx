import restartBot from "@/actions/restart-bot";
import { Button } from "@/components/ui/button";
import { BotStatuses } from "@/types/bot.dto";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface BotStopButtonProps {
  botStatus: BotStatuses | undefined;
  botId: string | undefined;
  pending: {
    value: string | undefined;
    setValue: (val: React.SetStateAction<string | undefined>) => void;
  };
}

const BotRestartButton = ({
  botStatus,
  botId,
  pending,
}: BotStopButtonProps) => {
  const pendingStates = new Set(["starting", "restarting", "stopping"]);
  const handleRestart = async () => {
    pending.setValue("restarting");
    const restartingBot = new Promise(async (resolve, reject) => {
      if (!botId) return;
      const response = await restartBot({ botId });
      if (response.ok) {
        resolve(response);
        pending.setValue("running");
      } else {
        reject(response);
        pending.setValue(botStatus);
      }
    });
    toast.promise(restartingBot, {
      loading: "Restarting bot...",
      success: "Bot restarted successfully!",
      error: (err) => `Error restarting bot: ${err}`,
    });
  };
  return (
    <Button
      variant={"outline"}
      onClick={() => handleRestart()}
      disabled={pendingStates.has(pending.value!) || botStatus !== "running"}
    >
      <RotateCcw
        className={pending.value === "restarting" ? "animate-spin" : ""}
        color="oklch(62.3% 0.214 259.815)"
      />{" "}
      <p className="text-blue-500">Restart</p>
    </Button>
  );
};

export default BotRestartButton;
