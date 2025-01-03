import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

export const useChat = (chatId: string | undefined) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!chatId) return;

    const fetchChat = async () => {
      try {
        const { data: chatData, error: chatError } = await supabase
          .from('chats')
          .select('*')
          .eq('id', chatId)
          .single();

        if (chatError) throw chatError;

        setChat(chatData);
      } catch (error) {
        console.error('Error fetching chat details:', error);
        toast.error('Error fetching chat details');
      }
    };

    const fetchMessages = async () => {
      try {
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .eq('chat_id', chatId)
          .order('created_at', { ascending: true });

        if (messagesError) throw messagesError;

        setMessages(messagesData || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Error fetching messages');
      }
    };

    fetchChat();
    fetchMessages();

    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `chat_id=eq.${chatId}`,
      }, payload => {
        setMessages(current => [...current, payload.new as Message]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [chatId]);

  return { messages, chat, isLoading };
};
