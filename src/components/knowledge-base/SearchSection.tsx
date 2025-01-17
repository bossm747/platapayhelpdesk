import ArticleSearch from "./ArticleSearch";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Eye, Star } from "lucide-react";

interface Article {
  id: string;
  title: string;
  content: string;
  views: number;
  rating_sum: number;
  rating_count: number;
}

interface SearchSectionProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  filteredArticles: Article[];
}

const SearchSection = ({ searchQuery, onSearch, filteredArticles }: SearchSectionProps) => {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in delay-150">
      <ArticleSearch onSearch={onSearch} />
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
  );
};

export default SearchSection;