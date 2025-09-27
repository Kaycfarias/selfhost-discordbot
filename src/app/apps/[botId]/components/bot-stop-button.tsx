import stopBot from "@/actions/stop-bot";
import { Button } from "@/components/ui/button";
import { Octagon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BotStopButtonProps {
  botStatus?: string;
  botId?: string;
}

const BotStopButton = ({ botStatus, botId }: BotStopButtonProps) => {
  const [isPending, setIsPending] = useState(botStatus !== "running");
  const handleStop = async () => {
    setIsPending(true);
    const myPromise = new Promise(async (resolve, reject) => {
      if (!botId) return;
      const response = await stopBot({ botId });
      if (response.ok) {
        resolve(response);
      } else {
        reject(response);
      }
    });
    setIsPending(botStatus !== "running");

    toast.promise(myPromise, {
      loading: "Stopping bot...",
      success: "Bot stopped successfully!",
      error: (err) => `Error stopping bot: ${err}`,
    });
  };
  return (
    <Button
      variant={"outline"}
      disabled={isPending || botStatus === "running"}
      onClick={() => {
        handleStop();
      }}
    >
      <Octagon color="oklch(63.7% 0.237 25.331)" />{" "}
      <p className="text-red-500">Stop</p>
    </Button>
  );
};

export default BotStopButton;
