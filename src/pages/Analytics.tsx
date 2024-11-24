import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tickets = [
  {
    id: "TKT-001",
    customer: "Juan Dela Cruz",
    issue: "Payment Failed",
    status: "Open",
    priority: "High",
    created: "2h ago",
  },
  {
    id: "TKT-002",
    customer: "Maria Santos",
    issue: "Refund Request",
    status: "In Progress",
    priority: "Medium",
    created: "4h ago",
  },
  // Add more ticket data as needed
];

const TicketsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        
        <Card className="bg-zinc-900 border-zinc-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell>{ticket.issue}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell>{ticket.priority}</TableCell>
                  <TableCell>{ticket.created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </Layout>
  );
};

export default TicketsPage;