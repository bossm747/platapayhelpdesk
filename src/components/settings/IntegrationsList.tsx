import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Link2, Check, X } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  status: "connected" | "disconnected";
  apiKey?: string;
}

const IntegrationsList = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "1",
      name: "Slack",
      description: "Send notifications and updates to Slack channels",
      status: "disconnected"
    },
    {
      id: "2",
      name: "GitHub",
      description: "Link tickets to GitHub issues and PRs",
      status: "connected",
      apiKey: "gh_**********************"
    },
    {
      id: "3",
      name: "Jira",
      description: "Sync tickets with Jira issues",
      status: "disconnected"
    }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(prevIntegrations =>
      prevIntegrations.map(integration =>
        integration.id === id
          ? {
              ...integration,
              status: integration.status === "connected" ? "disconnected" : "connected"
            }
          : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    if (integration) {
      toast.success(`${integration.name} ${integration.status === "connected" ? "disconnected" : "connected"} successfully`);
    }
  };

  const saveApiKey = (id: string, apiKey: string) => {
    setIntegrations(prevIntegrations =>
      prevIntegrations.map(integration =>
        integration.id === id
          ? { ...integration, apiKey }
          : integration
      )
    );
    toast.success("API key saved successfully");
  };

  return (
    <div className="grid gap-6">
      {integrations.map((integration) => (
        <Card key={integration.id} className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xl">{integration.name}</CardTitle>
            <div className="flex items-center gap-2">
              {integration.status === "connected" ? (
                <span className="flex items-center gap-1 text-sm text-green-400">
                  <Check className="w-4 h-4" />
                  Connected
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sm text-zinc-400">
                  <X className="w-4 h-4" />
                  Disconnected
                </span>
              )}
              <Switch
                checked={integration.status === "connected"}
                onCheckedChange={() => toggleIntegration(integration.id)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-zinc-400">{integration.description}</p>
            
            {integration.status === "connected" && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value={integration.apiKey}
                    onChange={(e) => saveApiKey(integration.id, e.target.value)}
                    placeholder="Enter API key"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      toast.info("API key copied to clipboard");
                    }}
                  >
                    <Link2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {integration.status === "disconnected" && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => toggleIntegration(integration.id)}
              >
                Connect {integration.name}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IntegrationsList;