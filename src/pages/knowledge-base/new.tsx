import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, Loader2 } from "lucide-react";
import { analyzeFileContent } from "@/utils/aiAnalysis";

const NewArticle = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeFileContent(file);
      
      if (analysis.title) setTitle(analysis.title);
      if (analysis.category) setCategory(analysis.category);
      if (analysis.summary) setContent(analysis.summary);
      
      toast.success("File analyzed successfully");
    } catch (error) {
      toast.error("Failed to analyze file");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !category) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Here you would typically make an API call to save the article
    toast.success("Article created successfully");
    navigate("/knowledge-base");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Create New Article</h1>
          <Button
            variant="outline"
            onClick={() => navigate("/knowledge-base")}
          >
            Cancel
          </Button>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload File for AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="file"
                onChange={handleFileUpload}
                accept=".txt,.doc,.docx,.pdf"
                disabled={isAnalyzing}
              />
              {isAnalyzing && (
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing file content...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter article category"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article content here..."
              className="min-h-[200px]"
              required
            />
          </div>
          
          <div className="flex justify-end gap-4">
            <Button type="submit">
              Create Article
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewArticle;