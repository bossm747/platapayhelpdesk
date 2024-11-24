import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Book } from "lucide-react";

const KnowledgeBasePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const articles = [
    {
      id: 1,
      title: "Getting Started with PlataPay",
      category: "General",
      description: "Learn the basics of using PlataPay for your business.",
      views: 1234,
    },
    {
      id: 2,
      title: "Payment Processing Guide",
      category: "Payments",
      description: "Comprehensive guide to processing payments securely.",
      views: 856,
    },
    {
      id: 3,
      title: "Account Security Best Practices",
      category: "Security",
      description: "Keep your account safe with these security tips.",
      views: 567,
    },
  ];

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Knowledge Base</h1>
          <Link to="/knowledge-base/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            placeholder="Search articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Link key={article.id} to={`/knowledge-base/${article.id}`}>
              <Card className="hover:bg-zinc-900 transition-colors border-zinc-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="w-4 h-4" />
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400 mb-2">{article.description}</p>
                  <div className="flex items-center justify-between text-sm text-zinc-500">
                    <span>{article.category}</span>
                    <span>{article.views} views</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default KnowledgeBasePage;