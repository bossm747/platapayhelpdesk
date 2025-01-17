import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, MessageSquare, Shield, Wrench, CreditCard, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface Category {
  icon: typeof BookOpen;
  name: string;
  count: number;
  color: string;
  description: string;
}

const categories: Category[] = [
  { 
    icon: BookOpen, 
    name: "Getting Started", 
    count: 12, 
    color: "text-blue-500",
    description: "Platform basics and quick setup guides"
  },
  { 
    icon: CreditCard, 
    name: "Billing & Payments", 
    count: 8, 
    color: "text-green-500",
    description: "Payment processing and financial features"
  },
  { 
    icon: Users, 
    name: "Account Management", 
    count: 10, 
    color: "text-violet-500",
    description: "User roles and account settings"
  },
  { 
    icon: Shield, 
    name: "Security", 
    count: 6, 
    color: "text-amber-500",
    description: "Security features and best practices"
  },
  { 
    icon: Wrench, 
    name: "Troubleshooting", 
    count: 15, 
    color: "text-red-500",
    description: "Common issues and solutions"
  },
  { 
    icon: MessageSquare, 
    name: "Support", 
    count: 5, 
    color: "text-teal-500",
    description: "Contact support and help resources"
  },
];

const ArticleCategories = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Link
            key={category.name}
            to={`/knowledge-base?category=${category.name.toLowerCase()}`}
            className="block group"
          >
            <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-zinc-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${category.color} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      {category.description}
                    </p>
                    <Badge variant="secondary">
                      {category.count} articles
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default ArticleCategories;