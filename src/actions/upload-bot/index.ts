import { BotUploadFormData } from "@/types/form.types";

const uploadBot = async (data: BotUploadFormData) => {
  const formData = new FormData();
  
  // Adicionar campos obrigatórios
  formData.append("botName", data.botName);
  formData.append("botDescription", data.botDescription);
  
  // Adicionar arquivo ZIP
  if (data.botFile) {
    formData.append("BotZip", data.botFile);
  }
  
  // Adicionar variáveis de ambiente se existirem
  if (data.envVariables && data.envVariables.length > 0) {
    formData.append("envVariables", JSON.stringify(data.envVariables));
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/upload-bot`,
    {
      method: "POST",
      body: formData, // Enviando FormData em vez de JSON
      // Não definir Content-Type - o browser define automaticamente com boundary
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to upload bot:", response.statusText, errorText);
    return { ok: false, status: response.status, error: errorText };
  }
  
  const result = await response.json();
  console.log("Bot uploaded successfully:", result);
  return { ok: true, data: result };
};
export default uploadBot;
