import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  sender: string;
  timestamp: string;
  isAgent?: boolean;
}

const ChatMessage = ({ message, sender, timestamp, isAgent }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex flex-col gap-1 max-w-[80%]",
      isAgent ? "ml-auto" : ""
    )}>
      <div className={cn(
        "rounded-lg p-3",
        isAgent ? "bg-violet-900/50" : "bg-zinc-800"
      )}>
        <p className="text-sm text-zinc-400">{sender}</p>
        <p>{message}</p>
      </div>
      <span className="text-xs text-zinc-500">{timestamp}</span>
    </div>
  );
};

export default ChatMessage;