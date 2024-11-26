import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link2, Brain, Sparkles, Bot, Cpu, Code } from "lucide-react";
import AIProviderCard from "@/components/settings/AIProviderCard";
import IntegrationsList from "@/components/settings/IntegrationsList";

const Integration = () => {
  const saveEnvKey = async (key: string, provider: string) => {
    const response = await fetch('/api/save-env', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        key,
        provider: provider.toLowerCase().replace(/\s+/g, '_')
      }),
    });

    if (!response.ok) throw new Error('Failed to save API key');
  };

  const aiProviders = [
    {
      title: "OpenAI",
      icon: Brain,
      placeholder: "Enter your OpenAI API key",
      onSave: (key: string) => saveEnvKey(key, "OPENAI")
    },
    {
      title: "Anthropic",
      icon: Sparkles,
      placeholder: "Enter your Anthropic API key",
      onSave: (key: string) => saveEnvKey(key, "ANTHROPIC")
    },
    {
      title: "Google Gemini",
      icon: Bot,
      placeholder: "Enter your Gemini API key",
      onSave: (key: string) => saveEnvKey(key, "GEMINI")
    },
    {
      title: "DeepSeek",
      icon: Cpu,
      placeholder: "Enter your DeepSeek API key",
      onSave: (key: string) => saveEnvKey(key, "DEEPSEEK")
    },
    {
      title: "Mistral",
      icon: Code,
      placeholder: "Enter your Mistral API key",
      onSave: (key: string) => saveEnvKey(key, "MISTRAL")
    },
    {
      title: "Custom OpenAI Compatible",
      icon: Brain,
      placeholder: "Enter your API key",
      onSave: (key: string) => saveEnvKey(key, "CUSTOM_OPENAI")
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Integrations</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            Add New Integration
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {aiProviders.map((provider) => (
            <AIProviderCard
              key={provider.title}
              title={provider.title}
              icon={provider.icon}
              keyPlaceholder={provider.placeholder}
              onSave={provider.onSave}
            />
          ))}
        </div>

        <IntegrationsList />
      </div>
    </Layout>
  );
};

export default Integration;