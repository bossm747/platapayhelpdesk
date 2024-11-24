import Layout from "@/components/layout/Layout";
import { useParams } from "react-router-dom";

const Article = () => {
  const { id } = useParams();
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Knowledge Base Article #{id}</h1>
        {/* Article content will go here */}
      </div>
    </Layout>
  );
};

export default Article;