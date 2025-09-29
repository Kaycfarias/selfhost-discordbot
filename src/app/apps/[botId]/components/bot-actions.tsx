import BotStopButton from "./bot-stop-button";
import { BotMetricsType } from "@/types/bot.dto";
import BotRestartButton from "./bot-restart-button";
import BotStartButton from "./bot-start-button";

const BotActions = ({ botMetrics }: { botMetrics: BotMetricsType | null }) => {
  return (
    <div className="flex space-x-1">
      <BotStartButton
        botStatus={botMetrics?.status}
        botId={botMetrics?.botId}
      />
      <BotRestartButton
        botStatus={botMetrics?.status}
        botId={botMetrics?.botId}
      />
      <BotStopButton botStatus={botMetrics?.status} botId={botMetrics?.botId} />
    </div>
  );
};

export default BotActions;
