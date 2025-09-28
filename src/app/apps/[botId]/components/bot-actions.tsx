import { Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import BotStopButton from "./bot-stop-button";
import { BotMetricsType } from "@/types/bot.dto";
import BotRestartButton from "./bot-restart-button";

const BotActions = ({ botMetrics }: { botMetrics: BotMetricsType | null }) => {
  return (
    <div className="flex space-x-1">
      <Button variant={"outline"}>
        <Play color="oklch(72.3% 0.219 149.579)" />{" "}
        <p className="text-green-500">Start</p>
      </Button>
      <BotRestartButton
        botStatus={botMetrics?.status}
        botId={botMetrics?.botId}
      />
      <BotStopButton botStatus={botMetrics?.status} botId={botMetrics?.botId} />
    </div>
  );
};

export default BotActions;
