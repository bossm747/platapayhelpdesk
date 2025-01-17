import ArticleSearch from "./ArticleSearch";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Eye, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface Article {
  id: string;
  title: string;
  content: string;
  views: number;
  rating_sum: number;
  rating_count: number;
  created_at: string;
}

interface SearchSectionProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  filteredArticles: Article[];
}

const SearchSection = ({ searchQuery, onSearch, filteredArticles }: SearchSectionProps) => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in delay-150">
      <ArticleSearch onSearch={onSearch} />
      {searchQuery && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="space-y-2">
                {filteredArticles.length === 0 ? (
                  <p className="text-center text-zinc-400 py-8">
                    No articles found matching "{searchQuery}"
                  </p>
                ) : (
                  filteredArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/knowledge-base/${article.id}`}
                      className="block p-4 hover:bg-zinc-800/50 rounded-lg transition-colors"
                    >
                      <h3 className="font-medium text-lg mb-2">{article.title}</h3>
                      <p className="text-sm text-zinc-400 mb-3">
                        {article.content.substring(0, 150)}...
                      </p>
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views || 0} views
                        </span>
                        {article.rating_count > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {(article.rating_sum / article.rating_count).toFixed(1)}/5
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default SearchSection;