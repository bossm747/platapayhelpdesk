import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";
import { rateArticle } from "@/lib/supabase";

interface ArticleRatingProps {
  articleId: string;
}

const ArticleRating = ({ articleId }: ArticleRatingProps) => {
  const [rated, setRated] = useState(false);

  const handleRating = async (helpful: boolean) => {
    try {
      await rateArticle(articleId, helpful ? 5 : 1);
      setRated(true);
      toast.success(
        helpful
          ? "Thank you for your feedback!"
          : "Thanks for letting us know. We'll work on improving this article."
      );
    } catch (error) {
      console.error('Error rating article:', error);
      toast.error('Failed to submit rating. Please try again.');
    }
  };

  if (rated) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-4">
          <p className="text-sm text-center text-zinc-400">
            Thank you for your feedback!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-4">
        <p className="text-sm text-center mb-3">Was this article helpful?</p>
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRating(true)}
            className="flex items-center gap-2"
          >
            <ThumbsUp className="w-4 h-4" />
            Yes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRating(false)}
            className="flex items-center gap-2"
          >
            <ThumbsDown className="w-4 h-4" />
            No
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleRating;