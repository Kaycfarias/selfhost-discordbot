import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { PlusIcon } from "lucide-react";

interface EnvironmentVariableInputProps {
  envName: string;
  envValue: string;
  onEnvNameChange: (value: string) => void;
  onEnvValueChange: (value: string) => void;
  onAddEnvironmentVariable: () => void;
  disabled?: boolean;
}

export const EnvironmentVariableInput = ({
  envName,
  envValue,
  onEnvNameChange,
  onEnvValueChange,
  onAddEnvironmentVariable,
  disabled = false,
}: EnvironmentVariableInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAddEnvironmentVariable();
    }
  };

  return (
    <div className="space-y-2">
      <FormLabel>Environment Variables</FormLabel>

      <div className="flex w-full max-w-sm items-center gap-2">
        <Input
          placeholder="Name"
          value={envName}
          onChange={(e) => onEnvNameChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Environment variable name"
        />
        <Input
          placeholder="Value"
          value={envValue}
          onChange={(e) => onEnvValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Environment variable value"
        />
        <Button
          type="button"
          variant="outline"
          onClick={onAddEnvironmentVariable}
          disabled={disabled || !envName.trim() || !envValue.trim()}
          aria-label="Add environment variable"
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
