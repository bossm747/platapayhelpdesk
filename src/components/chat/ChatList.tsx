import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";
import { Link } from "react-router-dom";

interface Chat {
  id: string;
  customer: string;
  lastMessage: string;
  timestamp: string;
  status: "active" | "waiting" | "closed";
}

interface ChatListProps {
  chats: Chat[];
}

const ChatList = ({ chats }: ChatListProps) => {
  const getStatusColor = (status: Chat["status"]) => {
    const colors = {
      active: "text-green-500",
      waiting: "text-yellow-500",
      closed: "text-zinc-500"
    };
    return colors[status];
  };

  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <Link key={chat.id} to={`/chat/${chat.id}`}>
          <Card className="p-4 hover:bg-zinc-800/50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{chat.customer}</h3>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Circle className={cn("w-2 h-2 fill-current", getStatusColor(chat.status))} />
                    {chat.status}
                  </Badge>
                </div>
                <p className="text-sm text-zinc-400 line-clamp-1">{chat.lastMessage}</p>
              </div>
              <span className="text-xs text-zinc-500">{chat.timestamp}</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ChatList;