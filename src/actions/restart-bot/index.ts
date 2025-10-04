"use server";

interface RestartBotProps {
  botId: string;
}

const restartBot = async ({ botId }: RestartBotProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/restart-bot`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ botId: botId }),
    }
  );
  if (!response.ok) {
    return { ok: false, status: response.status };
  }
  return { ok: true };
};
export default restartBot;