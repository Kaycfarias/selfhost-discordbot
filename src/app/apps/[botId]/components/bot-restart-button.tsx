import restartBot from "@/actions/restart-bot";
import { Button } from "@/components/ui/button";
import { BotStatuses } from "@/types/bot.dto";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BotStopButtonProps {
  botStatus: BotStatuses | undefined;
  botId: string | undefined;
}

const BotRestartButton = ({ botStatus, botId }: BotStopButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleRestart = async () => {
    setIsPending(true);
    const restartingBot = new Promise(async (resolve, reject) => {
      if (!botId) return;
      const response = await restartBot({ botId });
      if (response.ok) {
        resolve(response);
      } else {
        reject(response);
      }
      setIsPending(false);
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
      disabled={isPending || botStatus !== "running"}
    >
      <RotateCcw color="oklch(62.3% 0.214 259.815)" />{" "}
      <p className="text-blue-500">Restart</p>
    </Button>
  );
};

export default BotRestartButton;
