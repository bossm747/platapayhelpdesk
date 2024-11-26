import { Badge } from "@/components/ui/badge";
import { TicketStatus } from "@/types/ticket";

interface TicketStatusBadgeProps {
  status: TicketStatus;
}

const TicketStatusBadge = ({ status }: TicketStatusBadgeProps) => {
  const colors = {
    open: "bg-yellow-500/10 text-yellow-500",
    in_progress: "bg-blue-500/10 text-blue-500",
    resolved: "bg-green-500/10 text-green-500",
    closed: "bg-zinc-500/10 text-zinc-500",
  };

  return (
    <Badge className={colors[status]}>
      {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default TicketStatusBadge;