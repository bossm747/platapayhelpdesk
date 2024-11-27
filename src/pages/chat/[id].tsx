import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useChat } from "@/hooks/useChat";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";

const ChatRoom = () => {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { messages, chat, isLoading } = useChat(id);

  const handleSubmit = async (newMessage: string) => {
    if (!chat) return;
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

    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
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
            <ChatMessages messages={messages} customerName={chat.customer_name} />
            <div className="border-t border-zinc-800 p-4">
              <ChatInput 
                chatId={id!} 
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default ChatRoom;