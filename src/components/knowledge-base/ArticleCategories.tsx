import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Code, CreditCard, HelpCircle, Users } from "lucide-react";

interface Category {
  icon: typeof Book;
  name: string;
  count: number;
  color: string;
}

const categories: Category[] = [
  { icon: CreditCard, name: "Billing", count: 15, color: "text-green-500" },
  { icon: Code, name: "Technical", count: 25, color: "text-purple-500" },
  { icon: Users, name: "Account", count: 18, color: "text-blue-500" },
  { icon: HelpCircle, name: "General", count: 12, color: "text-gray-500" },
];

const ArticleCategories = () => {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lg">Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 hover:bg-zinc-800/50 transition-colors cursor-pointer"
              >
                <Icon className={`w-5 h-5 ${category.color}`} />
                <div className="flex-1">
                  <h3 className="font-medium">{category.name}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {category.count} articles
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCategories;