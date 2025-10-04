import BotStopButton from "./bot-stop-button";
import { BotMetricsType } from "@/types/bot.dto";
import BotRestartButton from "./bot-restart-button";
import BotStartButton from "./bot-start-button";
import { useState } from "react";

const BotActions = ({ botMetrics }: { botMetrics: BotMetricsType | null }) => {
  const [pendingValue, setPendingValue] = useState<string | undefined>(
    botMetrics?.status
  );

  const pending = {
    value: pendingValue,
    setValue: setPendingValue,
  };

  return (
    <div className="flex space-x-1">
      <BotStartButton
        botStatus={botMetrics?.status}
        botId={botMetrics?.botId}
        pending={pending}
      />
      <BotRestartButton
        botStatus={botMetrics?.status}
        botId={botMetrics?.botId}
        pending={pending}
      />
      <BotStopButton
        botStatus={botMetrics?.status}
        botId={botMetrics?.botId}
        pending={pending}
      />
    </div>
  );
};

export default BotActions;
