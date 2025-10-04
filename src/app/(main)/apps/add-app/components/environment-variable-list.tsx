import { Button } from "@/components/ui/button";
import { Code, X } from "lucide-react";
import { EnvVariable } from "../../../../../types/form.types";

interface EnvironmentVariableListProps {
  envVariables: EnvVariable[];
  onRemove: (index: number) => void;
  disabled?: boolean;
}

export const EnvironmentVariableList = ({
  envVariables,
  onRemove,
  disabled = false,
}: EnvironmentVariableListProps) => {
  if (envVariables.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {envVariables.map((env, index) => (
        <EnvironmentVariableItem
          key={`${env.name}-${index}`}
          env={env}
          onRemove={() => onRemove(index)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

interface EnvironmentVariableItemProps {
  env: EnvVariable;
  onRemove: () => void;
  disabled?: boolean;
}

const EnvironmentVariableItem = ({
  env,
  onRemove,
  disabled = false,
}: EnvironmentVariableItemProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 p-3 border rounded-lg bg-muted/40 transition-colors hover:bg-muted/60">
      <div className="flex flex-row items-center gap-3 min-w-0 flex-1">
        <Code size={16} className="text-muted-foreground flex-shrink-0" />

        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-accent text-xs font-mono whitespace-nowrap">
            {env.name}
          </span>

          <span className="text-muted-foreground">=</span>

          <span
            className="inline-flex items-center px-2 py-1 rounded-full bg-secondary text-xs font-mono truncate max-w-[200px]"
            title={env.value}
          >
            {env.value}
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onRemove}
        disabled={disabled}
        aria-label={`Remove environment variable ${env.name}`}
        className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};
