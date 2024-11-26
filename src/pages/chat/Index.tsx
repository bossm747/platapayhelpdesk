import Layout from "@/components/layout/Layout";
import ChatList from "@/components/chat/ChatList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Chat {
  id: string;
  customer_name: string;
  customer_email: string;
  status: string;
  created_at: string;
}

const ChatPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchChats();

    const subscription = supabase
      .channel('chats')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'chats',
      }, () => {
        fetchChats();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchChats = async () => {
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Error fetching chats');
      return;
    }

    setChats(data || []);
  };

  const startNewChat = async () => {
    if (!customerName.trim() || !customerEmail.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('chats')
        .insert({
          customer_name: customerName,
          customer_email: customerEmail,
        })
        .select()
        .single();

      if (error) throw error;

      // Insert initial bot message
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          chat_id: data.id,
          content: `Hello ${customerName}! I'm your AI assistant. How can I help you today?`,
          sender_type: 'bot'
        });

      if (messageError) throw messageError;

      toast.success('Chat started successfully');
      navigate(`/chat/${data.id}`);
    } catch (error) {
      console.error('Error starting chat:', error);
      toast.error('Failed to start chat');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.customer_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Customer Support</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Start New Chat</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start a New Chat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={startNewChat}
                  disabled={isLoading}
                >
                  {isLoading ? 'Starting...' : 'Start Chat'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
          <Input
            placeholder="Search chats..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ChatList
          chats={filteredChats.map(chat => ({
            id: chat.id,
            customer: {
              name: chat.customer_name,
              email: chat.customer_email
            },
            status: chat.status as 'active' | 'waiting' | 'closed',
            lastMessage: "Click to view conversation",
            timestamp: new Date(chat.created_at).toLocaleString()
          }))}
        />
      </div>
    </Layout>
  );
};

export default ChatPage;