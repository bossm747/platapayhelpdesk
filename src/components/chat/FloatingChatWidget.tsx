import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mutex } from 'async-mutex';

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mutex = new Mutex();

  const initializeChat = async () => {
    await mutex.runExclusive(async () => {
      try {
        // Create a new chat session
        const { data: chatData, error: chatError } = await supabase
          .from('chats')
          .insert({
            customer_name: 'Guest User',
            customer_email: 'guest@example.com',
            status: 'active'
          })
          .select()
          .single();

        if (chatError) throw chatError;

        setChatId(chatData.id);

        // Add initial bot message
        const { error: messageError } = await supabase
          .from('messages')
          .insert({
            chat_id: chatData.id,
            content: "Hello! I'm your AI assistant. How can I help you today?",
            sender_type: 'bot'
          });

        if (messageError) throw messageError;

        // Subscribe to new messages
        const subscription = supabase
          .channel(`chat:${chatData.id}`)
          .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `chat_id=eq.${chatData.id}`,
          }, payload => {
            setMessages(current => [...current, payload.new]);
          })
          .subscribe();

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing chat:', error);
        toast.error('Failed to start chat session');
      }
    });
  };

  const handleSubmit = async (message: string) => {
    if (!chatId) return;
    setIsSubmitting(true);

    try {
      // Insert user message
      const { error: userMessageError } = await supabase
        .from('messages')
        .insert({
          chat_id: chatId,
          content: message,
          sender_type: 'user'
        });

      if (userMessageError) throw userMessageError;

      // Get bot response
      const response = await supabase.functions.invoke('chat', {
        body: {
          message,
          chatId,
          customerName: 'Guest User'
        }
      });

      if (response.error) throw new Error(response.error);

      const { response: botResponse, isFallback } = response.data;

      // Insert bot response
      const { error: botMessageError } = await supabase
        .from('messages')
        .insert({
          chat_id: chatId,
          content: botResponse,
          sender_type: 'bot',
          is_fallback: isFallback
        });

      if (botMessageError) throw botMessageError;

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleChat = () => {
    if (!isOpen && !chatId) {
      initializeChat();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4"
          >
            <Card className="w-[350px] h-[500px] flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold">Chat Support</h3>
                <Button variant="ghost" size="icon" onClick={toggleChat}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <ChatMessages 
                messages={messages} 
                customerName="Guest User"
              />
              <div className="border-t p-4">
                <ChatInput
                  chatId={chatId || ''}
                  isSubmitting={isSubmitting}
                  onSubmit={handleSubmit}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button
        onClick={toggleChat}
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default FloatingChatWidget;
