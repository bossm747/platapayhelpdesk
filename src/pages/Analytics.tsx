import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  // Mock data - in a real app, this would come from an API
  const ticketData = [
    { month: 'Jan', resolved: 65, new: 40 },
    { month: 'Feb', resolved: 75, new: 45 },
    { month: 'Mar', resolved: 85, new: 50 },
    { month: 'Apr', resolved: 70, new: 35 },
    { month: 'May', resolved: 90, new: 55 },
    { month: 'Jun', resolved: 95, new: 48 },
  ];

  const satisfactionData = [
    { month: 'Jan', rating: 4.2 },
    { month: 'Feb', rating: 4.4 },
    { month: 'Mar', rating: 4.6 },
    { month: 'Apr', rating: 4.3 },
    { month: 'May', rating: 4.7 },
    { month: 'Jun', rating: 4.8 },
  ];

  const metrics = [
    { title: "Average Response Time", value: "2.5 hours", change: "-15%" },
    { title: "Resolution Rate", value: "92%", change: "+5%" },
    { title: "Customer Satisfaction", value: "4.6/5", change: "+0.2" },
    { title: "Active Tickets", value: "127", change: "-8%" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Resolution vs New Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ticketData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="resolved" fill="#22c55e" name="Resolved Tickets" />
                    <Bar dataKey="new" fill="#3b82f6" name="New Tickets" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={satisfactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="rating" 
                      stroke="#8b5cf6" 
                      name="Satisfaction Rating"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;