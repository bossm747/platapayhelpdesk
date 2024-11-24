import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ChatMessage from "@/components/chat/ChatMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Send } from "lucide-react";
import { toast } from "sonner";

// Mock data - will be replaced with API calls
const mockChat = {
  id: "chat-1",
  customer: {
    name: "John Doe",
    email: "john@example.com",
  },
  status: "active" as const,
  messages: [
    {
      id: 1,
      content: "Hello, I need help with my payment",
      sender: "John Doe",
      timestamp: "2024-02-21T10:30:00",
      isAgent: false,
    },
    {
      id: 2,
      content: "I'll be happy to help you with that. Could you please provide more details about the issue?",
      sender: "Support Agent",
      timestamp: "2024-02-21T10:31:00",
      isAgent: true,
    },
  ],
};

const ChatRoom = () => {
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent");
    setNewMessage("");
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Chat with {mockChat.customer.name}</h1>
            <p className="text-sm text-zinc-400">{mockChat.customer.email}</p>
          </div>
          <Badge variant="outline" className="text-green-500">
            {mockChat.status}
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="md:col-span-3 h-[calc(100vh-16rem)]">
            <div className="flex flex-col h-full">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {mockChat.messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message.content}
                      sender={message.sender}
                      timestamp={new Date(message.timestamp).toLocaleString()}
                      isAgent={message.isAgent}
                    />
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t border-zinc-800 p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Button variant="outline" size="icon" type="button">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
          </Card>

          <Card className="p-4 space-y-4">
            <h2 className="font-semibold">Quick Responses</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => setNewMessage("Hi! How can I help you today?")}>
                Greeting
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setNewMessage("Could you please provide more details about the issue?")}>
                Request Details
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setNewMessage("Is there anything else I can help you with?")}>
                Follow-up
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ChatRoom;