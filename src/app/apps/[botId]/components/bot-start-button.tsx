import startBot from "@/actions/start-bot";

import { Button } from "@/components/ui/button";
import { BotStatuses } from "@/types/bot.dto";
import { Play } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";

interface BotStartButtonProps {
  botStatus: BotStatuses | undefined;
  botId: string | undefined;
}

const BotStartButton = ({ botStatus, botId }: BotStartButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  const handleStart = async () => {
    setIsPending(true);
    const startingBot = new Promise(async (resolve, reject) => {
      if (!botId) return;
      const response = await startBot({ botId });
      if (response.ok) {
        resolve(response);
      } else {
        reject(response);
      }
      setIsPending(false);
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
      disabled={isPending || botStatus === "running"}
      onClick={() => {
        handleStart();
      }}
    >
      <Play color="oklch(72.3% 0.219 149.579)" />{" "}
      <p className="text-green-500">Start</p>
    </Button>
  );
};

export default BotStartButton;
