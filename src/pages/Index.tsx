import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import HeroSection from "@/components/knowledge-base/HeroSection";
import ArticleCategories from "@/components/knowledge-base/ArticleCategories";
import ArticleListSection from "@/components/knowledge-base/ArticleListSection";
import SearchSection from "@/components/knowledge-base/SearchSection";
import QuickLinks from "@/components/knowledge-base/QuickLinks";
import ContactForm from "@/components/support/ContactForm";

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
      <div className="max-w-7xl mx-auto space-y-12">
        <HeroSection />
        
        <SearchSection 
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          filteredArticles={filteredArticles}
        />

        <div className="py-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Access</h2>
          <QuickLinks />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Browse by Category</h2>
          <ArticleCategories />
        </div>

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

        <div className="py-12 bg-zinc-900/50 rounded-lg">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Need More Help?</h2>
            <p className="text-zinc-400 text-center mb-8">
              Can't find what you're looking for? Send us a message and our support team will get back to you as soon as possible.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;