import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";

interface Message {
  id: string;
  content: string;
  sender_type: 'bot' | 'agent' | 'user';
  created_at: string;
  is_fallback: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
  customerName: string;
}

const ChatMessages = ({ messages, customerName }: ChatMessagesProps) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            sender={message.sender_type === 'user' ? customerName : 
                   message.sender_type === 'bot' ? 'AI Assistant' : 'Support Agent'}
            timestamp={new Date(message.created_at).toLocaleString()}
            isAgent={message.sender_type !== 'user'}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;