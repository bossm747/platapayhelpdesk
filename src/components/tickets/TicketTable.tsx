import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ticket } from "@/types/ticket";
import TicketPriorityBadge from "./TicketPriorityBadge";
import TicketCategoryBadge from "./TicketCategoryBadge";
import TicketStatusBadge from "./TicketStatusBadge";
import SLAIndicator from "./SLAIndicator";

interface TicketTableProps {
  tickets: Ticket[];
}

const TicketTable = ({ tickets }: TicketTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="border border-zinc-800 rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>SLA</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow
              key={ticket.id}
              className="cursor-pointer hover:bg-zinc-800/50"
              onClick={() => navigate(`/tickets/${ticket.id}`)}
            >
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>{ticket.customer}</TableCell>
              <TableCell>
                <TicketStatusBadge status={ticket.status} />
              </TableCell>
              <TableCell>
                <TicketPriorityBadge priority={ticket.priority} />
              </TableCell>
              <TableCell>
                <TicketCategoryBadge category={ticket.category} />
              </TableCell>
              <TableCell>
                {ticket.sla && (
                  <SLAIndicator
                    deadline={ticket.sla.deadline}
                    breached={ticket.sla.breached}
                  />
                )}
              </TableCell>
              <TableCell>
                {new Date(ticket.updated).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketTable;