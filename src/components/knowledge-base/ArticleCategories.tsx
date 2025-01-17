import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, MessageSquare, Shield, Wrench, CreditCard, Users, Zap, Database, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    name: "Payments", 
    count: 8, 
    color: "text-green-500",
    description: "Payment processing and transactions"
  },
  { 
    icon: Users, 
    name: "Account", 
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
    icon: Database, 
    name: "Data", 
    count: 7, 
    color: "text-pink-500",
    description: "Data management and reporting"
  },
  { 
    icon: Lock, 
    name: "Privacy", 
    count: 4, 
    color: "text-red-500",
    description: "Privacy policies and compliance"
  },
  { 
    icon: Zap, 
    name: "Integration", 
    count: 9, 
    color: "text-cyan-500",
    description: "API and third-party integrations"
  },
  { 
    icon: Wrench, 
    name: "Troubleshooting", 
    count: 15, 
    color: "text-orange-500",
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
      {categories.map((category, index) => {
        const Icon = category.icon;
        return (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link
              to={`/knowledge-base?category=${category.name.toLowerCase()}`}
              className="block group"
            >
              <Card className="h-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 bg-zinc-900/50">
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
                      <Badge variant="secondary" className="bg-zinc-800">
                        {category.count} articles
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ArticleCategories;