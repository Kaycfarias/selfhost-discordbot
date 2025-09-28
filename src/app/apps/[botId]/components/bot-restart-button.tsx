import restartBot from "@/actions/restart-bot";
import { Button } from "@/components/ui/button";
import { BotStatuses } from "@/types/bot.dto";
import { RotateCcw } from "lucide-react";

interface BotStopButtonProps {
  botStatus: BotStatuses | undefined;
  botId: string | undefined;
}

const BotRestartButton = ({ botStatus, botId }: BotStopButtonProps) => {
  const handleRestart = async () => {
    if (!botId) return;
    const result = await restartBot({ botId });
    if (result.ok) {
      alert("Bot restarted successfully");
    } else {
      alert("Failed to restart bot");
    }
  };
  return (
    <Button variant={"outline"} onClick={handleRestart}>
      <RotateCcw color="oklch(62.3% 0.214 259.815)" />{" "}
      <p className="text-blue-500">Restart</p>
    </Button>
  );
};

export default BotRestartButton;
