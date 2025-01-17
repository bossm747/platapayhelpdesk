import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{id: string; content: string; sender: 'user' | 'agent'}>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
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

      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          chat_id: chatData.id,
          content: message,
          sender_type: 'user'
        });

      if (messageError) throw messageError;

      setMessages(prev => [...prev, { id: Date.now().toString(), content: message, sender: 'user' }]);
      setMessage("");
      
      // Simulate agent response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: "Thanks for reaching out! An agent will be with you shortly.",
          sender: 'agent'
        }]);
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                <h3 className="font-semibold">Live Support</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-muted'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default LiveChatWidget;