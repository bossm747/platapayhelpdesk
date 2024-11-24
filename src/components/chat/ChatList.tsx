import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ChatListProps {
  chats: {
    id: string;
    customer: {
      name: string;
      email: string;
    };
    status: "active" | "waiting" | "closed";
    lastMessage: string;
    timestamp: string;
  }[];
}

const ChatList = ({ chats }: ChatListProps) => {
  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-500/10 text-green-500",
      waiting: "bg-yellow-500/10 text-yellow-500",
      closed: "bg-zinc-500/10 text-zinc-500",
    };
    return colors[status as keyof typeof colors] || colors.waiting;
  };

  return (
    <div className="space-y-4">
      {chats.map((chat) => (
        <Link
          key={chat.id}
          to={`/chat/${chat.id}`}
          className={cn(
            "block p-4 rounded-lg border border-zinc-800",
            "hover:bg-zinc-800/50 transition-colors"
          )}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{chat.customer.name}</span>
              <Badge className={getStatusColor(chat.status)}>
                {chat.status}
              </Badge>
            </div>
            <span className="text-sm text-zinc-400">{chat.timestamp}</span>
          </div>
          <p className="text-sm text-zinc-400 truncate">{chat.lastMessage}</p>
        </Link>
      ))}
    </div>
  );
};

export default ChatList;