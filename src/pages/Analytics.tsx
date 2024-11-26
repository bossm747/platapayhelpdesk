import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  // Mock data - in a real app, this would come from an API
  const ticketVolumeData = [
    { date: 'Mon', total: 65, resolved: 40, new: 25 },
    { date: 'Tue', total: 75, resolved: 45, new: 30 },
    { date: 'Wed', total: 85, resolved: 50, new: 35 },
    { date: 'Thu', total: 70, resolved: 35, new: 35 },
    { date: 'Fri', total: 90, resolved: 55, new: 35 },
    { date: 'Sat', total: 60, resolved: 40, new: 20 },
    { date: 'Sun', total: 50, resolved: 30, new: 20 },
  ];

  const responseTimeData = [
    { hour: '9AM', avgTime: 15 },
    { hour: '10AM', avgTime: 12 },
    { hour: '11AM', avgTime: 18 },
    { hour: '12PM', avgTime: 25 },
    { hour: '1PM', avgTime: 20 },
    { hour: '2PM', avgTime: 15 },
    { hour: '3PM', avgTime: 10 },
  ];

  const agentPerformanceData = [
    { name: 'John', tickets: 45, satisfaction: 4.5 },
    { name: 'Sarah', tickets: 52, satisfaction: 4.8 },
    { name: 'Mike', tickets: 38, satisfaction: 4.3 },
    { name: 'Lisa', tickets: 49, satisfaction: 4.6 },
  ];

  const satisfactionTrendData = [
    { week: 'W1', score: 4.2 },
    { week: 'W2', score: 4.4 },
    { week: 'W3', score: 4.6 },
    { week: 'W4', score: 4.3 },
  ];

  const metrics = [
    { title: "Average Response Time", value: "15 min", change: "-15%" },
    { title: "Resolution Rate", value: "92%", change: "+5%" },
    { title: "Customer Satisfaction", value: "4.6/5", change: "+0.2" },
    { title: "Active Tickets", value: "127", change: "-8%" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change} from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="tickets" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tickets">Ticket Volume</TabsTrigger>
            <TabsTrigger value="response">Response Time</TabsTrigger>
            <TabsTrigger value="agents">Agent Performance</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Ticket Volume Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ticketVolumeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" fill="#8b5cf6" name="Total Tickets" />
                      <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
                      <Bar dataKey="new" fill="#3b82f6" name="New" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="response" className="space-y-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Response Time Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="avgTime" 
                        stroke="#8b5cf6" 
                        name="Average Response Time (min)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8b5cf6" />
                      <YAxis yAxisId="right" orientation="right" stroke="#22c55e" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="tickets" fill="#8b5cf6" name="Tickets Resolved" />
                      <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#22c55e" name="Satisfaction Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="satisfaction" className="space-y-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Customer Satisfaction Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={satisfactionTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#22c55e" 
                        name="Satisfaction Score"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;