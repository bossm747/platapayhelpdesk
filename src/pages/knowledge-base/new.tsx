import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ArticleEditor from "@/components/knowledge-base/ArticleEditor";
import { useNavigate } from "react-router-dom";

const NewArticle = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/knowledge-base');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Create New Article</h1>
        
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>New Article</CardTitle>
          </CardHeader>
          <CardContent>
            <ArticleEditor onSave={handleSave} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NewArticle;