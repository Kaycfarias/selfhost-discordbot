import { z } from "zod";

export interface EnvVariable {
  name: string;
  value: string;
}

export const botUploadFormSchema = z.object({
  botName: z.string().min(1, "Bot name is required"),
  botDescription: z.string().min(1, "Bot description is required"),
  envVariables: z
    .array(
      z.object({
        name: z.string().min(1, "Environment variable name is required"),
        value: z.string().min(1, "Environment variable value is required"),
      })
    )
    .optional(),
  botFile: z.instanceof(File, { message: "Please upload a bot zip file" }),
});

export type BotUploadFormData = z.infer<typeof botUploadFormSchema>;
