import Layout from "@/components/layout/Layout";
import ChatList from "@/components/chat/ChatList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock data - will be replaced with API calls
const mockChats = [
  {
    id: "chat-1",
    customer: {
      name: "John Doe",
      email: "john@example.com"
    },
    lastMessage: "Thank you for your help!",
    timestamp: "2 mins ago",
    status: "active" as const,
  },
  {
    id: "chat-2",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com"
    },
    lastMessage: "I'm having issues with my payment",
    timestamp: "15 mins ago",
    status: "waiting" as const,
  },
  {
    id: "chat-3",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com"
    },
    lastMessage: "Issue resolved, thanks!",
    timestamp: "1 hour ago",
    status: "closed" as const,
  },
];

const ChatPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Live Chat Support</h1>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
          <Input placeholder="Search chats..." className="pl-10" />
        </div>

        <ChatList chats={mockChats} />
      </div>
    </Layout>
  );
};

export default ChatPage;