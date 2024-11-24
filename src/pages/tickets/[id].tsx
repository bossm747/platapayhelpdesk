import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Clock, MessageSquare, Paperclip, User } from "lucide-react";

// Mock data - will be replaced with API call
const mockTicket = {
  id: "TKT-001",
  subject: "Payment Failed",
  description: "Customer reported payment failure during checkout process",
  status: "open",
  priority: "high",
  category: "payment",
  customer: {
    name: "John Doe",
    email: "john@example.com",
  },
  assignee: "Sarah Smith",
  created: "2024-02-20T10:30:00",
  updated: "2024-02-20T14:45:00",
  comments: [
    {
      id: 1,
      author: "Sarah Smith",
      content: "I'm looking into this issue now.",
      timestamp: "2024-02-20T11:00:00",
    },
    {
      id: 2,
      author: "John Doe",
      content: "Thank you, I'm getting an error code E4532.",
      timestamp: "2024-02-20T11:15:00",
    },
  ],
};

const TicketDetails = () => {
  const { id } = useParams();
  const [status, setStatus] = useState(mockTicket.status);
  const [priority, setPriority] = useState(mockTicket.priority);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getStatusColor = (status: string) => {
    const colors = {
      open: "bg-yellow-500/10 text-yellow-500",
      in_progress: "bg-blue-500/10 text-blue-500",
      resolved: "bg-green-500/10 text-green-500",
      closed: "bg-zinc-500/10 text-zinc-500",
    };
    return colors[status as keyof typeof colors] || colors.open;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-zinc-500/10 text-zinc-500",
      medium: "bg-blue-500/10 text-blue-500",
      high: "bg-orange-500/10 text-orange-500",
      urgent: "bg-red-500/10 text-red-500",
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    toast.success(`Ticket status updated to ${newStatus}`);
  };

  const handlePriorityChange = (newPriority: string) => {
    setPriority(newPriority);
    toast.success(`Ticket priority updated to ${newPriority}`);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Comment added successfully");
    setNewComment("");
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Ticket #{id}</h1>
          <div className="flex items-center gap-2">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priority} onValueChange={handlePriorityChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div className="border border-zinc-800 rounded-lg p-4 space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{mockTicket.subject}</h2>
                <p className="text-zinc-400">{mockTicket.description}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge className={getStatusColor(status)}>{status}</Badge>
                <Badge className={getPriorityColor(priority)}>{priority}</Badge>
                <Badge variant="outline">{mockTicket.category}</Badge>
              </div>
            </div>

            <div className="border border-zinc-800 rounded-lg p-4 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Comments
              </h2>
              
              <div className="space-y-4">
                {mockTicket.comments.map((comment) => (
                  <div key={comment.id} className="border-b border-zinc-800 pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-sm text-zinc-400">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-zinc-300">{comment.content}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="icon" type="button">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Add Comment"}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-zinc-800 rounded-lg p-4 space-y-4">
              <h2 className="text-lg font-semibold">Details</h2>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <User className="w-4 h-4" /> Customer
                  </div>
                  <div>{mockTicket.customer.name}</div>
                  <div className="text-sm text-zinc-400">{mockTicket.customer.email}</div>
                </div>

                <div>
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <User className="w-4 h-4" /> Assignee
                  </div>
                  <div>{mockTicket.assignee}</div>
                </div>

                <div>
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Created
                  </div>
                  <div>{new Date(mockTicket.created).toLocaleString()}</div>
                </div>

                <div>
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Last Updated
                  </div>
                  <div>{new Date(mockTicket.updated).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TicketDetails;