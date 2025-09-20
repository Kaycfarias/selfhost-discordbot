interface BotPageProps {
  params: Promise<{ botId: string }>;
}

const BotPage = async ({ params }: BotPageProps) => {
  const { botId } = await params;
  return <>{botId}</>;
};

export default BotPage;
