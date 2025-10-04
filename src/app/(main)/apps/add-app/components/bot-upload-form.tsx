import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useBotUploadForm } from "@/hooks/use-bot-upload-form";
import { EnvironmentVariableInput } from "./environment-variable-input";
import { EnvironmentVariableList } from "./environment-variable-list";
import { BotFileUpload } from "./bot-file-upload";

export const BotUploadForm = () => {
  const {
    form,
    environmentVariables,
    isSubmitting,
    handleSubmit,
    handleFileDrop,
  } = useBotUploadForm();

  const handleAddEnvironmentVariable = (): void => {
    const success = environmentVariables.addEnvironmentVariable();
    if (success) {
      // Sync with form state
      form.setValue("envVariables", environmentVariables.envs);
    }
  };

  const handleRemoveEnvironmentVariable = (index: number): void => {
    environmentVariables.removeEnvironmentVariable(index);
    // Sync with form state
    form.setValue("envVariables", environmentVariables.envs);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="botName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your bot name"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="botDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Describe what your bot does"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <EnvironmentVariableInput
            envName={environmentVariables.envName}
            envValue={environmentVariables.envValue}
            onEnvNameChange={environmentVariables.setEnvName}
            onEnvValueChange={environmentVariables.setEnvValue}
            onAddEnvironmentVariable={handleAddEnvironmentVariable}
            disabled={isSubmitting}
          />

          <EnvironmentVariableList
            envVariables={environmentVariables.envs}
            onRemove={handleRemoveEnvironmentVariable}
            disabled={isSubmitting}
          />
        </div>

        <FormField
          control={form.control}
          name="botFile"
          render={({ field }) => (
            <BotFileUpload
              onFileDrop={handleFileDrop}
              disabled={isSubmitting}
              selectedFile={field.value || null}
            />
          )}
        />

        <Button
          type="submit"
          variant="default"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Uploading..." : "Upload Bot"}
        </Button>
      </form>
    </Form>
  );
};
