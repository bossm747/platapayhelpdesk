import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const KnowledgeBase = () => {
  const handleSave = () => {
    toast.success("Article saved successfully");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Knowledge Base</h1>
        
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Common Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border border-zinc-800 rounded-lg">
                <h3 className="font-semibold mb-2">Payment Processing Issues</h3>
                <p className="text-sm text-zinc-400">
                  Common solutions for payment processing problems and troubleshooting steps.
                </p>
              </div>
              
              <div className="p-4 border border-zinc-800 rounded-lg">
                <h3 className="font-semibold mb-2">Refund Requests</h3>
                <p className="text-sm text-zinc-400">
                  Guidelines and procedures for handling customer refund requests.
                </p>
              </div>
              
              <div className="p-4 border border-zinc-800 rounded-lg">
                <h3 className="font-semibold mb-2">Account Verification</h3>
                <p className="text-sm text-zinc-400">
                  Steps to verify customer accounts and resolve verification issues.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Article Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Public Access</Label>
                <p className="text-sm text-zinc-400">Make articles publicly accessible</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Translation</Label>
                <p className="text-sm text-zinc-400">Automatically translate articles</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default KnowledgeBase;