import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Article = () => {
  const { id } = useParams();
  
  // Mock article data - in a real app, this would be fetched from an API
  const article = {
    id,
    title: "Getting Started with PlataPay",
    content: `
      PlataPay is a comprehensive payment processing solution designed for modern businesses.
      This guide will walk you through the essential features and help you get started quickly.
      
      Key Features:
      1. Secure Payment Processing
      2. Real-time Transaction Monitoring
      3. Detailed Analytics
      4. Customer Management
      
      Follow these steps to begin:
      1. Set up your account
      2. Configure payment methods
      3. Integrate with your platform
      4. Start accepting payments
    `,
    category: "General",
    views: 1234,
    createdAt: "2024-02-20",
    lastUpdated: "2024-02-21",
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/knowledge-base">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{article.title}</h1>
        </div>
        
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Article Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              {article.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-800">
              <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{article.views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Created: {article.createdAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Updated: {article.lastUpdated}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Article;