import stopBot from "@/actions/stop-bot";
import { Button } from "@/components/ui/button";
import { BotStatuses } from "@/types/bot.dto";
import { Octagon } from "lucide-react";
import { toast } from "sonner";

interface BotStopButtonProps {
  botStatus: BotStatuses | undefined;
  botId: string | undefined;
  pending: {
    value: string | undefined;
    setValue: (val: React.SetStateAction<string | undefined>) => void;
  };
}

const BotStopButton = ({ botStatus, botId, pending }: BotStopButtonProps) => {
  const pendingStates = new Set(["starting", "restarting", "stopping"]);

  const handleStop = async () => {
    pending.setValue("stopping");
    const stoppingBot = new Promise(async (resolve, reject) => {
      if (!botId) return;
      const response = await stopBot({ botId });
      if (response.ok) {
        resolve(response);
        pending.setValue("exited");
      } else {
        reject(response);
        pending.setValue(botStatus);
      }
    });

    toast.promise(stoppingBot, {
      loading: "Stopping bot...",
      success: "Bot stopped successfully!",
      error: (err) => `Error stopping bot: ${err}`,
    });
  };
  return (
    <Button
      variant={"outline"}
      disabled={pendingStates.has(pending.value!) || botStatus !== "running"}
      onClick={() => {
        handleStop();
      }}
    >
      <Octagon
        className={pending.value === "stopping" ? "animate-spin" : ""}
        color="oklch(63.7% 0.237 25.331)"
      />{" "}
      <p className="text-red-500">Stop</p>
    </Button>
  );
};

export default BotStopButton;
