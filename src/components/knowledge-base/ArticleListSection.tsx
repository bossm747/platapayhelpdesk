import { Card, CardContent } from "@/components/ui/card";
import { Book, Eye, Star, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link to={`/knowledge-base/${article.id}`}>
              <Card className="hover:bg-zinc-900/50 transition-colors border-zinc-800">
                <CardContent className="p-4">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <Book className="w-4 h-4" />
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.views || 0} views
                    </span>
                    {showRating && article.rating_count > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className={`w-4 h-4 ${article.rating_sum / article.rating_count >= 4 ? "text-yellow-500" : ""}`} />
                        {(article.rating_sum / article.rating_count).toFixed(1)}/5
                        <span className="text-zinc-600">
                          ({article.rating_count})
                        </span>
                      </span>
                    )}
                    {showDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.created_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArticleListSection;