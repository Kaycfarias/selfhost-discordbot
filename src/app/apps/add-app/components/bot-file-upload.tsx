import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface BotFileUploadProps {
  onFileDrop: (files: File[]) => void;
  disabled?: boolean;
  error?: string;
  selectedFile?: File | null;
}

export const BotFileUpload = ({
  onFileDrop,
  disabled = false,
  error,
  selectedFile,
}: BotFileUploadProps) => {
  const handleError = (error: Error) => {
    console.error("File upload error:", error);
  };

  const maxSizeInBytes = 1024 * 1024 * 1024; // 1GB

  return (
    <FormItem>
      <FormLabel>Bot File</FormLabel>
      <FormControl>
        <div className="space-y-2">
          <Dropzone
            accept={{ "application/zip": [".zip"] }}
            maxFiles={1}
            maxSize={maxSizeInBytes}
            minSize={1}
            onDrop={onFileDrop}
            onError={handleError}
            disabled={disabled}
            src={selectedFile ? [selectedFile] : undefined}
            className={`
              transition-colors
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              ${error ? "border-destructive" : ""}
              ${selectedFile ? "border-green-500 bg-green-50/10" : ""}
            `}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
