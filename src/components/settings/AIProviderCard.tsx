import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Brain, Check } from "lucide-react";
import { toast } from "sonner";

interface AIProviderCardProps {
  title: string;
  icon: typeof Brain;
  keyPlaceholder: string;
  onSave: (key: string) => Promise<void>;
  envKey?: string;
}

const AIProviderCard = ({ title, icon: Icon, keyPlaceholder, onSave, envKey }: AIProviderCardProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    setIsConfigured(!!envKey);
  }, [envKey]);

  const handleSave = async () => {
    if (!apiKey) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:5000/api/save-env', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: apiKey,
          provider: title.toLowerCase().replace(/\s+/g, '_')
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save API key');
      }

      await onSave(apiKey);
      setApiKey("");
      setIsConfigured(true);
      toast.success(`${title} API key saved successfully!`);
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error(`Failed to save ${title} API key. Please try again.`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {title}
          {isConfigured && (
            <span className="flex items-center gap-1 text-sm text-green-400 ml-auto">
              <Check className="w-4 h-4" />
              Configured
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${title.toLowerCase()}-key`}>API Key</Label>
          <div className="flex gap-2">
            <Input
              id={`${title.toLowerCase()}-key`}
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={isConfigured ? "API key already set" : keyPlaceholder}
            />
            <Button
              onClick={handleSave}
              disabled={!apiKey || isSaving}
            >
              {isConfigured ? "Update Key" : "Save Key"}
            </Button>
          </div>
          <p className="text-xs text-zinc-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Your API key will be stored securely in the .env file
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIProviderCard;