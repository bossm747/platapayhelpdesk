import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface RelatedArticle {
  id: string;
  title: string;
  views: number;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  if (articles.length === 0) {
    return null;
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lg">Related Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/knowledge-base/${article.id}`}
              className="block p-3 -mx-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
            >
              <h3 className="font-medium mb-2">{article.title}</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Eye className="w-4 h-4" />
                <span>{article.views} views</span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedArticles;