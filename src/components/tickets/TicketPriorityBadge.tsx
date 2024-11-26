import { Badge } from "@/components/ui/badge";
import { TicketPriority } from "@/types/ticket";

interface TicketPriorityBadgeProps {
  priority: TicketPriority;
}

const TicketPriorityBadge = ({ priority }: TicketPriorityBadgeProps) => {
  const colors = {
    low: "bg-zinc-500/10 text-zinc-500",
    medium: "bg-blue-500/10 text-blue-500",
    high: "bg-orange-500/10 text-orange-500",
    urgent: "bg-red-500/10 text-red-500",
  };

  return (
    <Badge className={colors[priority]}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
};

export default TicketPriorityBadge;