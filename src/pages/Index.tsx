import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ArrowRight, Book, CreditCard, Users, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ArticleCategories from "@/components/knowledge-base/ArticleCategories";
import ArticleSearch from "@/components/knowledge-base/ArticleSearch";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "@/lib/supabase";
import { toast } from "sonner";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching articles:', error);
        toast.error('Failed to load articles');
      }
    }
  });

  const filteredArticles = articles?.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

  const popularArticles = articles?.slice(0, 3) ?? [];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-12 px-4 py-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to PlataPay Support</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Get the help you need with our comprehensive support system. Find answers, tutorials, and guides to help you succeed with PlataPay.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto">
          <ArticleSearch onSearch={setSearchQuery} />
          {searchQuery && filteredArticles.length > 0 && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="space-y-2">
                  {filteredArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/knowledge-base/${article.id}`}
                      className="block p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
                    >
                      <h3 className="font-medium">{article.title}</h3>
                      <p className="text-sm text-zinc-400">
                        {article.content.substring(0, 100)}...
                      </p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Categories Section */}
        <div className="grid gap-8">
          <h2 className="text-2xl font-bold text-center">Browse by Category</h2>
          <ArticleCategories />
        </div>

        {/* Popular Articles */}
        <div className="grid gap-8">
          <h2 className="text-2xl font-bold text-center">Popular Articles</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularArticles.map((article) => (
              <Link key={article.id} to={`/knowledge-base/${article.id}`}>
                <Card className="h-full hover:bg-zinc-900 transition-colors border-zinc-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Book className="w-4 h-4" />
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-400">
                      {article.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between mt-4 text-sm text-zinc-500">
                      <span>{article.category}</span>
                      <span>{article.views || 0} views</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Button
            variant="outline"
            className="justify-between"
            onClick={() => window.open('https://platapay.com', '_blank')}
          >
            Visit PlataPay Website
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            className="justify-between"
            onClick={() => window.open('https://docs.platapay.com', '_blank')}
          >
            Developer Documentation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            className="justify-between lg:col-span-1 md:col-span-2"
            onClick={() => window.open('https://status.platapay.com', '_blank')}
          >
            System Status
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;