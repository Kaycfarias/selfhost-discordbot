"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
const TerminalOutput = dynamic(() => import("@/components/terminal"), {
  ssr: false,
});

const BotPage = () => {
  const { botId } = useParams();

  return (
    <div className="size-full p-4">
      <h1>Bot ID: {botId}</h1>
      <TerminalOutput botId={botId as string} />
    </div>
  );
};

export default BotPage;
