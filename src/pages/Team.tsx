import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const SupportChat = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Support Chat</h1>
        
        <Card className="bg-zinc-900 border-zinc-800 h-[calc(100vh-12rem)]">
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-4">
              {/* Chat messages would go here */}
              <div className="space-y-4">
                <div className="bg-zinc-800 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-zinc-400">Customer</p>
                  <p>Hi, I'm having issues with my payment transaction.</p>
                </div>
                <div className="bg-violet-900/50 rounded-lg p-3 max-w-[80%] ml-auto">
                  <p className="text-sm text-zinc-400">Support Agent</p>
                  <p>Hello! I'd be happy to help. Could you please provide your transaction ID?</p>
                </div>
              </div>
            </ScrollArea>
            
            <CardContent className="border-t border-zinc-800 p-4">
              <div className="flex gap-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button>Send</Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default SupportChat;