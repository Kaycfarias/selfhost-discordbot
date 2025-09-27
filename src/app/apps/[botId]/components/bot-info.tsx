import Image from "next/image";

const BotInfo = () => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <Image src="/discord.svg" alt="Bot Image" width={100} height={100} />
      <div>
        <h1>Bot name</h1>
        <p className="text-sm text-muted-foreground">ID: xxxx-xxxx-xxxx-xxxx</p>
        <p className="text-sm text-muted-foreground">
          Description: This is a sample bot description.
        </p>
      </div>
    </div>
  );
};

export default BotInfo;
