import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { BotUploadFormData, botUploadFormSchema } from "@/types/form.types";
import uploadBot from "@/actions/upload-bot";
import { useEnvironmentVariables } from "@/hooks/use-environment-variables";

interface UseBotUploadFormReturn {
  form: ReturnType<typeof useForm<BotUploadFormData>>;
  environmentVariables: ReturnType<typeof useEnvironmentVariables>;
  isSubmitting: boolean;
  handleSubmit: (data: BotUploadFormData) => Promise<void>;
  handleFileDrop: (files: File[]) => void;
}

export const useBotUploadForm = (): UseBotUploadFormReturn => {
  const form = useForm<BotUploadFormData>({
    resolver: zodResolver(botUploadFormSchema),
    defaultValues: {
      botName: "",
      botDescription: "",
      envVariables: [],
    },
  });

  const environmentVariables = useEnvironmentVariables();
  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async (data: BotUploadFormData): Promise<void> => {
    try {
      const res = await uploadBot(data);
      if (res.ok) {
        alert("Bot enviado com sucesso!");
      }
    } catch (err) {
      console.log("Erro desconhecido:", err);
    }
  };

  const handleFileDrop = (files: File[]): void => {
    if (files.length === 0) return;

    const file = files[0];

    // Validação básica do arquivo
    const maxSize = 1024 * 1024 * 1024; // 1GB
    if (file.size > maxSize) {
      alert("Arquivo muito grande. Máximo permitido: 1GB");
      return;
    }

    if (!file.type.includes("zip") && !file.name.endsWith(".zip")) {
      alert("Apenas arquivos ZIP são permitidos");
      return;
    }

    form.setValue("botFile", file);
    form.clearErrors("botFile");
  };

  return {
    form,
    environmentVariables,
    isSubmitting,
    handleSubmit,
    handleFileDrop,
  };
};
