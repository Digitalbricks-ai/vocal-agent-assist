import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Sparkles, Volume2, Gauge, MessageSquare } from "lucide-react";

const toneOptions = [
  { value: "professional", label: "Professional", description: "Formal and business-appropriate" },
  { value: "friendly", label: "Friendly", description: "Warm and approachable" },
  { value: "casual", label: "Casual", description: "Relaxed and conversational" },
  { value: "formal", label: "Formal", description: "Highly structured and official" },
  { value: "persuasive", label: "Persuasive", description: "Compelling and convincing" },
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "nl", label: "Dutch" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "es", label: "Spanish" },
];

export const WritingStyleSettings = () => {
  const [settings, setSettings] = useState({
    tone: "professional",
    language: "en",
    verbosity: [50],
    creativity: [30],
    customInstructions: "",
    includeEmojis: false,
    useBulletPoints: true,
    autoSummarize: true,
  });

  const handleSave = () => {
    // In a real app, this would save to the backend
    toast({
      title: "Settings saved",
      description: "Your AI writing preferences have been updated",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" />
            Tone of Voice
          </CardTitle>
          <CardDescription>
            Define how the AI should communicate in generated content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {toneOptions.map((tone) => (
              <div
                key={tone.value}
                onClick={() => setSettings({ ...settings, tone: tone.value })}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  settings.tone === tone.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{tone.label}</span>
                  {settings.tone === tone.value && (
                    <Badge variant="default" className="text-xs">Active</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{tone.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-primary" />
            Writing Parameters
          </CardTitle>
          <CardDescription>
            Fine-tune the AI output characteristics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Default Language</Label>
            <Select
              value={settings.language}
              onValueChange={(value) => setSettings({ ...settings, language: value })}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Verbosity Level</Label>
              <span className="text-sm text-muted-foreground">
                {settings.verbosity[0] < 33 ? "Concise" : settings.verbosity[0] < 66 ? "Balanced" : "Detailed"}
              </span>
            </div>
            <Slider
              value={settings.verbosity}
              onValueChange={(value) => setSettings({ ...settings, verbosity: value })}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Controls how detailed and lengthy the AI responses will be
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Creativity Level</Label>
              <span className="text-sm text-muted-foreground">
                {settings.creativity[0] < 33 ? "Conservative" : settings.creativity[0] < 66 ? "Balanced" : "Creative"}
              </span>
            </div>
            <Slider
              value={settings.creativity}
              onValueChange={(value) => setSettings({ ...settings, creativity: value })}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Higher values produce more creative but potentially less predictable outputs
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <Label htmlFor="emojis" className="cursor-pointer">Include Emojis</Label>
              <Switch
                id="emojis"
                checked={settings.includeEmojis}
                onCheckedChange={(checked) => setSettings({ ...settings, includeEmojis: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <Label htmlFor="bullets" className="cursor-pointer">Use Bullet Points</Label>
              <Switch
                id="bullets"
                checked={settings.useBulletPoints}
                onCheckedChange={(checked) => setSettings({ ...settings, useBulletPoints: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <Label htmlFor="summarize" className="cursor-pointer">Auto-Summarize</Label>
              <Switch
                id="summarize"
                checked={settings.autoSummarize}
                onCheckedChange={(checked) => setSettings({ ...settings, autoSummarize: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Custom Instructions
          </CardTitle>
          <CardDescription>
            Add specific instructions that the AI should always follow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={settings.customInstructions}
            onChange={(e) => setSettings({ ...settings, customInstructions: e.target.value })}
            placeholder="e.g., Always mention property square footage in listings. Use metric units. Include neighborhood highlights..."
            className="min-h-[150px]"
          />
          <p className="text-xs text-muted-foreground">
            These instructions will be applied to all AI-generated content
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Sparkles className="h-4 w-4 mr-2" />
          Save Writing Preferences
        </Button>
      </div>
    </div>
  );
};
