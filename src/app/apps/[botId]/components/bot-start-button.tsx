import startBot from "@/actions/start-bot";

import { Button } from "@/components/ui/button";
import { BotStatuses } from "@/types/bot.dto";
import { Play } from "lucide-react";

import { toast } from "sonner";

interface BotStartButtonProps {
  botStatus: BotStatuses | undefined;
  botId: string | undefined;
  pending: {
    value: string | undefined;
    setValue: (val: React.SetStateAction<string | undefined>) => void;
  };
}

const BotStartButton = ({ botStatus, botId, pending }: BotStartButtonProps) => {
  const pendingStates = new Set(["starting", "restarting", "stopping"]);

  const handleStart = async () => {
    pending.setValue("starting");
    const startingBot = new Promise(async (resolve, reject) => {
      if (!botId) return;
      const response = await startBot({ botId });
      if (response.ok) {
        resolve(response);
        pending.setValue("running");
      } else {
        reject(response);
        pending.setValue(botStatus);
      }
    });

    toast.promise(startingBot, {
      loading: "Starting bot...",
      success: "Bot started successfully!",
      error: (err) => `Error starting bot: ${err}`,
    });
  };

  return (
    <Button
      variant={"outline"}
      disabled={pendingStates.has(pending.value!) || botStatus === "running"}
      onClick={() => {
        handleStart();
      }}
    >
      <Play
        className={pending.value === "starting" ? "animate-spin" : ""}
        color="oklch(72.3% 0.219 149.579)"
      />{" "}
      <p className="text-green-500">Start</p>
    </Button>
  );
};

export default BotStartButton;
