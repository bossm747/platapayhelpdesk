import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface RelatedArticle {
  id: string;
  title: string;
  views: number;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lg">Related Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/knowledge-base/${article.id}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
            >
              <span className="text-sm">{article.title}</span>
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-xs">{article.views} views</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedArticles;