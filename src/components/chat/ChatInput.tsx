import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ChatInputProps {
  chatId: string;
  isSubmitting: boolean;
  onSubmit: (message: string) => Promise<void>;
}

const ChatInput = ({ chatId, isSubmitting, onSubmit }: ChatInputProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await onSubmit(newMessage);
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message");
    }
  };

  return (
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
  );
};

export default ChatInput;