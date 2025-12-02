import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentTemplates } from "@/components/personalization/DocumentTemplates";
import { WritingStyleSettings } from "@/components/personalization/WritingStyleSettings";
import { ConnectorsHub } from "@/components/personalization/ConnectorsHub";
import { FileText, Sparkles, Plug } from "lucide-react";

export const Personalization = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Personalization</h1>
        <p className="text-muted-foreground mt-1">
          Customize templates, AI writing style, and connect your external services
        </p>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="writing-style" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Style
          </TabsTrigger>
          <TabsTrigger value="connectors" className="flex items-center gap-2">
            <Plug className="h-4 w-4" />
            Connectors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <DocumentTemplates />
        </TabsContent>

        <TabsContent value="writing-style">
          <WritingStyleSettings />
        </TabsContent>

        <TabsContent value="connectors">
          <ConnectorsHub />
        </TabsContent>
      </Tabs>
    </div>
  );
};
