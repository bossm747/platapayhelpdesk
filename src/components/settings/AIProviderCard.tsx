import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Brain, Check } from "lucide-react";
import { toast } from "sonner";
import { saveApiKey, getApiKey } from "@/lib/supabase";
import { initializeAnthropic } from "@/lib/claude";
import { supabase } from "@/integrations/supabase/client";

interface AIProviderCardProps {
  title: string;
  icon: typeof Brain;
  keyPlaceholder: string;
  onSave: (key: string) => Promise<void>;
}

const AIProviderCard = ({ title, icon: Icon, keyPlaceholder, onSave }: AIProviderCardProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const checkExistingKey = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const key = await getApiKey(title.toLowerCase().replace(/\s+/g, '_'));
        setIsConfigured(!!key);
        
        if (title.toLowerCase() === 'anthropic' && key) {
          await initializeAnthropic();
        }
      } catch (error) {
        console.error('Error checking API key:', error);
        toast.error(`Failed to check ${title} API key configuration`);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkExistingKey();
  }, [title, isAuthenticated]);

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to save API keys");
      return;
    }

    if (!apiKey) {
      toast.error("Please enter an API key");
      return;
    }
    
    setIsSaving(true);
    try {
      await saveApiKey(
        title.toLowerCase().replace(/\s+/g, '_'),
        apiKey
      );

      await onSave(apiKey);
      
      if (title.toLowerCase() === 'anthropic') {
        await initializeAnthropic();
      }
      
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

  if (isLoading) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse flex space-y-4">
            <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isAuthenticated) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-400">Please log in to manage API keys.</p>
        </CardContent>
      </Card>
    );
  }

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
              {isSaving ? "Saving..." : (isConfigured ? "Update Key" : "Save Key")}
            </Button>
          </div>
          <p className="text-xs text-zinc-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Your API key will be stored securely in Supabase
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIProviderCard;