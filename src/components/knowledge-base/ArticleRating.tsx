import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { rateArticle } from "@/lib/supabase";
import { toast } from "sonner";

interface ArticleRatingProps {
  articleId: string;
}

const ArticleRating = ({ articleId }: ArticleRatingProps) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === null) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      await rateArticle(articleId, rating, comment);
      setRating(null);
      setComment("");
      toast.success("Thank you for your feedback!");
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lg">Was this article helpful?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={rating === 1 ? "default" : "outline"}
            size="sm"
            onClick={() => setRating(1)}
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Yes
          </Button>
          <Button
            variant={rating === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => setRating(0)}
          >
            <ThumbsDown className="w-4 h-4 mr-2" />
            No
          </Button>
        </div>

        {rating !== null && (
          <div className="space-y-4">
            <Textarea
              placeholder="Additional feedback (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArticleRating;