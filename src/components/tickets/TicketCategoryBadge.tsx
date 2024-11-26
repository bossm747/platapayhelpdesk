import { Badge } from "@/components/ui/badge";
import { TicketCategory } from "@/types/ticket";

interface TicketCategoryBadgeProps {
  category: TicketCategory;
}

const TicketCategoryBadge = ({ category }: TicketCategoryBadgeProps) => {
  const colors = {
    technical: "bg-purple-500/10 text-purple-500",
    billing: "bg-green-500/10 text-green-500",
    account: "bg-blue-500/10 text-blue-500",
    general: "bg-gray-500/10 text-gray-500",
  };

  return (
    <Badge className={colors[category]}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Badge>
  );
};

export default TicketCategoryBadge;