import { Card, CardContent } from "@/components/ui/card";
import { Book, Eye, Star, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  views: number;
  rating_sum: number;
  rating_count: number;
  created_at: string;
}

interface ArticleListSectionProps {
  title: string;
  articles: Article[];
  showRating?: boolean;
  showDate?: boolean;
}

const ArticleListSection = ({ title, articles, showRating = true, showDate = false }: ArticleListSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link key={article.id} to={`/knowledge-base/${article.id}`}>
            <Card className="hover:bg-zinc-900 transition-colors border-zinc-800">
              <CardContent className="p-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  {article.title}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
                  {!showDate && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.views || 0} views
                    </span>
                  )}
                  {showRating && article.rating_count > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {(article.rating_sum || 0) / (article.rating_count || 1)}/5
                    </span>
                  )}
                  {showDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.created_at || '').toLocaleDateString()}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleListSection;