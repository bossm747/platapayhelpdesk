import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface AutomationRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  isActive: boolean;
}

const Automation = () => {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: "1",
      name: "High Priority Support",
      condition: "priority_urgent",
      action: "assign_senior",
      isActive: true,
    },
    {
      id: "2",
      name: "Weekend Auto-Reply",
      condition: "outside_hours",
      action: "send_reply",
      isActive: false,
    },
  ]);

  const handleToggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
    toast.success("Rule status updated");
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast.success("Rule deleted successfully");
  };

  const handleAddRule = () => {
    const newRule: AutomationRule = {
      id: Date.now().toString(),
      name: "New Rule",
      condition: "default",
      action: "none",
      isActive: false,
    };
    setRules([...rules, newRule]);
    toast.success("New rule added");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Automation Rules</h1>
          <Button onClick={handleAddRule} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Rule
          </Button>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Active Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="p-4 border border-zinc-800 rounded-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{rule.name}</h3>
                    <p className="text-sm text-zinc-400">
                      When {rule.condition}, then {rule.action}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={() => handleToggleRule(rule.id)}
                      />
                      <Label>{rule.isActive ? "Active" : "Inactive"}</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Rule Name</Label>
                    <Input defaultValue={rule.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Condition</Label>
                    <Select defaultValue={rule.condition}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="priority_urgent">Priority is Urgent</SelectItem>
                        <SelectItem value="outside_hours">Outside Business Hours</SelectItem>
                        <SelectItem value="new_customer">New Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Action</Label>
                    <Select defaultValue={rule.action}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assign_senior">Assign to Senior Agent</SelectItem>
                        <SelectItem value="send_reply">Send Auto-Reply</SelectItem>
                        <SelectItem value="escalate">Escalate Ticket</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Automation;