"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import BotStatus from "./components/bot-metrics";
import BotActions from "./components/bot-actions";
import BotInfo from "./components/bot-info";
const TerminalOutput = dynamic(() => import("@/components/terminal"), {
  ssr: false,
});

const BotPage = () => {
  const { botId } = useParams();

  return (
    <div className="container mx-auto flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <div className="flex flex-col justify-between">
          <BotInfo />
          <BotActions />
        </div>
        <BotStatus className="col-span-1" botId={botId as string} />
      </div>
      <TerminalOutput botId={botId as string} />
    </div>
  );
};

export default BotPage;
