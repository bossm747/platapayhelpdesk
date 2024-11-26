import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Database, Table, Key, Users, Shield, FileJson } from "lucide-react";
import { supabase } from "@/lib/supabase";

type TableName = "api_keys" | "articles";

const SupabasePage = () => {
  const [selectedTable, setSelectedTable] = useState<TableName | "">("");
  const [tableData, setTableData] = useState<any[]>([]);

  const fetchTableData = async (tableName: TableName) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(10);

      if (error) throw error;
      
      setTableData(data || []);
      setSelectedTable(tableName);
      toast.success(`Loaded data from ${tableName}`);
    } catch (error) {
      console.error('Error fetching table data:', error);
      toast.error('Failed to fetch table data');
    }
  };

  const tables = [
    { name: 'api_keys' as const, icon: Key },
    { name: 'articles' as const, icon: FileJson },
  ] as const;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Supabase Admin Panel</h1>
          <Button
            variant="outline"
            onClick={() => window.open(import.meta.env.VITE_SUPABASE_URL, '_blank')}
          >
            Open Supabase Dashboard
          </Button>
        </div>

        <Tabs defaultValue="tables">
          <TabsList>
            <TabsTrigger value="tables">
              <Database className="w-4 h-4 mr-2" />
              Tables
            </TabsTrigger>
            <TabsTrigger value="policies">
              <Shield className="w-4 h-4 mr-2" />
              RLS Policies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tables" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tables.map((table) => (
                <Card
                  key={table.name}
                  className={`bg-zinc-900 border-zinc-800 cursor-pointer transition-colors ${
                    selectedTable === table.name ? 'border-blue-500' : ''
                  }`}
                  onClick={() => fetchTableData(table.name)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <table.icon className="w-5 h-5" />
                      {table.name}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {selectedTable && tableData.length > 0 && (
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle>Data Preview: {selectedTable}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          {Object.keys(tableData[0]).map((column) => (
                            <th key={column} className="text-left p-2 border-b border-zinc-800">
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, i) => (
                          <tr key={i}>
                            {Object.values(row).map((value: any, j) => (
                              <td key={j} className="p-2 border-b border-zinc-800">
                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="policies" className="space-y-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Row Level Security Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">
                  RLS policies are managed directly in the Supabase dashboard. Click the button above to access the dashboard.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SupabasePage;