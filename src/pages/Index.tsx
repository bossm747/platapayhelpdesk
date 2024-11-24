import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { Users, DollarSign, ArrowUpRight, LineChart } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value="$45,231.89"
            description="+20.1% from last month"
            icon={DollarSign}
          />
          <StatCard
            title="Active Users"
            value="2,350"
            description="+180 new users"
            icon={Users}
          />
          <StatCard
            title="Conversion Rate"
            value="3.2%"
            description="+2.4% from last week"
            icon={ArrowUpRight}
          />
          <StatCard
            title="Active Sessions"
            value="1,420"
            description="Last 24 hours"
            icon={LineChart}
          />
        </div>
        <RevenueChart />
      </div>
    </Layout>
  );
};

export default Index;