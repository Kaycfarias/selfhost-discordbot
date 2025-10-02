import { useState } from "react";
import { EnvVariable } from "@/types/form.types";

interface UseEnvironmentVariablesReturn {
  envs: EnvVariable[];
  envName: string;
  envValue: string;
  setEnvName: (value: string) => void;
  setEnvValue: (value: string) => void;
  addEnvironmentVariable: () => boolean;
  removeEnvironmentVariable: (index: number) => void;
  clearEnvironmentInputs: () => void;
  resetAllEnvironmentVariables: () => void;
}

export const useEnvironmentVariables = (): UseEnvironmentVariablesReturn => {
  const [envs, setEnvs] = useState<EnvVariable[]>([]);
  const [envName, setEnvName] = useState("");
  const [envValue, setEnvValue] = useState("");

  const addEnvironmentVariable = (): boolean => {
    if (envName.trim() === "" || envValue.trim() === "") {
      return false;
    }

    const newEnv: EnvVariable = {
      name: envName.trim(),
      value: envValue.trim(),
    };

    setEnvs((prev) => [...prev, newEnv]);
    clearEnvironmentInputs();
    return true;
  };

  const removeEnvironmentVariable = (index: number): void => {
    setEnvs((prev) => prev.filter((_, i) => i !== index));
  };

  const clearEnvironmentInputs = (): void => {
    setEnvName("");
    setEnvValue("");
  };

  const resetAllEnvironmentVariables = (): void => {
    setEnvs([]);
    clearEnvironmentInputs();
  };

  return {
    envs,
    envName,
    envValue,
    setEnvName,
    setEnvValue,
    addEnvironmentVariable,
    removeEnvironmentVariable,
    clearEnvironmentInputs,
    resetAllEnvironmentVariables,
  };
};
