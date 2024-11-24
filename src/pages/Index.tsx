import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { Ticket, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Open Tickets"
            value="42"
            description="12 high priority"
            icon={Ticket}
          />
          <StatCard
            title="Average Response Time"
            value="2.5h"
            description="Last 24 hours"
            icon={Clock}
          />
          <StatCard
            title="Resolved Today"
            value="28"
            description="+8 from yesterday"
            icon={CheckCircle2}
          />
          <StatCard
            title="Critical Issues"
            value="3"
            description="Needs attention"
            icon={AlertCircle}
          />
        </div>
        <RevenueChart />
      </div>
    </Layout>
  );
};

export default Index;