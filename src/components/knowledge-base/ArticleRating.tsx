import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ArticleRatingProps {
  articleId: string;
}

const ArticleRating = ({ articleId }: ArticleRatingProps) => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStarRating, setShowStarRating] = useState(false);

  const handleInitialRating = (isPositive: boolean) => {
    if (isPositive) {
      setRating(4);
      setShowStarRating(true);
    } else {
      setRating(2);
      setShowStarRating(true);
    }
  };

  const handleStarRating = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (rating === null) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('article_feedback')
        .insert({
          article_id: articleId,
          rating,
          comment: comment.trim() || null
        });

      if (error) throw error;

      toast.success("Thank you for your feedback!");
      setRating(null);
      setComment("");
      setShowStarRating(false);
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
        <AnimatePresence mode="wait">
          {!showStarRating ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-2"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleInitialRating(true)}
                className="flex-1"
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Yes
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleInitialRating(false)}
                className="flex-1"
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                No
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Button
                    key={value}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStarRating(value)}
                    className={`hover:bg-primary/20 ${
                      rating === value ? "text-primary" : "text-zinc-400"
                    }`}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        value <= (rating || 0) ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                ))}
              </div>
              <Textarea
                placeholder="Additional feedback (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] bg-zinc-800/50"
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setRating(null);
                    setComment("");
                    setShowStarRating(false);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default ArticleRating;