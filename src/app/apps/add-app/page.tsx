"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BotUploadForm } from "./components/bot-upload-form";

const AddAppPage = () => {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-semibold">Upload Your Bot</h1>
        <p className="text-muted-foreground">
          Upload your Discord bot and configure its environment
        </p>
      </CardHeader>
      <CardContent>
        <BotUploadForm />
      </CardContent>
    </Card>
  );
};

export default AddAppPage;
