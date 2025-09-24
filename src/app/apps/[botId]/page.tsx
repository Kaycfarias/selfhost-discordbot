"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import BotStatus from "@/components/bot-metrics";
import { Card } from "@/components/ui/card";
const TerminalOutput = dynamic(() => import("@/components/terminal"), {
  ssr: false,
});

const BotPage = () => {
  const { botId } = useParams();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1>Bot ID: {botId}</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card />
        <BotStatus className="col-span-1" botId={botId as string} />
        <Card />
      </div>
      <Card>
        <TerminalOutput botId={botId as string} />
      </Card>
    </div>
  );
};

export default BotPage;
