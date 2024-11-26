import { Clock, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SLAIndicatorProps {
  deadline: string;
  breached: boolean;
}

const SLAIndicator = ({ deadline, breached }: SLAIndicatorProps) => {
  const timeLeft = formatDistanceToNow(new Date(deadline), { addSuffix: true });
  
  return (
    <div className="flex items-center gap-2">
      {breached ? (
        <AlertTriangle className="w-4 h-4 text-red-500" />
      ) : (
        <Clock className="w-4 h-4 text-yellow-500" />
      )}
      <span className={`text-sm ${breached ? 'text-red-500' : 'text-yellow-500'}`}>
        {breached ? 'SLA Breached' : `SLA ${timeLeft}`}
      </span>
    </div>
  );
};

export default SLAIndicator;