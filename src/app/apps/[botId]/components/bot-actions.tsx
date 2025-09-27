import { Octagon, Play, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

const BotActions = () => {
  return (
    <div className="flex space-x-1">
      <Button variant={"outline"} >
        <Play color="oklch(72.3% 0.219 149.579)" />{" "}
        <p className="text-green-500">Start</p>
      </Button>
      <Button variant={"outline"}>
        <RotateCcw color="oklch(62.3% 0.214 259.815)" />{" "}
        <p className="text-blue-500">Restart</p>
      </Button>
      <Button variant={"outline"}>
        <Octagon color="oklch(63.7% 0.237 25.331)" />{" "}
        <p className="text-red-500">Stop</p>
      </Button>
    </div>
  );
};

export default BotActions;
