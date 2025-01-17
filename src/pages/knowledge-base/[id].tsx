import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ArticleRating from "@/components/knowledge-base/ArticleRating";
import RelatedArticles from "@/components/knowledge-base/RelatedArticles";
import { getArticles, updateArticleViews } from "@/lib/supabase";
import { useEffect } from "react";
import { toast } from "sonner";

const Article = () => {
  const { id } = useParams();

  const { data: articles, isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching articles:', error);
        toast.error('Failed to load article');
      }
    }
  });

  const article = articles?.find(a => a.id === id);
  const relatedArticles = articles
    ?.filter(a => a.id !== id && a.category === article?.category)
    .slice(0, 3)
    .map(a => ({
      id: a.id,
      title: a.title,
      views: a.views || 0
    })) || [];

  useEffect(() => {
    if (id) {
      updateArticleViews(id).catch(error => {
        console.error('Error updating views:', error);
      });
    }
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-zinc-800 rounded w-1/3"></div>
          <div className="h-64 bg-zinc-800 rounded"></div>
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Article not found</h2>
          <p className="text-zinc-400 mb-4">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/knowledge-base">
            <Button>Return to Knowledge Base</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Link to="/knowledge-base">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{article.title}</h1>
        </div>
        
        <div className="grid gap-6 md:grid-cols-[1fr,300px]">
          <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="prose prose-invert max-w-none">
                  {article.content.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{article.views || 0} views</span>
                    </div>
                    {article.rating_count > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>
                          {(article.rating_sum / article.rating_count).toFixed(1)} ({article.rating_count} ratings)
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Updated: {new Date(article.last_updated || article.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ArticleRating articleId={article.id} />
          </div>

          <div className="space-y-6">
            <RelatedArticles articles={relatedArticles} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;