import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Search } from "lucide-react";

import ArticleCategories from "@/components/knowledge-base/ArticleCategories";
import ArticleListSection from "@/components/knowledge-base/ArticleListSection";
import { Input } from "@/components/ui/input";

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  views: number;
  rating_sum: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
  last_updated: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*');

      if (error) {
        console.error('Error fetching articles:', error);
        toast.error('Failed to load articles');
        throw error;
      }

      return (data || []) as Article[];
    }
  });

  if (error) {
    console.error('Error loading articles:', error);
  }

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularArticles = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3);

  const recentArticles = [...articles]
    .sort((a, b) => 
      new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
    )
    .slice(0, 3);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-12 px-4 py-8">
        {/* Hero Section with Search */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">How can we help you today?</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Search our knowledge base or browse categories below to find the answers you need.
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <Input
              type="search"
              placeholder="Search for articles..."
              className="w-full pl-10 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Browse by Category</h2>
          <ArticleCategories />
        </div>

        {/* Popular & Recent Articles */}
        <div className="grid gap-8 md:grid-cols-2">
          <ArticleListSection 
            title="Popular Articles" 
            articles={popularArticles}
            showRating={true}
            showDate={false}
          />
          <ArticleListSection 
            title="Recent Articles" 
            articles={recentArticles}
            showRating={false}
            showDate={true}
          />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Search Results</h2>
            <div className="space-y-4">
              {filteredArticles.length === 0 ? (
                <p className="text-center text-zinc-400">No articles found matching your search.</p>
              ) : (
                <ArticleListSection 
                  title="" 
                  articles={filteredArticles}
                  showRating={true}
                  showDate={true}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;