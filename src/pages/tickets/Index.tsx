import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TicketFilters from "@/components/tickets/TicketFilters";
import TicketTable from "@/components/tickets/TicketTable";
import { Ticket, TicketStatus, TicketPriority, TicketCategory } from "@/types/ticket";

// Mock data (move to a separate file in a real application)
const tickets: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Payment Failed",
    description: "Unable to process payment",
    customer: "John Doe",
    status: "open",
    priority: "high",
    category: "billing",
    created: "2024-02-20T10:30:00",
    updated: "2024-02-20T14:45:00",
    sla: {
      deadline: "2024-02-21T10:30:00",
      breached: false,
    },
  },
  {
    id: "TKT-002",
    subject: "Account Access Issues",
    description: "Cannot login to account",
    customer: "Jane Smith",
    status: "in_progress",
    priority: "medium",
    category: "account",
    created: "2024-02-19T15:20:00",
    updated: "2024-02-20T09:15:00",
    assignedTo: "Support Agent",
    sla: {
      deadline: "2024-02-20T15:20:00",
      breached: true,
    },
  },
];

const TicketsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<TicketCategory | "all">("all");

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Support Tickets</h1>
          <Button onClick={() => navigate("/tickets/new")}>
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>

        <TicketFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        <TicketTable tickets={tickets} />
      </div>
    </Layout>
  );
};

export default TicketsPage;