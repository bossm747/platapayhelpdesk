import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight, Book, Eye, Star, Calendar, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ArticleCategories from "@/components/knowledge-base/ArticleCategories";
import ArticleSearch from "@/components/knowledge-base/ArticleSearch";
import RoleSelector from "@/components/RoleSelector";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "@/lib/supabase";
import { toast } from "sonner";
import { useSession } from '@supabase/auth-helpers-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const session = useSession();

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

  const popularArticles = articles?.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3) ?? [];
  const recentArticles = articles?.sort((a, b) => 
    new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
  ).slice(0, 3) ?? [];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-12 px-4 py-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to PlataPay Support</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Get the help you need with our comprehensive support system. Find answers, tutorials, and guides to help you succeed with PlataPay.
          </p>
          {session && (
            <Link to="/knowledge-base/new">
              <Button className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Create New Article
              </Button>
            </Link>
          )}
        </div>

        {/* Role Selector */}
        <RoleSelector />

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
                      <div className="flex items-center gap-4 mt-2 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views || 0} views
                        </span>
                        {article.rating_count > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {(article.rating_sum || 0) / (article.rating_count || 1)}/5
                          </span>
                        )}
                      </div>
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

        {/* Popular & Recent Articles */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Popular Articles */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Popular Articles</h2>
            <div className="space-y-4">
              {popularArticles.map((article) => (
                <Link key={article.id} to={`/knowledge-base/${article.id}`}>
                  <Card className="hover:bg-zinc-900 transition-colors border-zinc-800">
                    <CardContent className="p-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <Book className="w-4 h-4" />
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views || 0} views
                        </span>
                        {article.rating_count > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {(article.rating_sum || 0) / (article.rating_count || 1)}/5
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Articles */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Recent Articles</h2>
            <div className="space-y-4">
              {recentArticles.map((article) => (
                <Link key={article.id} to={`/knowledge-base/${article.id}`}>
                  <Card className="hover:bg-zinc-900 transition-colors border-zinc-800">
                    <CardContent className="p-4">
                      <h3 className="font-medium flex items-center gap-2">
                        <Book className="w-4 h-4" />
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.created_at || '').toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
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