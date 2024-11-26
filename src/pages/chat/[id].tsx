import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  sender_type: 'bot' | 'agent' | 'user';
  created_at: string;
  is_fallback: boolean;
}

interface Chat {
  id: string;
  customer_name: string;
  customer_email: string;
  status: string;
}

const ChatRoom = () => {
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!id) return;

    // Fetch chat details
    const fetchChat = async () => {
      const { data: chatData, error: chatError } = await supabase
        .from('chats')
        .select('*')
        .eq('id', id)
        .single();

      if (chatError) {
        toast.error('Error fetching chat details');
        return;
      }

      setChat(chatData);
    };

    // Fetch messages
    const fetchMessages = async () => {
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', id)
        .order('created_at', { ascending: true });

      if (messagesError) {
        toast.error('Error fetching messages');
        return;
      }

      setMessages(messagesData || []);
    };

    fetchChat();
    fetchMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `chat_id=eq.${id}`,
      }, payload => {
        setMessages(current => [...current, payload.new as Message]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chat) return;

    setIsSubmitting(true);

    try {
      // Insert user message
      const { error: userMessageError } = await supabase
        .from('messages')
        .insert({
          chat_id: id,
          content: newMessage,
          sender_type: 'user'
        });

      if (userMessageError) throw userMessageError;

      // Get bot response
      const response = await supabase.functions.invoke('chat', {
        body: {
          message: newMessage,
          chatId: id,
          customerName: chat.customer_name
        }
      });

      if (response.error) throw new Error(response.error);

      const { response: botResponse, isFallback } = response.data;

      // Insert bot response
      const { error: botMessageError } = await supabase
        .from('messages')
        .insert({
          chat_id: id,
          content: botResponse,
          sender_type: 'bot',
          is_fallback: isFallback
        });

      if (botMessageError) throw botMessageError;

      if (isFallback) {
        toast.info("Your request has been escalated to a human agent");
      }

      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!chat) return null;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Chat with {chat.customer_name}</h1>
            <p className="text-sm text-zinc-400">{chat.customer_email}</p>
          </div>
          <Badge variant="outline" className="text-green-500">
            {chat.status}
          </Badge>
        </div>

        <Card className="h-[calc(100vh-16rem)]">
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message.content}
                    sender={message.sender_type === 'user' ? chat.customer_name : 
                           message.sender_type === 'bot' ? 'AI Assistant' : 'Support Agent'}
                    timestamp={new Date(message.created_at).toLocaleString()}
                    isAgent={message.sender_type !== 'user'}
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
      </div>
    </Layout>
  );
};

export default ChatRoom;